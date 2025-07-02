import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '@/lib/sanity'
import SibApiV3Sdk from 'sib-api-v3-sdk'

const formatDateFr = (iso: string): string => {
  const [year, month, day] = iso.split('-')
  return `${day}/${month}/${year}`
}

const brevoClient = SibApiV3Sdk.ApiClient.instance
const apiKey = brevoClient.authentications['api-key']
apiKey.apiKey = process.env.BREVO_API_KEY!

const transactionalEmailApi = new SibApiV3Sdk.TransactionalEmailsApi()

type Data = {
  success: boolean
  message?: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Méthode non autorisée' })
  }

  const { nom, email, telephone, message, date } = req.body

  if (!nom || !email || !telephone || !date) {
    return res.status(400).json({ success: false, message: 'Champs requis manquants' })
  }

  try {
    // Vérification dans Sanity
    const planningQuery = `*[_type == "planning"][0]{ joursDisponibles, placesMaxParJour }`
    const planning = await client.fetch(planningQuery)

    if (!planning?.joursDisponibles?.includes(date)) {
      return res.status(400).json({ success: false, message: 'Date non réservable' })
    }

    const maxPlaces = planning.placesMaxParJour || 3
    const existingReservations = await client.fetch(
      `count(*[_type == "reservation" && date == $date])`,
      { date }
    )

    if (existingReservations >= maxPlaces) {
      return res.status(400).json({ success: false, message: 'Date complète' })
    }

    // Enregistrement dans Sanity
    const doc = {
      _type: 'reservation',
      nom,
      email,
      telephone,
      message,
      date,
      createdAt: new Date().toISOString(),
    }

    await client.create(doc)

    // HTML Margaux
    const htmlToMargaux = `
      <div style="max-width:600px;margin:0 auto;padding:32px;background:#fff;border-radius:16px;border:1px solid #eee;font-family:'Helvetica Neue',sans-serif;color:#222;box-shadow:0 8px 24px rgba(0,0,0,0.05);">
        <div style="text-align:center;margin-bottom:24px;">
            <img src="https://margaux-jacquet.com/favicon.ico" width="48" height="48" alt="Margaux Jacquet" style="border-radius:50%;margin-bottom:12px;" />
            <h2 style="margin:0;font-size:20px;color:#101F44">Nouvelle réservation reçue</h2>
            <p style="font-size:14px;color:#666;margin-top:4px;">Site margaux-jacquet.com</p>
        </div>
        <div style="font-size:15px;line-height:1.7">
            <p><strong>Date :</strong> ${formatDateFr(date)}</p>
            <p><strong>Nom :</strong> ${nom}</p>
            <p><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Téléphone :</strong> ${telephone}</p>
            ${message ? `<p><strong>Message :</strong><br>${message}</p>` : ''}
        </div>
        <div style="margin-top:32px;text-align:center;">
            <a href="mailto:${email}" style="display:inline-block;padding:12px 24px;background:#101F44;color:white;text-decoration:none;border-radius:20px;font-weight:bold;">Répondre au client</a>
        </div>
        <div style="font-size:12px;color:#999;text-align:center;margin-top:40px;border-top:1px solid #eee;padding-top:16px;">
            <p>Message envoyé automatiquement depuis ton site margaux-jacquet.com</p>
        </div>
    </div>
    `

    // HTML Client
    const htmlToClient = `
      <div style="max-width:600px;margin:0 auto;padding:32px;background:#fff;border-radius:16px;border:1px solid #eee;font-family:'Helvetica Neue',sans-serif;color:#222;box-shadow:0 8px 24px rgba(0,0,0,0.05);">
        <div style="text-align:center;margin-bottom:24px;">
            <img src="https://margaux-jacquet.com/favicon.ico" width="48" height="48" alt="Margaux Jacquet" style="border-radius:50%;margin-bottom:12px;" />
            <h2 style="margin:0;font-size:20px;color:#101F44">Merci pour votre demande</h2>
            <p style="font-size:14px;color:#444;margin-top:4px;">Votre demande de rendez-vous a bien été envoyée.</p>
        </div>
        <div style="font-size:15px;line-height:1.7">
            <p><strong>Date demandée :</strong> ${formatDateFr(date)}</p>
            <p>Je vous recontacte très prochainement pour confirmer l'heure exacte. Merci et à bientôt !</p>
        </div>
        <div style="margin-top:32px;text-align:center;">
            <a href="https://margaux-jacquet.com" style="display:inline-block;padding:12px 24px;background:#101F44;color:white;text-decoration:none;border-radius:20px;font-weight:bold;">Retour au site</a>
        </div>
        <div style="font-size:12px;color:#999;text-align:center;margin-top:40px;border-top:1px solid #eee;padding-top:16px;">
            <p>Message généré automatiquement depuis margaux-jacquet.com</p>
        </div>
    </div>
    `

    // Envoi email à Margaux
    await transactionalEmailApi.sendTransacEmail({
      sender: { email: process.env.BREVO_FROM!, name: 'Formulaire de réservation' },
      to: [{ email: process.env.BREVO_TO! }],
      replyTo: { email },
      subject: `📆 Nouvelle réservation le ${formatDateFr(date)}`,
      htmlContent: htmlToMargaux,
    })

    // Envoi email accusé au client
    await transactionalEmailApi.sendTransacEmail({
      sender: { email: process.env.BREVO_FROM!, name: 'Margaux Jacquet' },
      to: [{ email }],
      subject: `📩 Confirmation – demande de rendez-vous le ${formatDateFr(date)}`,
      htmlContent: htmlToClient,
    })

    return res.status(200).json({ success: true })
  } catch (err: any) {
  console.error('[Erreur API rendezvous]');
  console.error('Message :', err?.message);
  console.error('Stack :', err?.stack);
  console.error('Objet complet :', err);
  return res.status(500).json({ success: false, message: 'Erreur serveur' });
}

}
