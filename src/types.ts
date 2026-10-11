export type ThemeMode = 'monochrome-dark' | 'monochrome-light';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  disciplineId: 'fullstack' | 'uiux' | 'graphic';
  year: string;
  client: string;
  description: string;
  highlights: string[];
  deliverables: string[];
  role: string;
  image: string;
  imageAlt?: string;
  previewCaption?: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  deliverables: string[];
  focus?: string;
  impact?: string;
}
