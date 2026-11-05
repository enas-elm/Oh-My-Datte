/** Les quatre dattes de la gamme : section « Vos dat(t)es » et composition du coffret. */

export type DatteId = 'intrepide' | 'irresistible' | 'cool-kid' | 'sage';

export interface Product {
  id: DatteId;
  imagePath: string;
  title: string;
  subtitle: string;
  imageAlt: string;
  description: string;
  chute: string;
}

export const products: Product[] = [
  {
    id: 'intrepide',
    imagePath: '/images/nosdattes/intrepide.png',
    title: "L'Intrépide",
    subtitle: 'Noir · Cacahuète',
    imageAlt: "L'Intrépide, datte enrobée de chocolat noir au cœur de cacahuète",
    description:
      "L'Intrépide ne demande pas la permission. Sous sa carapace de chocolat noir intense, elle cache un cœur de beurre de cacahuète généreux et des éclats croquants qui bousculent les codes.",
    chute: "C'est la datte des audacieux\u00a0: directe, efficace, et terriblement addictive.",
  },
  {
    id: 'irresistible',
    imagePath: '/images/nosdattes/irresistible.png',
    title: "L'Irrésistible",
    subtitle: 'Blanc · Pistache',
    imageAlt: "L'Irrésistible, datte enrobée de chocolat blanc au cœur de pistache",
    description:
      "Elle entre en scène et le temps s'arrête. Vêtue d'un velouté de chocolat blanc et d'un cœur fondant à la pistache, L'Irrésistible mise sur l'éclat.",
    chute: 'Douce mais affirmée, elle offre un équilibre précieux entre luxe et délicatesse. On ne lui résiste pas, on succombe.',
  },
  {
    id: 'cool-kid',
    imagePath: '/images/nosdattes/cool-kid.png',
    title: 'Le Cool Kid',
    subtitle: 'Noir · Praliné',
    imageAlt: 'Le Cool Kid, datte enrobée de chocolat noir au praliné noisette-amande',
    description:
      "L'allure chic, l'esprit libre. Le Cool Kid revisite le classique avec un praliné noisette-amande qui fond en bouche. Enrobé de chocolat noir, il impose son style sans en faire trop.",
    chute: "C'est la gourmandise chill par excellence, celle qu'on invite à toutes les occasions.",
  },
  {
    id: 'sage',
    imagePath: '/images/nosdattes/sage.png',
    title: 'Le Sage',
    subtitle: 'Noir · Coco',
    imageAlt: 'Le Sage, datte enrobée de chocolat noir au praliné coco',
    description:
      "L'équilibre trouvé entre l'intensité du cacao et la sérénité des îles. Le Sage apaise le caractère du chocolat noir par un cœur fondant de praliné coco.",
    chute: 'Un voyage intérieur, posé et réfléchi, pour ceux qui cherchent la profondeur sous la gourmandise.',
  },
];

export const DATTE_IDS = products.map((p) => p.id);
