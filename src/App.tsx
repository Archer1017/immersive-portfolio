import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Interests } from './pages/Interests';
import { Photography } from './pages/Photography';
import { Projects, ProjectDetail, MissingContent } from './pages/Projects';
import { Journal, JournalDetail } from './pages/Journal';
import { Contact } from './pages/Contact';
import { localePath, useLanguage, useSite } from './i18n/Language';
import type { Locale } from './i18n/Language';

const pages = { about: About, interests: Interests, photography: Photography, projects: Projects, journal: Journal, contact: Contact };
function Metadata() {
  const { path, locale, t } = useLanguage();
  const { sections, projects, journal, profile } = useSite();
  useEffect(() => {
    const section = sections.find(item => path === item.path || path.startsWith(item.path + '/'));
    const slug = path.split('/').pop();
    const detail = section?.kind === 'projects' ? projects.find(item => item.slug === slug) : section?.kind === 'journal' ? journal.find(item => item.slug === slug) : undefined;
    const title = detail?.title || section?.label || t(path === '/' ? 'homeTitle' : 'missingPage');
    document.documentElement.lang = locale === 'en' ? 'en' : 'zh-CN';
    document.title = title + ' / ' + profile.brand;
    const description = detail && 'description' in detail ? detail.description : detail && 'excerpt' in detail ? detail.excerpt : section?.description || profile.introduction;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
  }, [path, locale, sections, projects, journal, profile]);
  return null;
}
export function App() {
  const { sections } = useSite();
  const location = useLocation();
  return <><Metadata /><Layout><div className="route-content" key={location.pathname}><Routes>
    {(['zh', 'en'] as Locale[]).flatMap(locale => [
      <Route key={locale + '-home'} path={localePath('/', locale)} element={<Home />} />,
      ...sections.map(section => { const Page = pages[section.kind]; return <Route key={locale + section.id} path={localePath(section.path, locale)} element={<Page section={section} />} />; }),
      ...sections.filter(section => section.kind === 'projects').map(section => <Route key={locale + section.id + '-detail'} path={localePath(section.path + '/:slug', locale)} element={<ProjectDetail />} />),
      ...sections.filter(section => section.kind === 'journal').map(section => <Route key={locale + section.id + '-detail'} path={localePath(section.path + '/:slug', locale)} element={<JournalDetail />} />),
    ])}
    <Route path="*" element={<MissingContent />} />
  </Routes></div></Layout></>;
}
