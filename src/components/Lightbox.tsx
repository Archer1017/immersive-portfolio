import { useEffect, useRef } from 'react';
import type { Photograph } from '../types';
import { useLanguage } from '../i18n/Language';
import { Image } from './Image';
import { ArrowLeft, ArrowRight, X } from './Icons';

interface Props { items: Photograph[]; index: number; onChange: (index: number) => void; onClose: () => void; }
export function Lightbox({ items, index, onChange, onClose }: Props) {
  const { t } = useLanguage();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const item = items[index];
  const change = (direction: number) => onChange((index + direction + items.length) % items.length);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    const dialog = dialogRef.current;
    document.body.style.overflow = 'hidden';
    dialog?.showModal();
    return () => { dialog?.close(); document.body.style.overflow = overflow; previous?.focus({ preventScroll: true }); };
  }, []);
  if (!item) return null;
  return <dialog className="lightbox" ref={dialogRef} aria-label={t('photoDialog', { title: item.title })} onCancel={event => { event.preventDefault(); onClose(); }} onKeyDown={event => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); change(event.key === 'ArrowRight' ? 1 : -1); } }}>
    <div className="lightbox-top"><span>PHOTOGRAPHY <small>{index + 1} / {items.length}</small></span><button autoFocus type="button" className="circle-button" aria-label={t('closePhoto')} onClick={onClose}><X size={23} /></button></div>
    <div className="lightbox-stage" onTouchStart={event => { touch.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }} onTouchEnd={event => { if (!touch.current) return; const dx = event.changedTouches[0].clientX - touch.current.x; const dy = event.changedTouches[0].clientY - touch.current.y; if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.4) change(dx < 0 ? 1 : -1); touch.current = null; }}>
      <button type="button" className="circle-button lightbox-prev" aria-label={t('previousPhoto')} onClick={() => change(-1)} disabled={items.length < 2}><ArrowLeft size={21} /></button>
      <Image key={item.id} image={item.image} priority sizes="(max-width: 767px) 100vw, 85vw" />
      <button type="button" className="circle-button lightbox-next" aria-label={t('nextPhoto')} onClick={() => change(1)} disabled={items.length < 2}><ArrowRight size={21} /></button>
    </div>
    <div className="lightbox-bottom" aria-live="polite"><div><h2>{item.title}</h2><p>{item.caption || t('photoCaption')}</p></div><span>{[item.location, item.date].filter(Boolean).join(' / ')}{!item.location && !item.date ? t('sampleImage') : ''}</span></div>
  </dialog>;
}
