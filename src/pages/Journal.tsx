import { useParams } from 'react-router-dom';
import { Link, useLanguage, useSite } from '../i18n/Language';
import type { Locale } from '../i18n/Language';
import type { Section } from '../types';
import { PageIntro, SampleNotice, ContinueExploring } from '../components/Layout';
import { Image } from '../components/Image';
import { ArrowLeft, ArrowUpRight } from '../components/Icons';
import { MissingContent } from './Projects';
const formatDate = (date: string, locale: Locale) => locale === 'zh' ? date.split('-').join('.') : new Intl.DateTimeFormat('en', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(date + 'T00:00:00Z'));
export function Journal({ section }: { section: Section }) {
  const { journal } = useSite();
  const { t, locale } = useLanguage();
  return <div className="content-page journal-page shell"><PageIntro english={section.english} title={section.headline} description={t('journalDescription')} /><SampleNotice>{t('journalNotice')}</SampleNotice><div className="journal-list">{journal.map((entry, index) => <article className={'journal-entry ' + (index === 0 ? 'journal-featured' : '')} key={entry.slug}><span className="journal-date"><time dateTime={entry.date}>{formatDate(entry.date, locale)}</time><span>{entry.category}</span></span><div className="journal-entry-copy"><h2><Link to={section.path + '/' + entry.slug}>{entry.title}<ArrowUpRight size={24} /></Link></h2><p>{entry.excerpt}</p>{entry.image && <Link className="journal-image" to={section.path + '/' + entry.slug}><Image image={entry.image} sizes="(max-width: 767px) 100vw, 66vw" /><span className="sr-only">{t('readEntry', { title: entry.title })}</span></Link>}</div></article>)}</div>{journal.length === 0 && <p className="empty-state">{t('journalEmpty')}</p>}<ContinueExploring current={section.id} /></div>;
}
export function JournalDetail() {
  const { journal, sections } = useSite();
  const { t, locale } = useLanguage();
  const { slug } = useParams();
  const entry = journal.find(item => item.slug === slug);
  const base = sections.find(item => item.kind === 'journal')?.path || '/journal';
  if (!entry) return <MissingContent />;
  return <article className="detail-page journal-detail shell"><Link className="back-link" to={base}><ArrowLeft size={16} />{t('allJournal')}</Link><p className="page-english">Journal / {entry.category}</p><h1>{entry.title}</h1><time className="article-date" dateTime={entry.date}>{formatDate(entry.date, locale)}</time><SampleNotice />{entry.image && <div className="detail-cover"><Image image={entry.image} priority sizes="100vw" /></div>}<div className="reading-content">{entry.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div><ContinueExploring current="journal" /></article>;
}
