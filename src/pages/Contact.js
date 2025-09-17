import { Helmet } from "react-helmet";
function Contact() {
  // Fonction pour ouvrir WhatsApp avec un message prédéfini
  const openWhatsApp = () => {
    // Numéro fictif - à remplacer par le vrai numéro
    const phoneNumber = "+21652364988";
    const message =
      "Bonjour, je suis intéressé(e) par vos créations en bois d'olivier.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      <Helmet>
        <title>Contact | NaturOliv Art</title>
        <meta
          name="description"
          content="Contactez NaturOliv Art pour toute demande: produits en bois d’olivier, commandes et informations."
        />
        <link
          rel="canonical"
          href="https://natureolivart.netlify.app/contact"
        />
      </Helmet>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center text-wood-dark dark:text-dark-secondary">
          Contactez-nous
        </h1>

        <div className="max-w-3xl mx-auto bg-wood-light dark:bg-dark-secondary p-8 rounded-lg shadow-lg">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold mb-4 text-wood-dark dark:text-dark-secondary">
                Nos Coordonnées
              </h2>

              <div className="space-y-4">
                <div className="flex items-start">
                  <svg
                    className="w-6 h-6 text-wood-dark mr-3 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    ></path>
                  </svg>
                  <div>
                    <h3 className="font-semibold">Téléphone</h3>
                    <p className="text-gray-700">+216 52 364 988</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg
                    className="w-6 h-6 text-wood-dark mr-3 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-gray-700">contact@naturoliv-art.tn</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg
                    className="w-6 h-6 text-wood-dark mr-3 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                  <div>
                    <h3 className="font-semibold">Adresse de l'atelier</h3>
                    <p className="text-gray-700">
                      Route saltnia, Km 7, sfax
                      <br />
                      2025 sfax, Tunisie
                    </p>
                  </div>
                </div>

                <button
                  onClick={openWhatsApp}
                  className="mt-6 flex items-center bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path>
                  </svg>
                  Nous contacter sur WhatsApp
                </button>
              </div>
            </div>

            <div className="md:w-1/2 mt-8 md:mt-0">
              <h2 className="text-2xl font-bold mb-4 text-wood-dark">
                Horaires d'ouverture
              </h2>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Lundi - Vendredi:</span>
                  <span>9h00 - 18h00</span>
                </li>
                <li className="flex justify-between">
                  <span>Samedi:</span>
                  <span>9h00 - 16h00</span>
                </li>
                <li className="flex justify-between">
                  <span>Dimanche:</span>
                  <span>Fermé</span>
                </li>
              </ul>

              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4 text-wood-dark">
                  Nous trouver
                </h2>
                <div className="h-64 bg-gray-300 rounded-lg">
                  {/* Ici, vous pourriez intégrer une carte Google Maps */}
                  <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-lg">
                    <p className="text-gray-600">Carte Google Maps</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
