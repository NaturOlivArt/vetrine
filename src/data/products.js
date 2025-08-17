// data/products.js
import img10 from '../assets/images/10cm.jpg';
import img12 from '../assets/images/12cm.jpg';
import img15 from '../assets/images/15cm.jpg';

export const products = [
  {
    id: 1,
    name: "Doseur de miel en bois d'olivier",
    images: [img10, img12, img15],
    sizes: ["10 cm", "12 cm", "15 cm"],
    price: [35, 45, 55],
    description: "Élégant doseur de miel fabriqué à la main en bois d'olivier. Idéal pour servir le miel avec style."
  },
  
  // autres produits
  // {
  //   id: 2,
  //   name: "Cuillère artisanale",
  //   image: "/images/cuillere.jpg",
  //   size: "20 cm",
  //   price: 25,
  //   description: "Cuillère en bois d'olivier, parfaite pour la cuisine ou comme objet décoratif."
  // },
  // {
  //   id: 3,
  //   name: "Planche à découper",
  //   image: "/images/planche.jpg",
  //   size: "30 x 20 cm",
  //   price: 45,
  //   description: "Planche à découper robuste en bois d'olivier, avec de belles veinures naturelles."
  // }
];
