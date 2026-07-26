export const BUSINESS = {
  name: "New Punjab Glass House",
  shortName: "NPGH",
  tagline: "Customer's Satisfaction Is Our Moto",
  founder: "Arvind Kumar",
  phoneDisplay: "+91 98149-70373",
  phoneRaw: "919814970373",
  whatsappUrl: "https://wa.me/919814970373",
  telUrl: "tel:+919814970373",
  address: "3744/6, Shop No. 3, Dugri Road, Near Fauji Dhaba, Ludhiana, Punjab 141002",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=New+Punjab+Glass+House+Dugri+Road+Ludhiana",
} as const;

export const NAV_LINKS = [
  { label: "Specialties", href: "#specialties" },
  { label: "Contact", href: "#contact" },
] as const;

export const WHATSAPP_PREFILLED = (msg: string) =>
  `${BUSINESS.whatsappUrl}?text=${encodeURIComponent(msg)}`;

/**
 * Residential-market specialty showcase data.
 * Images are sourced from Unsplash (free Unsplash License, direct CDN links,
 * verified against each photo's canonical page) and curated to reflect
 * premium independent house / bungalow (kothi) applications rather than
 * commercial high-rise glazing — matching NPGH's primary Ludhiana
 * residential client base.
 */
export type Specialty = {
  id: string;
  title: string;
  description: string;
  icon: "aluminium" | "stained" | "airbrushed" | "bevelled";
  image: string;
  imageAlt: string;
  imageCredit: string;
  span: string;
  accent: string;
  glow: string;
};

export const SPECIALTIES: Specialty[] = [
  {
    id: "aluminium",
    title: "Wholesale Aluminium Sections",
    description:
      "Bulk supply of precision-engineered aluminium profiles for home facades, sliding doors, and window frames — sourced and stocked at scale for contractors, builders, and dealers fitting out independent houses across Punjab.",
    icon: "aluminium",
    image:
      "https://images.unsplash.com/photo-1724582586580-8b52c02e99dd?auto=format&fit=crop&w=1600&q=80",
    imageAlt:
      "Modern residential living room with slim-profile aluminium-framed sliding glass doors",
    imageCredit: "Prydumano Design / Unsplash",
    span: "md:col-span-3 md:row-span-2",
    accent: "from-iridescent-cyan/20 to-transparent",
    glow: "group-hover:shadow-[0_0_60px_-15px_rgba(125,249,255,0.35)]",
  },
  {
    id: "stained",
    title: "Stained & Decorative Glass",
    description:
      "Hand-crafted stained and decorative glass panels for home entrances and interiors — bespoke patterns, colors, and finishes that turn a bungalow's front door or partition into a design centerpiece.",
    icon: "stained",
    image:
      "https://images.unsplash.com/photo-1666004095305-300183c896ed?auto=format&fit=crop&w=1600&q=80",
    imageAlt:
      "Premium independent house facade with an elegant glass-detailed entrance",
    imageCredit: "Brad Chapman / Unsplash",
    span: "md:col-span-2 md:row-span-2",
    accent: "from-iridescent-violet/20 to-transparent",
    glow: "group-hover:shadow-[0_0_60px_-15px_rgba(179,156,255,0.35)]",
  },
  {
    id: "airbrushed",
    title: "Air Brushed & Sand Blasted Artistry",
    description:
      "Textured, frosted glass surfaces achieved through precision air-brushing and sand-blasting — ideal for home bathroom partitions, balcony railings, and privacy screens without sacrificing natural light.",
    icon: "airbrushed",
    image:
      "https://images.unsplash.com/photo-1765766600457-abfd14dd502c?auto=format&fit=crop&w=1600&q=80",
    imageAlt:
      "Modern home interior with a frosted glass room divider in a sleek black frame",
    imageCredit: "Marina Nazina / Unsplash",
    span: "md:col-span-3 md:row-span-1",
    accent: "from-iridescent-amber/20 to-transparent",
    glow: "group-hover:shadow-[0_0_60px_-15px_rgba(245,199,126,0.35)]",
  },
  {
    id: "bevelled",
    title: "Bevelled & Edge Polished Precision Glass",
    description:
      "Meticulously bevelled edges and mirror-polished finishes for home interiors — frameless glass staircase railings and statement mirrors delivering a luxury, light-refracting edge.",
    icon: "bevelled",
    image:
      "https://images.unsplash.com/photo-1771904488645-fa6ebf7a2d06?auto=format&fit=crop&w=1600&q=80",
    imageAlt:
      "Modern home staircase with a frameless bevelled glass railing beside a marble wall",
    imageCredit: "Wesley Shen / Unsplash",
    span: "md:col-span-2 md:row-span-1",
    accent: "from-white/10 to-transparent",
    glow: "group-hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.25)]",
  },
];
