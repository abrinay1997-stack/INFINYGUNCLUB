// src/components/BookingForm.jsx
// Usa Netlify Forms — no requiere backend
import { useState } from 'react';

const STEPS = {
  es: ['Tus datos', 'Fecha y hora', 'Experiencia'],
  en: ['Your info', 'Date & time', 'Experience'],
};

export default function BookingForm({ lang = 'es' }) {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const steps = STEPS[lang];

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="font-display text-3xl text-primary mb-2">
          {lang === 'en' ? 'BOOKING CONFIRMED!' : '¡RESERVA CONFIRMADA!'}
        </h3>
        <p className="text-muted">
          {lang === 'en'
            ? 'We will contact you shortly to confirm your experience.'
            : 'Nos pondremos en contacto contigo pronto para confirmar tu experiencia.'}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="flex gap-2 mb-8">
        {steps.map((label, i) => (
          <div key={i} className="flex-1">
            <div className={`h-1 rounded mb-2 transition-colors ${i <= step ? 'bg-primary' : 'bg-surface'}`}></div>
            <span className={`text-xs uppercase tracking-wider ${i === step ? 'text-primary font-bold' : 'text-muted'}`}>
              {label}
            </span>
          </div>
        ))}
      </div>

      <form
        name="booking"
        method="POST"
        data-netlify="true"
        onSubmit={(e) => {
          if (step < steps.length - 1) {
            e.preventDefault();
            setStep(step + 1);
          } else {
            setSubmitted(true);
          }
        }}
        className="space-y-4"
      >
        <input type="hidden" name="form-name" value="booking" />

        {/* Step 1: Datos personales */}
        {step === 0 && (
          <>
            <input type="text" name="name" required placeholder={lang === 'en' ? 'Full Name' : 'Nombre Completo'}
              className="w-full bg-surface border border-primary/20 text-white placeholder-muted px-4 py-3 focus:outline-none focus:border-primary" />
            <input type="email" name="email" required placeholder="Email"
              className="w-full bg-surface border border-primary/20 text-white placeholder-muted px-4 py-3 focus:outline-none focus:border-primary" />
            <input type="tel" name="phone" placeholder={lang === 'en' ? '+1 (507) 000-0000' : '+507 6000-0000'}
              className="w-full bg-surface border border-primary/20 text-white placeholder-muted px-4 py-3 focus:outline-none focus:border-primary" />
          </>
        )}

        {/* Step 2: Fecha y hora */}
        {step === 1 && (
          <>
            <input type="date" name="date" required
              className="w-full bg-surface border border-primary/20 text-white px-4 py-3 focus:outline-none focus:border-primary" />
            <select name="time" required
              className="w-full bg-surface border border-primary/20 text-white px-4 py-3 focus:outline-none focus:border-primary">
              <option value="">{lang === 'en' ? 'Select time' : 'Selecciona hora'}</option>
              {['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'].map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <input type="number" name="people" min="1" max="100" required
              placeholder={lang === 'en' ? 'Number of people' : 'Número de personas'}
              className="w-full bg-surface border border-primary/20 text-white placeholder-muted px-4 py-3 focus:outline-none focus:border-primary" />
          </>
        )}

        {/* Step 3: Experiencia */}
        {step === 2 && (
          <>
            <select name="experience" required
              className="w-full bg-surface border border-primary/20 text-white px-4 py-3 focus:outline-none focus:border-primary">
              <option value="">{lang === 'en' ? 'Select experience' : 'Selecciona experiencia'}</option>
              <option value="civil">{lang === 'en' ? 'Civilian Experience' : 'Experiencia Civil'}</option>
              <option value="corporate">{lang === 'en' ? 'Corporate / Team Building' : 'Corporativo / Team Building'}</option>
              <option value="government">{lang === 'en' ? 'Government / Tactical' : 'Gobierno / Táctico'}</option>
            </select>
            <textarea name="notes" rows={3}
              placeholder={lang === 'en' ? 'Additional notes (optional)' : 'Notas adicionales (opcional)'}
              className="w-full bg-surface border border-primary/20 text-white placeholder-muted px-4 py-3 focus:outline-none focus:border-primary resize-none" />
          </>
        )}

        <div className="flex gap-3 pt-2">
          {step > 0 && (
            <button type="button" onClick={() => setStep(step - 1)}
              className="btn-outline flex-1">
              {lang === 'en' ? '← Back' : '← Volver'}
            </button>
          )}
          <button type="submit" className="btn-primary flex-1">
            {step < steps.length - 1
              ? (lang === 'en' ? 'NEXT →' : 'SIGUIENTE →')
              : (lang === 'en' ? 'CONFIRM BOOKING' : 'CONFIRMAR RESERVA')}
          </button>
        </div>
      </form>
    </div>
  );
}
