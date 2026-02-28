import sitesData from '@/data/sites.json';

export interface Site {
  slug: string;
  code: string;
  name: string;
  tagline: string;
  category: string;
  address: string;
  phone: string;
  whatsappPhone: string;
  hours: string;
  rating: number;
  reviews: number;
  priceRange: string;
  mapsCid: string;
  googlePlaceId: string;
  primaryColor: string;
  accentColor: string;
  emoji: string;
  services: string[];
  description: string;
}

export const sites: Site[] = sitesData as Site[];

export function getSite(slug: string): Site | undefined {
  return sites.find((s) => s.slug === slug);
}
