import Head from 'next/head'

export default function CGV() {
  return (
    <>
      <Head>
        <title>Conditions Générales de Vente - Margaux Jacquet</title>
        <meta name="description" content="CGV - Conditions Générales de Vente du site Margaux Jacquet" />
      </Head>

      <main className="text-bleu bg-[#FAF9F3] px-6 py-20 font-sans">
        <div className="max-w-4xl mx-auto space-y-12">
          <h1 className="text-3xl md:text-5xl font-bold text-center">Conditions Générales de Vente</h1>

          <section className="space-y-8 text-[1.05rem] leading-relaxed">
            <div>
              <h2 className="text-xl font-semibold">Préambule</h2>
              <p>
                Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre :
                <br />– Margaux JACQUET Bleuet, micro-entreprise immatriculée sous le numéro SIRET : 89342036400018, dont le siège est situé à 2 Kerjonc à Ménéac 56490, (ci-après désignée “le Vendeur”),
                <br />– et toute personne physique ou morale procédant à un achat via le site internet www.margaux-jacquet.com (ci-après désignée “l’Acheteur”).
                <br />L’achat de produits ou services sur le site implique l’acceptation sans réserve des présentes CGV.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold">1. Objet</h2>
              <p>
                Les présentes CGV ont pour objet de définir les droits et obligations des parties dans le cadre de la vente en ligne des produits et services proposés par le Vendeur
                (masterclasses, programmes numériques, objets physiques, soins énergétiques, etc.).
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold">2. Produits et services</h2>
              <p>
                Le Vendeur propose des produits et services décrits avec la plus grande exactitude possible. Toutefois, des variations mineures peuvent exister (photos non contractuelles).
                <br />Les produits numériques (vidéos, audios, ebooks, etc.) sont livrés par voie dématérialisée après paiement.
                <br />Les soins énergétiques ou accompagnements à distance sont réalisés selon les modalités convenues avec l’Acheteur.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold">3. Tarifs</h2>
              <p>
                Les prix sont indiqués en euros (€) et incluent toutes taxes applicables. Le Vendeur se réserve le droit de modifier ses tarifs à tout moment,
                mais les produits ou services seront facturés sur la base des tarifs en vigueur au moment de la commande.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold">4. Commande et paiement</h2>
              <p>
                L’Acheteur passe commande en ligne. Toute commande vaut acceptation des présentes CGV.
                <br />Le paiement s’effectue via la plateforme sécurisée. Les moyens de paiement acceptés sont les virements, ou espèces en cas d&#39;événements en présentiel.
                <br />En cas de non-paiement ou d’incident, le Vendeur se réserve le droit d’annuler la commande.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold">5. Livraison</h2>
              <p>
                Produits physiques : expédiés à l’adresse indiquée par l’Acheteur. Les délais sont donnés à titre indicatif.
                <br />Produits numériques : livrés par e-mail ou via une plateforme dédiée.
                <br />Pour tout problème : contactez le Vendeur à l’adresse : <span className="italic">[ton email]</span>.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold">6. Droit de rétractation</h2>
              <p>
                Conformément au Code de la consommation, l’Acheteur dispose d’un délai de 14 jours pour exercer son droit de rétractation. Ce droit ne s’applique pas :
                <br />– Aux produits numériques déjà téléchargés,
                <br />– Aux services commencés à la demande de l’Acheteur avant la fin du délai de rétractation.
                <br />Pour exercer ce droit, envoyer un email à <span className="italic">[adresse@email.com]</span>.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold">7. Responsabilités</h2>
              <p>
                Le Vendeur ne peut être tenu responsable des dommages résultant de l’utilisation des produits ou services, sauf faute grave.
                <br />Les produits et services proposés ne remplacent pas un avis médical ou psychologique.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold">8. Propriété intellectuelle</h2>
              <p>
                Tous les contenus (textes, vidéos, audios, images, etc.) sont protégés. Toute reproduction ou diffusion sans autorisation est interdite.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold">9. Données personnelles</h2>
              <p>
                Les données sont utilisées uniquement pour la gestion des commandes. Conformément au RGPD, l’Acheteur peut exercer ses droits en écrivant à <span className="italic">[adresse@email.com]</span>.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold">10. Litiges</h2>
              <p>
                Les CGV sont soumises au droit français. En cas de litige, les parties s’engagent à rechercher une solution amiable.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold">11. Mentions légales</h2>
              <p>
                Site édité par : Aimery Javoy-Corbin<br />
                Adresse : 2 Kerjonc, 56490 Ménéac<br />
                Email : <span className="italic">[adresse@email.com]</span><br />
                Hébergement : Vercel
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
