export type SectionKind = 'about' | 'interests' | 'photography' | 'projects' | 'journal' | 'contact';
export interface ImageAsset {
  src: string;
  small?: string;
  alt: string;
  altEn?: string;
  width: number;
  height: number;
}
export interface Section {
  id: string;
  kind: SectionKind;
  path: string;
  label: string;
  english: string;
  description: string;
  headline: string;
  image: ImageAsset;
}
export interface Interest {
  id: string;
  title: string;
  english: string;
  image: ImageAsset;
  description: string;
  why: string;
  next: string;
}
export interface Photograph {
  id: string;
  title: string;
  category: string;
  image: ImageAsset;
  caption?: string;
  location?: string;
  date?: string;
}
export interface Project {
  slug: string;
  title: string;
  english: string;
  category: string;
  description: string;
  image: ImageAsset;
  tools: string[];
  status: string;
  body: { title: string; text: string }[];
  url?: string;
  repository?: string;
}
export interface JournalEntry {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  paragraphs: string[];
  image?: ImageAsset;
}
export interface ContactLink {
  labelEn?: string;
  id: string;
  label: string;
  value: string;
  url: string;
}
