export type ServiceCategory = 'Brand' | 'Digital' | 'Campaign' | 'Others';

export interface Project {
  id: string;
  title: string;
  client: string;
  year: string;
  category: ServiceCategory | '3D & Motion';
  summary: string;
  challenge: string;
  outcome: string;
  deliverables: string[];
  metrics: { label: string; value: string }[];
  tags: string[];
  accentColor: string;
  videoPreview?: string;
  imageThumbnail: string;
}

export interface LabExperiment {
  id: string;
  code: string;
  title: string;
  category: string;
  description: string;
  status: 'Active Lab' | 'Experimental' | 'Production Ready';
  tech: string[];
}

export interface StudioOpening {
  id: string;
  role: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  overview: string;
  responsibilities: string[];
  requirements: string[];
}

export interface ShopItem {
  id: string;
  name: string;
  edition: string;
  category: 'Sculpture' | 'Print' | 'Apparel' | 'Typeface';
  price: string;
  status: 'Available' | 'Low Stock' | 'Pre-Order';
  description: string;
  details: string[];
  image: string;
}
