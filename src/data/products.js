// data/products.js
import img10 from '../assets/images/10cm.jpg';
import img12 from '../assets/images/12cm.jpg';
import img15 from '../assets/images/15cm.jpg';

export const products = [
  {
    id: 1,
    slug: "cuillere-a-miel", // <-- nouveau: slug principal
    variantSlugs: ["cuillere-a-miel-10cm", "cuillere-a-miel-12cm", "cuillere-a-miel-15cm"], // <-- nouveau: slugs par taille
    name: "Cuillère à Miel en bois d'olivier",
    images: [img10, img12, img15],
    sizes: ["10 cm", "12 cm", "15 cm"],
    price: [35, 45, 55],
    description: "Élégant doseur de miel fabriqué à la main en bois d'olivier. Idéal pour servir le miel avec style."
  },
];
