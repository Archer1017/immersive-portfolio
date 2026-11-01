import { useLanguage, useSite } from '../i18n/Language';
import type { Section } from '../types';
import { PageIntro, SampleNotice, ContinueExploring } from '../components/Layout';
import { Image } from '../components/Image';
import { Plus } from '../components/Icons';
export function Interests({ section }: { section: Section }) {
  const { interests } = useSite();
  const { t } = useLanguage();
  return <div className="content-page shell"><PageIntro english={section.english} title={section.headline} description={t('interestsDescription')} /><SampleNotice>{t('interestsNotice')}</SampleNotice><div className="interest-list">{interests.map((item, index) => <article className="interest-item" key={item.id}><div className="interest-image"><Image image={item.image} priority={index === 0} /></div><div className="interest-copy"><span className="interest-english">{item.english}</span><h2>{item.title}</h2><p className="interest-description">{item.description}</p><dl><div><dt>{t('why')}</dt><dd>{item.why}</dd></div><div><dt>{t('nextPlan')}</dt><dd>{item.next}</dd></div></dl></div></article>)}</div><div className="interest-open"><Plus size={25} /><p>{t('moreInterests')}</p></div><ContinueExploring current={section.id} /></div>;
}
