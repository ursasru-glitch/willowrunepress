
export interface Book {
  id: string;
  title: string;
  authorId: string;
  genre: string;
  description: string;
  coverImage: string;
  buyLinks: { platform: string; url: string }[];
  excerpt?: string;
  publishedDate: string;
  isFeatured?: boolean;
}

export interface Author {
  id: string;
  name: string;
  bio: string;
  longBio: string;
  photo: string;
  socials: { platform: string; url: string }[];
  pressInfo?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  authorId: string;
  date: string;
  image: string;
  tags: string[];
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  rsvpLink: string;
  image: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  version: string;
  fileType: string;
  downloadUrl: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  seoDescription: string;
  contactEmail: string;
  socialLinks: { platform: string; url: string }[];
}

export interface CMSData {
  books: Book[];
  authors: Author[];
  blogPosts: BlogPost[];
  products: Product[];
  events: Event[];
  resources: Resource[];
  testimonials: Testimonial[];
  settings: SiteSettings;
}
