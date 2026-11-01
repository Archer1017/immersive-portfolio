import { useParams } from 'react-router-dom';
import { Link, useLanguage, useSite } from '../i18n/Language';
import type { Section } from '../types';
import { PageIntro, SampleNotice, ContinueExploring } from '../components/Layout';
import { Image } from '../components/Image';
import { ArrowLeft, ArrowUpRight } from '../components/Icons';

export function Projects({ section }: { section: Section }) {
  const { projects } = useSite();
  const { t } = useLanguage();
  return <div className="content-page shell"><PageIntro english={section.english} title={section.headline} description={t('projectsDescription')} /><SampleNotice>{t('projectsNotice')}</SampleNotice><div className="projects-list">{projects.map((project, index) => <article className="project-feature" key={project.slug}><Link className="project-cover" to={section.path + '/' + project.slug}><Image image={project.image} priority={index === 0} sizes="(max-width: 767px) 100vw, 75vw" /><span className="sr-only">{t('viewProject', { title: project.title })}</span></Link><div className="project-summary"><div><p className="project-type">{project.category}<span>{project.status}</span></p><h2><Link to={section.path + '/' + project.slug}>{project.title}<ArrowUpRight size={27} /></Link></h2><p>{project.description}</p></div><div className="project-tools">{project.tools.map(tool => <span key={tool}>{tool}</span>)}</div></div></article>)}</div>{projects.length === 0 && <p className="empty-state">{t('projectsEmpty')}</p>}<ContinueExploring current={section.id} /></div>;
}

export function ProjectDetail() {
  const { projects, sections } = useSite();
  const { t } = useLanguage();
  const { slug } = useParams();
  const project = projects.find(item => item.slug === slug);
  const base = sections.find(item => item.kind === 'projects')?.path || '/projects';
  if (!project) return <MissingContent />;
  return <article className="detail-page shell"><Link className="back-link" to={base}><ArrowLeft size={16} />{t('allProjects')}</Link><p className="page-english">{project.english}</p><h1>{project.title}</h1><p className="detail-lead">{project.description}</p><div className="detail-meta"><span>{project.category}</span><span>{project.status}</span>{project.tools.map(tool => <span key={tool}>{tool}</span>)}</div><SampleNotice /><div className="detail-cover"><Image image={project.image} priority sizes="100vw" /></div><div className="reading-content">{project.body.map(block => <section key={block.title}><h2>{block.title}</h2><p>{block.text}</p></section>)}<div className="detail-links">{project.url && <a className="button button-light" href={project.url} target="_blank" rel="noopener noreferrer">{t('tryProject')}<ArrowUpRight size={17} /></a>}{project.repository && <a className="text-link" href={project.repository} target="_blank" rel="noopener noreferrer">{t('sourceCode')}<ArrowUpRight size={17} /></a>}</div></div><ContinueExploring current="projects" /></article>;
}

export function MissingContent() {
  const { profile } = useSite();
  const { t } = useLanguage();
  return <div className="missing-page shell"><p className="page-english">A little detour</p><h1>{t('missingTitle')}</h1><p>{t('missingDescription')}</p><Link className="button button-light" to="/#directory">{t('missingReturn', { name: profile.name })}<ArrowUpRight size={18} /></Link></div>;
}
