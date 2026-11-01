import { useLanguage, useSite } from '../i18n/Language';
import type { Section } from '../types';
import { PageIntro, SampleNotice, ContinueExploring } from '../components/Layout';
import { Image } from '../components/Image';
import { Asterisk } from '../components/Icons';

export function About({ section }: { section: Section }) {
  const { about, assets, profile } = useSite();
  const { t } = useLanguage();
  return <div className="content-page shell"><PageIntro english={section.english} title={section.headline} description={t('aboutDescription')} /><SampleNotice />
    <section className="about-story"><div className="about-portrait"><Image image={assets.mountain} priority /><span className="portrait-name">{profile.name}<Asterisk size={33} /></span></div><div className="about-prose"><span className="small-label">{t('niceToMeet')}</span><h2>{about.opening}</h2>{about.paragraphs.map(text => <p key={text}>{text}</p>)}<div className="tag-list">{about.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div></section>
    <section className="values-section"><h2>{t('valuesTitle')}</h2><div className="values-list">{about.values.map((value, index) => <article key={value.title}><span className="value-number">0{index + 1}</span><h3>{value.title}</h3><p>{value.text}</p></article>)}</div></section>
    <section className="timeline-section"><h2>{t('timelineTitle')}</h2><div className="timeline">{about.timeline.map(item => <article key={item.when}><span>{item.when}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section><ContinueExploring current={section.id} />
  </div>;
}
