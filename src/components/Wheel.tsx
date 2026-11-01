import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, KeyboardEvent, PointerEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { sections as baseSections } from '../data/content';
import { Link, useLanguage, useSite } from '../i18n/Language';
import type { SectionKind } from '../types';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Asterisk, Camera, EnvelopeSimple, Heart, Notebook, Shapes, UserCircle } from './Icons';
import { Image } from './Image';

const icons = { about: UserCircle, interests: Heart, photography: Camera, projects: Shapes, journal: Notebook, contact: EnvelopeSimple };
const modulo = (value: number, count: number) => ((value % count) + count) % count;
const limit = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const step = 360 / Math.max(baseSections.length, 1);
function initialIndex() {
  try { return Math.max(0, baseSections.findIndex(item => item.id === sessionStorage.getItem('space-section'))); } catch { return 0; }
}
function rememberSection(id: string) {
  try { sessionStorage.setItem('space-section', id); } catch { /* Navigation remains usable without storage. */ }
}

export function Wheel() {
  const { sections } = useSite();
  const { t, to, locale } = useLanguage();
  const [selected, setSelected] = useState(initialIndex);
  const selectedRef = useRef(selected);
  const scene = useRef<HTMLDivElement>(null);
  const rotation = useRef(-selected * step);
  const targetRotation = useRef(rotation.current);
  const frame = useRef(0);
  const suppressedUntil = useRef(0);
  const drag = useRef<null | { id: number; x: number; y: number; lastAngle: number; start: number; last: number; time: number; velocity: number; moved: boolean; touch: boolean }>(null);
  const reduced = useReducedMotion();
  const navigate = useNavigate();
  const current = sections[selected];

  function paint(value: number) {
    rotation.current = value;
    scene.current?.style.setProperty('--rotation', value + 'deg');
    const index = modulo(Math.round(-value / step), sections.length);
    if (index !== selectedRef.current) {
      selectedRef.current = index;
      setSelected(index);
    }
  }

  function settle(value: number) {
    cancelAnimationFrame(frame.current);
    targetRotation.current = value;
    if (reduced) { paint(value); return; }
    const from = rotation.current;
    const start = performance.now();
    const duration = limit(Math.abs(value - from) * 3 + 320, 320, 650);
    function tick(now: number) {
      const progress = Math.min(1, (now - start) / duration);
      paint(from + (value - from) * (1 - Math.pow(1 - progress, 4)));
      if (progress < 1) frame.current = requestAnimationFrame(tick);
    }
    frame.current = requestAnimationFrame(tick);
  }

  function intendedIndex() {
    return modulo(Math.round(-targetRotation.current / step), sections.length);
  }

  function choose(index: number, focus = false) {
    const currentIndex = -targetRotation.current / step;
    const closestIndex = index + Math.round((currentIndex - index) / sections.length) * sections.length;
    settle(-closestIndex * step);
    if (focus) scene.current?.querySelector<HTMLAnchorElement>('[data-index="' + index + '"]')?.focus({ preventScroll: true });
  }

  function angle(event: PointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    return Math.atan2(event.clientY - bounds.top - bounds.height / 2, event.clientX - bounds.left - bounds.width / 2) * 180 / Math.PI;
  }

  function pointerDown(event: PointerEvent<HTMLDivElement>) {
    if (!event.isPrimary || event.button !== 0 || (event.target as HTMLElement).closest('[data-no-drag]')) return;
    cancelAnimationFrame(frame.current);
    targetRotation.current = rotation.current;
    drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY, lastAngle: angle(event), start: rotation.current, last: rotation.current, time: performance.now(), velocity: 0, moved: false, touch: event.pointerType === 'touch' };
  }

  function pointerMove(event: PointerEvent<HTMLDivElement>) {
    const d = drag.current;
    if (!d || d.id !== event.pointerId) return;
    const dx = event.clientX - d.x;
    const dy = event.clientY - d.y;
    if (!d.moved) {
      if (Math.hypot(dx, dy) < 7) return;
      if (d.touch && Math.abs(dy) > Math.abs(dx) * 1.15) { drag.current = null; settle(Math.round(rotation.current / step) * step); return; }
      d.moved = true;
      event.currentTarget.setPointerCapture(event.pointerId);
      event.currentTarget.dataset.dragging = 'true';
    }
    const nextAngle = angle(event);
    let delta = nextAngle - d.lastAngle;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    const next = d.touch ? d.start + dx / event.currentTarget.clientWidth * 270 : targetRotation.current + delta;
    const now = performance.now();
    const elapsed = now - d.time;
    if (elapsed > 0) d.velocity = d.velocity * .3 + (next - d.last) / elapsed * .7;
    d.lastAngle = nextAngle;
    d.last = next;
    d.time = now;
    targetRotation.current = next;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => paint(next));
  }

  function pointerEnd(event: PointerEvent<HTMLDivElement>, cancelled = false) {
    const d = drag.current;
    if (!d || d.id !== event.pointerId) return;
    drag.current = null;
    event.currentTarget.dataset.dragging = 'false';
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    if (d.moved) {
      suppressedUntil.current = performance.now() + 350;
      paint(targetRotation.current);
      const velocity = performance.now() - d.time < 100 && !cancelled ? d.velocity : 0;
      const projected = rotation.current + limit(velocity * 130, -step * 1.3, step * 1.3);
      settle(Math.round(projected / step) * step);
    } else if (cancelled) settle(Math.round(rotation.current / step) * step);
  }

  function keyboard(event: KeyboardEvent<HTMLDivElement>) {
    const focusedLink = (event.target as HTMLElement).closest('[data-index]');
    const base = focusedLink ? Number(focusedLink.getAttribute('data-index')) : intendedIndex();
    const keys: Record<string, number> = { ArrowRight: modulo(base + 1, sections.length), ArrowDown: modulo(base + 1, sections.length), ArrowLeft: modulo(base - 1, sections.length), ArrowUp: modulo(base - 1, sections.length), Home: 0, End: sections.length - 1 };
    if (event.key in keys) { event.preventDefault(); choose(keys[event.key], Boolean(focusedLink)); }
    else if (event.key === 'Enter' && event.target === event.currentTarget) {
      event.preventDefault();
      rememberSection(sections[base].id);
      navigate(to(sections[base].path));
    }
  }

  useEffect(() => {
    scene.current?.style.setProperty('--rotation', rotation.current + 'deg');
    return () => cancelAnimationFrame(frame.current);
  }, []);
  useEffect(() => { if (current) rememberSection(current.id); }, [current?.id]);

  if (!current) return <p className="empty-state">{t('wheelEmpty')}</p>;
  return <div className="directory-layout">
    <div className="directory-copy">
      <p className="eyebrow">THE DIRECTORY</p>
      <h2 id="directory-title">{t('wheelTitleOne')}<br />{t('wheelTitleTwo')}</h2>
      <p className="directory-intro">{t('wheelDescription')}</p>
      <div className="directory-selection" aria-live="polite" aria-atomic="true">
        <span className="selection-label">{t('exploring')}{locale === 'zh' ? ' / ' + current.english : ''}</span>
        <h3><Link to={current.path}>{current.label}<ArrowUpRight size={23} /></Link></h3>
        <p>{current.description}</p>
        <Link className="button button-light" to={current.path}>{t('enterSection', { section: current.label })}<ArrowUpRight size={17} /></Link>
      </div>
    </div>
    <div className="wheel-column">
      <div className="wheel-scene" ref={scene} role="group" aria-roledescription={t('wheelRole')} aria-label={t('wheelLabel')} aria-describedby="wheel-instructions" tabIndex={0} onKeyDown={keyboard} onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={event => pointerEnd(event)} onPointerCancel={event => pointerEnd(event, true)} onClickCapture={event => { if (event.detail > 0 && performance.now() < suppressedUntil.current) { event.preventDefault(); event.stopPropagation(); } }}>
        <div className="wheel-ticks" aria-hidden="true" />
        <div className="wheel-track wheel-track-outer" aria-hidden="true" /><div className="wheel-track wheel-track-inner" aria-hidden="true" />
        <span className="wheel-pointer" aria-hidden="true" />
        <div className="wheel-rotor">
          {sections.map((section, index) => {
            const Icon = icons[section.kind as SectionKind];
            return <div className="wheel-node" key={section.id} style={{ '--node-angle': index * step + 'deg' } as CSSProperties}><Link className={'wheel-label ' + (selected === index ? 'is-selected' : '')} to={section.path} data-index={index} onClick={() => rememberSection(section.id)} onDragStart={event => event.preventDefault()}><Icon size={25} weight="light" /><span>{section.label}</span>{locale === 'zh' && <small>{section.english}</small>}{selected === index && <span className="sr-only">{t('selected')}</span>}</Link></div>;
          })}
        </div>
        <div className="wheel-center" data-no-drag="true"><Image key={current.id} image={current.image} sizes="180px" /><span className="wheel-center-shade" /><Asterisk size={30} weight="light" /><span>little things,<br />a whole world.</span></div>
      </div>
      <div className="wheel-controls"><button type="button" className="circle-button" aria-label={t('previousSection')} onClick={() => choose(modulo(intendedIndex() - 1, sections.length))}><ArrowLeft size={18} /></button><p id="wheel-instructions"><span>{t('wheelInstructions')}</span><small>{t('wheelKeyboard')}</small></p><button type="button" className="circle-button" aria-label={t('nextSection')} onClick={() => choose(modulo(intendedIndex() + 1, sections.length))}><ArrowRight size={18} /></button></div>
    </div>
  </div>;
}
