// src/data/en/home.ts
export const hero = {
  tag: "PANAMA'S LARGEST SHOOTING RANGE",
  headline: 'PROFESSIONAL\nSHOOTING EXPERIENCE',
  subheadline: 'Safe · Certified · For All Levels',
  ctaPrimary: { label: 'BOOK NOW', href: '/en/booking' },
  ctaSecondary: { label: 'VIEW SERVICES', href: '/en/#services' },
};

export const valueProps = [
  { icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`, title: 'Total Safety', desc: 'Certified protocols on every session' },
  { icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`, title: 'Real Adrenaline', desc: '+15 weapon models available' },
  { icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`, title: 'Pro Instructors', desc: 'Certified and highly experienced' },
];

export const howItWorks = {
  title: 'HOW IT WORKS',
  steps: [
    { num: '1', label: 'Choose', desc: 'Select your experience' },
    { num: '2', label: 'Book', desc: 'Pick date and time' },
    { num: '3', label: 'Pay', desc: 'Secure online payment' },
    { num: '4', label: 'Live It!', desc: 'Enjoy the experience' },
  ],
};

export const socialProof = {
  rating: '4.8',
  reviewCount: '245',
  reviewPlatform: 'Google',
  tagline: '+500 completed experiences',
};

export const faq = [
  { q: 'What is the minimum age to shoot?', a: 'Minimum age is 18 years. Minors may participate in some activities with written parental consent.' },
  { q: 'Do I need prior experience?', a: 'No. We have certified instructors for beginners. All packages include a safety briefing.' },
  { q: 'What should I bring?', a: 'Just comfortable clothes and closed-toe shoes. We provide firearms, ammunition, glasses, and hearing protection.' },
  { q: 'Can I bring my own gear?', a: 'Yes, after a safety inspection. Contact us for details.' },
  { q: 'Do you have group packages?', a: 'Yes. We serve groups from 5 to 100+ people for corporate events and team building.' },
  { q: 'How do I cancel or reschedule?', a: 'You can cancel at no cost up to 24 hours before your appointment. After that, a 50% penalty applies.' },
];
