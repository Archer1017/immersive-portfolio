import { useState } from 'react';
import { useLanguage, useSite } from '../i18n/Language';
import type { Section } from '../types';
import { PageIntro, SampleNotice, ContinueExploring } from '../components/Layout';
import { Image } from '../components/Image';
import { Lightbox } from '../components/Lightbox';
import { ArrowUpRight } from '../components/Icons';
export function Photography({ section }: { section: Section }) {
  const { photographs } = useSite();
  const { t } = useLanguage();
  const [filter, setFilter] = useState<string | null>(null);
  const [active, setActive] = useState<number | null>(null);
  const categories = [null, ...new Set(photographs.map(item => item.category))];
  const items = filter === null ? photographs : photographs.filter(item => item.category === filter);
  return <div className="content-page shell"><PageIntro english={section.english} title={section.headline} description={t('photographyDescription')} /><SampleNotice>{t('photographyNotice')}</SampleNotice><div className="gallery-toolbar"><div className="filter-list" role="group" aria-label={t('photoCategories')}>{categories.map(category => <button type="button" key={category ?? "all"} aria-pressed={filter === category} onClick={() => setFilter(category)}>{category ?? t('all')}</button>)}</div><span aria-live="polite">{t(items.length === 1 ? 'photoCountOne' : 'photoCount', { count: items.length })}</span></div><div className="photo-gallery">{items.map((item, index) => <button type="button" className="gallery-item" key={item.id} onClick={() => setActive(index)}><Image image={item.image} priority={index < 2} sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw" /><span className="gallery-caption"><span>{item.title}</span><ArrowUpRight size={17} /></span><span className="sr-only">{t('viewPhoto')}</span></button>)}</div>{items.length === 0 && <p className="empty-state">{t('photosEmpty')}</p>}<ContinueExploring current={section.id} />{active !== null && <Lightbox items={items} index={active} onChange={setActive} onClose={() => setActive(null)} />}</div>;
}
