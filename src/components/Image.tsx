import { useState } from 'react';
import type { ImageAsset } from '../types';
import { useLanguage } from '../i18n/Language';

interface Props { image: ImageAsset; className?: string; priority?: boolean; sizes?: string; }
export function Image({ image, className = '', priority = false, sizes = '(max-width: 767px) 100vw, 50vw' }: Props) {
  const { t, locale } = useLanguage();
  const alt = locale === 'en' ? image.altEn || image.alt : image.alt;
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  if (failed) return <span className={'media-image image-error ' + className} style={{ aspectRatio: image.width + '/' + image.height }} role="img" aria-label={alt + ' — ' + t('imageError')}><span>{t('imageError')}</span></span>;
  return <span className={'media-image ' + (loaded ? 'loaded ' : '') + className} style={{ aspectRatio: image.width + '/' + image.height }}>
    <img src={image.src} srcSet={image.small ? image.small + ' 640w, ' + image.src + ' 1280w' : undefined} sizes={sizes} alt={alt} width={image.width} height={image.height} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} onLoad={() => setLoaded(true)} onError={() => setFailed(true)} draggable={false} />
  </span>;
}
