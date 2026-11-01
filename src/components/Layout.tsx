import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Link, NavLink, LanguageSwitch, useLanguage, useSite } from '../i18n/Language';
import { ArrowLeft, ArrowUpRight, Asterisk, List, X } from './Icons';

export function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const { t, path } = useLanguage();
  const { profile, sections } = useSite();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDialogElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const firstRender = useRef(true);
  const selected = sections.find(section => path === section.path || path.startsWith(section.path + '/'));
  useEffect(() => {
    setMenuOpen(false);
    if (location.hash === '#directory') {
      requestAnimationFrame(() => document.getElementById('directory')?.scrollIntoView({ behavior: 'instant' }));
    } else window.scrollTo({ top: 0, behavior: 'instant' });
    if (!firstRender.current) mainRef.current?.focus({ preventScroll: true });
    firstRender.current = false;
  }, [location.pathname, location.hash]);
  useEffect(() => {
    const dialog = menuRef.current;
    if (!dialog) return;
    if (menuOpen) {
      const previous = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      dialog.showModal();
      return () => { dialog.close(); document.body.style.overflow = previous; menuButton.current?.focus({ preventScroll: true }); };
    }
  }, [menuOpen]);
  return <>
    <a className="skip-link" href="#main-content">{t('skip')}</a>
    <header className="site-header shell">
      <Link className="brand" to="/" aria-label={profile.brand + ' ' + t('home')}><Asterisk size={27} weight="light" /><span>{profile.brand}</span></Link>
      <span className="header-caption">a personal corner of the internet</span>
      <div className="header-actions"><LanguageSwitch /><nav className="header-nav" aria-label={t('mainNav')}><NavLink to="/" end>{t('home')}</NavLink><Link to="/#directory">{t('directory')}</Link><button ref={menuButton} className="menu-button" type="button" aria-expanded={menuOpen} aria-controls="global-menu" aria-label={t('menu')} onClick={() => setMenuOpen(true)}><span className="menu-button-label">{selected ? selected.label : t('menu')}</span><List size={21} /></button></nav></div>
    </header>
    <main id="main-content" ref={mainRef} tabIndex={-1}>{children}</main>
    <footer className="site-footer shell"><Link className="footer-brand" to="/">{profile.brand}<Asterisk size={16} /></Link><p>{profile.footer}</p><span>© {new Date().getFullYear()}</span></footer>
    <dialog id="global-menu" ref={menuRef} className="navigation-dialog" aria-label={t('menu')} onCancel={event => { event.preventDefault(); setMenuOpen(false); }} onClick={event => { if (event.target === event.currentTarget) setMenuOpen(false); }}>
      <div className="navigation-inner"><div className="navigation-top"><span>{t('choosePage')}</span><button className="circle-button" aria-label={t('closeMenu')} onClick={() => setMenuOpen(false)}><X size={22} /></button></div><nav aria-label={t('allPages')}><NavLink to="/" end onClick={() => setMenuOpen(false)}>{t('home')}<ArrowUpRight size={21} /></NavLink>{sections.map(section => <NavLink key={section.id} to={section.path} onClick={() => setMenuOpen(false)}>{section.label}<ArrowUpRight size={21} /></NavLink>)}</nav><Link className="navigation-return" to="/#directory" onClick={() => setMenuOpen(false)}><ArrowLeft size={18} />{t('backWheel')}</Link></div>
    </dialog>
  </>;
}

export function SampleNotice({ children }: { children?: ReactNode }) {
  const { profile } = useSite();
  const { t } = useLanguage();
  if (!profile.demo) return null;
  return <p className="sample-notice"><span>{t('demo')}</span>{children || t('sampleNotice')}</p>;
}

export function PageIntro({ english, title, description }: { english: string; title: string; description: string }) {
  const { t } = useLanguage();
  return <header className="page-intro"><Link className="back-link" to="/#directory"><ArrowLeft size={16} />{t('backDirectory')}</Link><p className="page-english">{english}</p><h1>{title}</h1><p className="page-description">{description}</p></header>;
}

export function ContinueExploring({ current }: { current: string }) {
  const { sections } = useSite();
  const { t } = useLanguage();
  const index = sections.findIndex(item => item.id === current);
  const next = sections[(index + 1) % sections.length];
  if (!next) return null;
  return <aside className="continue-exploring"><div><span>{t('keepExploring')}</span><Link to={next.path}>{next.label}<ArrowUpRight size={29} /></Link></div><Link className="text-link" to="/#directory">{t('backDirectory')}<ArrowLeft size={17} /></Link></aside>;
}
