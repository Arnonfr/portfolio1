
export interface Project {
  id: number;
  title: string;
  subtitle?: string;
  category: string;
  image: string;
  // Added optional logo property to fix type errors when defining projects
  logo?: string;
  year?: string;
  company?: string;
  role?: string;
  description?: string;
  challenge?: string;
  solution?: string;
  impact?: string[];
  images?: string[]; // Array for additional case study images
  accentColor?: string;
  bgColor?: string;
  metaphor?: string;
  metrics?: { label: string; value: string }[];
}

export interface NavItem {
  label: string;
  href: string;
}