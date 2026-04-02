// src/data/es/home.ts
export const hero = {
  tag: 'EL POLÍGONO MÁS GRANDE DE PANAMÁ',
  headline: 'EXPERIENCIA DE TIRO\nPROFESIONAL',
  subheadline: 'Seguro · Certificado · Para todos los niveles',
  ctaPrimary: { label: 'RESERVA AHORA', href: '/reservas' },
  ctaSecondary: { label: 'VER SERVICIOS', href: '/#servicios' },
};

export const valueProps = [
  { icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`, title: 'Seguridad Total', desc: 'Protocolos certificados en cada práctica' },
  { icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`, title: 'Adrenalina Real', desc: '+15 modelos de armas disponibles' },
  { icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`, title: 'Instructores Pro', desc: 'Certificados y con años de experiencia' },
];

export const howItWorks = {
  title: 'CÓMO FUNCIONA',
  steps: [
    { num: '1', label: 'Elige', desc: 'Selecciona tu experiencia' },
    { num: '2', label: 'Reserva', desc: 'Elige fecha y hora' },
    { num: '3', label: 'Paga', desc: 'Pago seguro online' },
    { num: '4', label: '¡Vive!', desc: 'Vive la experiencia' },
  ],
};

export const socialProof = {
  rating: '4.8',
  reviewCount: '245',
  reviewPlatform: 'Google',
  tagline: '+500 experiencias completadas',
};

export const faq = [
  { q: '¿Cuál es la edad mínima para disparar?', a: 'La edad mínima es 18 años. Menores de edad pueden participar en algunas actividades con autorización escrita de sus padres.' },
  { q: '¿Necesito experiencia previa?', a: 'No. Contamos con instructores certificados para principiantes. Todos nuestros paquetes incluyen briefing de seguridad.' },
  { q: '¿Qué debo llevar?', a: 'Solo ropa cómoda y zapatos cerrados. Nosotros proveemos armas, munición, lentes y protección auditiva.' },
  { q: '¿Puedo traer mi propio equipo?', a: 'Sí, previa inspección de seguridad. Contacta con nosotros para los detalles.' },
  { q: '¿Tienen paquetes para grupos?', a: 'Sí. Atendemos grupos desde 5 hasta más de 100 personas para eventos corporativos y team building.' },
  { q: '¿Cómo cancelo o reprogramo mi reserva?', a: 'Puedes cancelar sin costo hasta 24 horas antes de tu cita. Después de ese plazo se aplica una penalidad del 50%.' },
];
