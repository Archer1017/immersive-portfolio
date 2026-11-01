import { useLanguage, useSite } from '../i18n/Language';
import type { Section } from '../types';
import { PageIntro, SampleNotice, ContinueExploring } from '../components/Layout';
import { Asterisk, ArrowUpRight, EnvelopeSimple } from '../components/Icons';
export function Contact({ section }: { section: Section }) {
  const { contacts } = useSite();
  const { t } = useLanguage();
  const validContacts = contacts.filter(contact => ['https:', 'http:', 'mailto:'].some(protocol => contact.url.toLowerCase().startsWith(protocol)));
  return <div className="content-page contact-page shell"><PageIntro english={section.english} title={section.headline} description={t('contactDescription')} /><div className="contact-composition"><Asterisk size={150} weight="thin" className="contact-asterisk" /><div><h2>{t('contactTitleOne')}<br /><span>{t('contactTitleTwo')}</span></h2><p>{t('contactNote')}</p></div></div>{validContacts.length ? <div className="contact-list">{validContacts.map(contact => { const external = /^https?:/i.test(contact.url); return <a key={contact.id} href={contact.url} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}><span>{contact.label}</span><strong>{contact.value}</strong><ArrowUpRight size={24} /></a>; })}</div> : <div className="contact-empty"><EnvelopeSimple size={27} weight="light" /><div><h3>{t('contactEmptyTitle')}</h3><p>{t('contactEmptyDescription')}</p></div></div>}{!validContacts.length && <SampleNotice>{t('contactNotice')}</SampleNotice>}<ContinueExploring current={section.id} /></div>;
}
