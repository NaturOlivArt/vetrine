import { Link } from "react-router-dom";
import acceuilImage from "../assets/images/acceuil.jpg";

function Home() {
  return (
    <div>
      {/* Hero / Bannière avec image en fond */}
      <section
        aria-label="Section d'accueil NaturOliv Art"
        className="relative w-full min-h-[80vh] md:min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Image en background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${acceuilImage})` }}
          aria-hidden="true"
        ></div>

        {/* Overlay dégradé pour contraste */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10"></div>

        {/* Contenu principal */}
        <div className="relative z-20 max-w-4xl px-6 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            NaturOliv Art
          </h1>
          <p className="text-xl md:text-2xl mb-8 drop-shadow-md">
            Artisanat tunisien en bois d'olivier
          </p>
          <Link
            to="/products"
            className="inline-block bg-wood-dark hover:bg-wood-light text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-wood/50"
          >
            Découvrir nos créations
          </Link>
        </div>
      </section>

      {/* Section Présentation */}
      <section className="py-16 bg-beige">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-serif text-wood-dark">
              Notre Passion pour le Bois
            </h2>
            <p className="mt-4 text-gray-700 max-w-2xl mx-auto">
              Chaque pièce est façonnée à la main avec soin, révélant la beauté naturelle et les veinures uniques du bois d'olivier.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Image de présentation */}
            <div className="md:w-1/2">
              <img
                src={acceuilImage}
                alt="Artisan au travail"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>

            {/* Texte de présentation */}
            <div className="md:w-1/2 text-lg text-gray-700 leading-relaxed">
              <p className="mb-4">
                Bienvenue chez <span className="font-semibold">NaturOliv Art</span>, 
                un atelier familial où l'art de travailler le bois d'olivier tunisien 
                se transmet depuis trois générations.
              </p>
              <p className="mb-4">
                Nos créations allient techniques ancestrales et design contemporain, 
                pour offrir des pièces uniques, à la fois esthétiques et fonctionnelles.
              </p>
              <p>
                Nous sélectionnons uniquement les meilleurs bois, afin de mettre en valeur 
                leur authenticité et leur élégance naturelle.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
