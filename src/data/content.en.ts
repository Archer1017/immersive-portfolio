import * as zh from './content';
import type { ImageAsset, Interest, JournalEntry, Photograph, Project, Section, SectionKind } from '../types';

// English copy lives here. IDs, routes, images and real links are shared with content.ts.
const alt: Record<string, string> = {
  mountain: 'A green mountain valley and winding path in the mist. Sample image.',
  light: 'A lighthouse glowing beneath a starry sky. Sample image.',
  building: 'Looking up at the lines of a modern building. Sample image.',
  canyon: 'Warm evening light falling across a rocky canyon. Sample image.',
  waterfall: 'A natural landscape. Portrait sample image.',
  city: 'A view of the city. Sample image.',
  dog: 'A small dog wrapped in a blanket. Sample image.',
};
export const assets: Record<string, ImageAsset> = Object.fromEntries(Object.entries(zh.assets).map(([key, asset]) => [key, { ...asset, alt: asset.altEn || alt[key] || asset.alt }]));
function image(asset: ImageAsset) { return { ...asset, alt: asset.altEn || Object.values(assets).find(item => item.src === asset.src)?.alt || asset.alt }; }
export const profile = {
  ...zh.profile,
  headline: ['Many sides.', 'All me.'],
  introduction: 'A curious soul, collecting moments and making things. Welcome to my little world.',
  shortIntroduction: 'Notice the world. Keep what you love. Grow at your own pace.',
  heroImage: image(zh.profile.heroImage), heroSecondary: image(zh.profile.heroSecondary),
  footer: 'Stay curious. Take your time.',
};
const sectionCopy: Record<SectionKind, Pick<Section, 'label' | 'description' | 'headline'>> = {
  about: { label: 'About me', description: 'Thoughts, values, and the little things that make me who I am.', headline: 'A little introduction.' },
  interests: { label: 'Interests', description: 'Things that make me lose track of time and keep me curious.', headline: 'Make time for what you love.' },
  photography: { label: 'Photos', description: 'Moments worth keeping, and coming back to.', headline: 'Some moments ask us to stay.' },
  projects: { label: 'Projects', description: 'Turning a little possibility into something real.', headline: 'Give an idea a beginning.' },
  journal: { label: 'Journal', description: 'Unfinished thoughts and perfectly ordinary days.', headline: 'A few echoes of everyday life.' },
  contact: { label: 'Contact', description: 'A hello, a conversation, and perhaps a new connection.', headline: 'Lovely to meet you here.' },
};
export const sections: Section[] = zh.sections.map(section => ({ ...section, ...sectionCopy[section.kind], image: image(section.image) }));
export const about = {
  opening: 'I like finding different ways to see the same world.',
  paragraphs: ['Sometimes it is a camera, sometimes a piece of design, sometimes a few words just for myself. Creating is less a special occasion and more a way of noticing everyday life.', 'This website is a room I am still arranging, filled with interests, experiments and little pieces of life. You can start anywhere.'],
  tags: ['Led by curiosity', 'Always looking', 'Learning by making', 'Finding joy in the ordinary'],
  values: [
    { title: 'Leave room for curiosity', text: 'Stay open to things I have not tried. There is no rush to define myself.' },
    { title: 'Pay attention', text: 'Remember why I started, and make space to enjoy the journey.' },
    { title: 'Keep expressing', text: 'Save the observations and ideas, even when they are still a little imperfect.' },
  ],
  timeline: [
    { when: 'A beginning', title: 'Start collecting', text: 'Bring together moments from the camera roll and ideas from scattered notes.' },
    { when: 'Right now', title: 'A home for creating', text: 'Make a personal corner of the internet where different interests can meet.' },
    { when: 'What comes next', title: 'Keep trying', text: 'There are plenty of unfinished ideas. Some can wait for a future me.' },
  ],
};
const interestCopy: Record<string, Pick<Interest, 'title' | 'description' | 'why' | 'next'>> = {
  walking: { title: 'A walk without a destination', description: 'Take a turn off the familiar path and see what is just around the corner.', why: 'Walking lets my thoughts find a different pace.', next: 'Make a small map of my favourite walks.' },
  photography: { title: 'Looking through a lens', description: 'I love the moments that make me pause more than the idea of a perfect photograph.', why: 'A camera reminds me to really look, rather than just pass by.', next: 'Try a small photo study of everyday light.' },
  making: { title: 'Making something of my own', description: 'A design, a collage, a little website. Give an idea a shape I can actually see.', why: 'Going from nothing to something always teaches me something new.', next: 'Finish one small creative experiment each month.' },
};
export const interests: Interest[] = zh.interests.map(item => ({ ...item, ...interestCopy[item.id], image: image(item.image) }));
const photoCopy: Record<string, Pick<Photograph, 'title' | 'category'> & { caption?: string }> = {
  green: { title: 'The winding way', category: 'Nature', caption: 'Slow down a little. There is more to see.' },
  water: { title: 'Follow the sound of water', category: 'Nature' },
  light: { title: 'A light in the night', category: 'Light', caption: 'Sometimes one small light is enough to make you stop.' },
  geometry: { title: 'City geometry', category: 'City' },
  companion: { title: 'A little warmth', category: 'Everyday' },
  evening: { title: 'The last of the sun', category: 'Nature' },
  street: { title: 'Passing through', category: 'City' },
};
export const photographs: Photograph[] = zh.photographs.map(item => ({ ...item, ...photoCopy[item.id], image: image(item.image) }));
const projectCopy: Record<string, Pick<Project, 'title' | 'category' | 'description' | 'tools' | 'status' | 'body'>> = {
  'personal-space': {
    title: 'A personal digital space', category: 'Interactive website', description: 'A turning directory that connects everyday life, interests and creative experiments.', tools: ['React', 'TypeScript', 'CSS'], status: 'Exploring',
    body: [
      { title: 'Where it begins', text: 'Instead of fitting a person into a résumé, this sample project explores a more open way to share a life. It is a demonstration entry.' },
      { title: 'How it takes shape', text: 'Start with a wheel, then let each kind of content become its own connected space. This is a place for design notes, sketches and the process behind the work.' },
      { title: 'What comes next', text: 'Replace the placeholders with real work and everyday stories, allowing a personal voice to grow over time.' },
    ],
  },
  'light-collection': {
    title: 'Collecting the light', category: 'Visual study', description: 'A series of everyday images exploring how light changes the way a moment feels.', tools: ['Photography', 'Image editing', 'Layout'], status: 'An idea',
    body: [
      { title: 'The first thought', text: 'This is a sample project waiting to unfold. It can hold the original idea, inspirations and questions to explore.' },
      { title: 'A process to remember', text: 'From taking pictures and choosing images to arranging them on a page, keep a record of each experiment and adjustment.' },
    ],
  },
};
export const projects: Project[] = zh.projects.map(item => ({ ...item, ...projectCopy[item.slug], image: image(item.image) }));
const journalCopy: Record<string, Pick<JournalEntry, 'title' | 'category' | 'excerpt' | 'paragraphs'>> = {
  'a-place-to-begin': { title: 'A home for scattered thoughts', category: 'Thoughts', excerpt: 'Camera rolls, sticky notes, unfinished drafts. Maybe they could all live in one place.', paragraphs: ['This is a sample journal entry. Ideas rarely arrive neatly arranged. Sometimes they are a photograph, a conversation, or a sentence that appears on a walk.', 'I wanted a place where those little moments could slowly come together. It does not need to be finished all at once, or have a fixed shape just yet.', 'Start here. Save a little at a time.'] },
  'taking-the-long-way': { title: 'Taking the long way home', category: 'Everyday', excerpt: 'A little time without a destination can still be worth remembering.', paragraphs: ['This sample entry demonstrates how a personal story can look on the page.', 'Instead of rushing along the most familiar route, take a different street now and then. You might find nothing at all. You might find a beautiful patch of light.', 'This space can hold travel, books, walks, or any other part of life worth keeping.'] },
  'leave-some-space': { title: 'Some things can stay unanswered', category: 'Reflections', excerpt: 'An empty space can be an invitation to something new.', paragraphs: ['This is a sample short piece. The page leaves room for longer writing in the future.', 'Begin with a small paragraph and slowly add photographs, thoughts and experiences. Let it grow at its own pace.'] },
};
export const journal: JournalEntry[] = zh.journal.map(item => ({ ...item, ...journalCopy[item.slug], image: item.image ? image(item.image) : undefined }));
export const contacts = zh.contacts.map(item => ({ ...item, label: item.labelEn || item.label }));
