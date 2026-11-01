import { Link as LanguageEntry } from 'react-router-dom';
import { Link, useLanguage, useSite } from '../i18n/Language';
import { ArrowDown, ArrowUpRight, Asterisk } from '../components/Icons';
import { Image } from '../components/Image';
import { Wheel } from '../components/Wheel';

export function Home() {
  const { profile, sections } = useSite();
  const { t } = useLanguage();
  return <div className="home-page">
    <section className="home-hero shell" aria-labelledby="home-title">
      <div className="hero-copy"><p className="hero-greeting">{t('hello')} {profile.name}<span> / {t('nameNote')}</span></p><h1 id="home-title">{profile.headline[0]}<br /><span>{profile.headline[1]}</span></h1><p className="hero-introduction">{profile.introduction}</p><nav className="hero-entries" aria-label={t('language')}><LanguageEntry className="hero-explore" to="/#directory" lang="zh-CN">{t('enterChinese')}<ArrowDown size={18} /></LanguageEntry><LanguageEntry className="hero-explore" to="/en#directory" lang="en">{t('enterEnglish')}<ArrowDown size={18} /></LanguageEntry></nav></div>
      <div className="hero-art"><div className="hero-orbit" aria-hidden="true" /><div className="hero-photo-main"><Image image={profile.heroImage} priority sizes="(max-width: 767px) 76vw, 39vw" /><span className="photo-edge" /></div><div className="hero-photo-small"><Image image={profile.heroSecondary} priority sizes="(max-width: 767px) 32vw, 16vw" /></div><Asterisk className="hero-asterisk" size={62} weight="thin" aria-hidden="true" /><span className="hero-handwritten">{profile.greeting}</span></div>
      <div className="hero-bottom"><span>{t('heroNote')}</span><Link to="/#directory">{t('scrollExplore')}<ArrowDown size={15} /></Link></div>
    </section>
    <section id="directory" className="directory-section shell" aria-labelledby="directory-title"><Wheel /></section>
    <section className="home-outro shell"><Asterisk size={35} weight="light" /><div><h2>{t('outroTitle')}</h2><p>{t('outroDescription')}</p></div><Link className="text-link" to={sections.find(section => section.kind === 'photography')?.path || '/'}>{t('seePhotos')}<ArrowUpRight size={18} /></Link></section>
    {profile.demo && <p className="home-demo shell">{t('homeDemo')}</p>}
  </div>;
}
