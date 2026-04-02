// src/components/LanguageToggle.jsx
import { useState } from 'react';

const ROUTE_MAP = {
  '/': '/en/',
  '/civiles': '/en/civilians',
  '/corporativo': '/en/corporate',
  '/gobierno': '/en/government',
  '/instalaciones': '/en/facilities',
  '/reservas': '/en/booking',
  '/contacto': '/en/contact',
};

const ROUTE_MAP_REVERSE = Object.fromEntries(
  Object.entries(ROUTE_MAP).map(([es, en]) => [en, es])
);

export default function LanguageToggle({ currentPath }) {
  const isEnglish = currentPath.startsWith('/en');

  function toggleLang() {
    if (isEnglish) {
      const esPath = ROUTE_MAP_REVERSE[currentPath] ?? '/';
      localStorage.setItem('igc_lang', 'es');
      window.location.href = esPath;
    } else {
      const enPath = ROUTE_MAP[currentPath] ?? '/en/';
      localStorage.setItem('igc_lang', 'en');
      window.location.href = enPath;
    }
  }

  return (
    <div className="flex border border-primary text-xs font-bold overflow-hidden cursor-pointer" onClick={toggleLang}>
      <span className={`px-3 py-1.5 transition-colors ${!isEnglish ? 'bg-primary text-black' : 'text-muted hover:text-primary'}`}>
        ES
      </span>
      <span className={`px-3 py-1.5 transition-colors ${isEnglish ? 'bg-primary text-black' : 'text-muted hover:text-primary'}`}>
        EN
      </span>
    </div>
  );
}
