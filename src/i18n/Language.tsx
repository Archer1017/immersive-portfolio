import type { ReactNode } from 'react';
import { Link as RouterLink, NavLink as RouterNavLink, useLocation } from 'react-router-dom';
import type { LinkProps, NavLinkProps } from 'react-router-dom';
import * as chinese from '../data/content';
import * as english from '../data/content.en';
import { en, zh } from './messages';
import { LanguageContext, useLanguage } from './context';
import type { LanguageContextValue, Locale } from './context';
export { useLanguage } from './context';
export type { Locale } from './context';

export function localeForPath(path: string): Locale { return path === '/en' || path.startsWith('/en/') ? 'en' : 'zh'; }
export function contentPath(path: string) { return localeForPath(path) === 'en' ? path.slice(3) || '/' : path; }
export function localePath(path: string, locale: Locale) {
  if (!path.startsWith('/')) return path;
  const base = path.replace(/^\/en(?=\/|#|\?|$)/, '') || '/';
  return locale === 'en' ? '/en' + (base.startsWith('/#') || base.startsWith('/?') ? base.slice(1) : base === '/' ? '' : base) : base.startsWith('/') ? base : '/' + base;
}
export function LanguageProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const locale = localeForPath(location.pathname);
  const dictionary = locale === 'en' ? en : zh;
  const t: LanguageContextValue['t'] = (key, values = {}) => Object.entries(values).reduce((text, [name, value]) => text.replaceAll('{' + name + '}', String(value)), dictionary[key]);
  return <LanguageContext.Provider value={{ locale, path: contentPath(location.pathname), t, to: path => localePath(path, locale), languageUrl: next => localePath(location.pathname, next) + location.search + location.hash }}>{children}</LanguageContext.Provider>;
}
export function useSite() { return useLanguage().locale === 'en' ? english : chinese; }
export function Link({ to, ...props }: LinkProps) {
  const language = useLanguage();
  return <RouterLink {...props} to={typeof to === 'string' ? language.to(to) : to} />;
}
export function NavLink({ to, ...props }: NavLinkProps) {
  const language = useLanguage();
  return <RouterNavLink {...props} to={typeof to === 'string' ? language.to(to) : to} />;
}
export function LanguageSwitch() {
  const { locale, languageUrl, t } = useLanguage();
  return <nav className="language-switch" aria-label={t('language')}><RouterLink to={languageUrl('zh')} lang="zh-CN" hrefLang="zh-CN" aria-current={locale === 'zh' ? 'true' : undefined}>中文</RouterLink><span aria-hidden="true">/</span><RouterLink to={languageUrl('en')} lang="en" hrefLang="en" aria-current={locale === 'en' ? 'true' : undefined} aria-label="English">EN</RouterLink></nav>;
}
