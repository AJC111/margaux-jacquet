import type { NextApiRequest, NextApiResponse } from 'next'
import SibApiV3Sdk from 'sib-api-v3-sdk'

const client = SibApiV3Sdk.ApiClient.instance
const apiKey = client.authentications['api-key']
apiKey.apiKey = process.env.BREVO_API_KEY!

const transactionalEmailApi = new SibApiV3Sdk.TransactionalEmailsApi()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const { nom, prenom, email, telephone, sujet, message } = req.body

  const htmlToAdmin = `
    <div style="max-width:600px;margin:0 auto;padding:30px 20px;background-color:#fff;font-family:'Helvetica Neue',sans-serif;color:#222;border-radius:16px;box-shadow:0 8px 24px rgba(0,0,0,0.08);border:1px solid #eee;">
      <div style="text-align:center;margin-bottom:32px;">
        <img src="https://margaux-jacquet.com/favicon.ico" width="48" height="48" alt="Margaux Jacquet" style="border-radius:50%;margin-bottom:12px;" />
        <h1 style="font-size:20px;margin:0;color:#101F44">Nouvelle demande de contact</h1>
      </div>
      <div style="font-size:15px;line-height:1.6">
        <p><strong>Nom :</strong> ${nom}</p>
        <p><strong>Prénom :</strong> ${prenom}</p>
        <p><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Téléphone :</strong> ${telephone}</p>
        ${sujet ? `<p><strong>Sujet :</strong> ${sujet}</p>` : ''}
        <hr style="margin:24px 0;border:none;border-top:1px solid #eee;" />
        <p><strong>Message :</strong><br/>${message}</p>
      </div>
      <div style="text-align:center;font-size:13px;color:#888;margin-top:40px;padding-top:20px;border-top:1px solid #eee">
        <p>Ce message provient de ton site <strong>margaux-jacquet.com</strong></p>
      </div>
    </div>
  `

  const htmlToUser = `
    <div style="max-width:600px;margin:0 auto;padding:30px 20px;background-color:#fff;font-family:'Helvetica Neue',sans-serif;color:#222;border-radius:16px;box-shadow:0 8px 24px rgba(0,0,0,0.08);border:1px solid #eee;">
      <div style="text-align:center;margin-bottom:32px;">
        <img src="https://margaux-jacquet.com/favicon.ico" width="48" height="48" alt="Margaux Jacquet" style="border-radius:50%;margin-bottom:12px;" />
        <h1 style="font-size:20px;margin:0;color:#101F44">Merci pour votre message</h1>
        <p style="font-size:14px;color:#444;">Votre demande a bien été envoyée. Vous recevrez une réponse dans les meilleurs délais.</p>
      </div>
      <div style="font-size:15px;line-height:1.6">
        <p><strong>Nom :</strong> ${nom}</p>
        <p><strong>Prénom :</strong> ${prenom}</p>
        ${sujet ? `<p><strong>Sujet :</strong> ${sujet}</p>` : ''}
        <p><strong>Message :</strong><br/>${message}</p>
      </div>
      <div style="text-align:center;font-size:13px;color:#888;margin-top:40px;padding-top:20px;border-top:1px solid #eee">
        <p>Message généré automatiquement par <strong>margaux-jacquet.com</strong></p>
      </div>
    </div>
  `

  try {
    // 👉 Envoi vers Margaux
    await transactionalEmailApi.sendTransacEmail({
      sender: { email: process.env.BREVO_FROM!, name: 'Formulaire de contact' },
      to: [{ email: process.env.BREVO_TO! }],
      replyTo: { email },
      subject: sujet || 'Message via le site margaux-jacquet.com',
      htmlContent: htmlToAdmin,
    })

    // 👉 Accusé de réception à l'expéditeur
    await transactionalEmailApi.sendTransacEmail({
      sender: { email: process.env.BREVO_FROM!, name: 'Margaux Jacquet' },
      to: [{ email }],
      subject: '📩 Merci pour votre message – margaux-jacquet.com',
      htmlContent: htmlToUser,
    })

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('[BREVO ERROR]', error)
    return res.status(500).json({ success: false, error: 'Erreur lors de l’envoi' })
  }
}
