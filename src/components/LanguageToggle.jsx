// src/components/LanguageToggle.jsx
import { useState } from 'react';

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

const ROUTE_MAP = {
  [`${BASE}/`]: `${BASE}/en/`,
  [`${BASE}/civiles`]: `${BASE}/en/civilians`,
  [`${BASE}/civiles/`]: `${BASE}/en/civilians/`,
  [`${BASE}/corporativo`]: `${BASE}/en/corporate`,
  [`${BASE}/corporativo/`]: `${BASE}/en/corporate/`,
  [`${BASE}/gobierno`]: `${BASE}/en/government`,
  [`${BASE}/gobierno/`]: `${BASE}/en/government/`,
  [`${BASE}/instalaciones`]: `${BASE}/en/facilities`,
  [`${BASE}/instalaciones/`]: `${BASE}/en/facilities/`,
  [`${BASE}/reservas`]: `${BASE}/en/booking`,
  [`${BASE}/reservas/`]: `${BASE}/en/booking/`,
  [`${BASE}/contacto`]: `${BASE}/en/contact`,
  [`${BASE}/contacto/`]: `${BASE}/en/contact/`,
};

const ROUTE_MAP_REVERSE = Object.fromEntries(
  Object.entries(ROUTE_MAP).map(([es, en]) => [en, es])
);

export default function LanguageToggle({ currentPath }) {
  const isEnglish = currentPath.includes('/en/') || currentPath.endsWith('/en');

  function toggleLang() {
    if (isEnglish) {
      const esPath = ROUTE_MAP_REVERSE[currentPath] ?? `${BASE}/`;
      localStorage.setItem('igc_lang', 'es');
      window.location.href = esPath;
    } else {
      const enPath = ROUTE_MAP[currentPath] ?? `${BASE}/en/`;
      localStorage.setItem('igc_lang', 'en');
      window.location.href = enPath;
    }
  }

  return (
    <button
      onClick={toggleLang}
      className="flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.15em] cursor-pointer"
      aria-label="Toggle language"
    >
      <span className={`px-2 py-1 transition-colors ${!isEnglish ? 'text-primary' : 'text-zinc-600 hover:text-zinc-400'}`}>ES</span>
      <span className="text-zinc-700">|</span>
      <span className={`px-2 py-1 transition-colors ${isEnglish ? 'text-primary' : 'text-zinc-600 hover:text-zinc-400'}`}>EN</span>
    </button>
  );
}
