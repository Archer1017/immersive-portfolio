import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@fontsource-variable/manrope';
import { App } from './App';
import './styles.css';
import { LanguageProvider } from './i18n/Language';
createRoot(document.getElementById('root')!).render(<StrictMode><BrowserRouter><LanguageProvider><App /></LanguageProvider></BrowserRouter></StrictMode>);
