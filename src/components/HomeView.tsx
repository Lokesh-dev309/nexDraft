/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, ChangeEvent, FormEvent } from 'react';
import { SERVICES, RECENT_PROJECTS, TESTIMONIALS, FAQS, HERO_BACKGROUND } from '../data';
import { ActivePage, ContactFormInput } from '../types';

interface HomeViewProps {
  setActivePage: (page: ActivePage) => void;
  onSubmitInquiry: (form: ContactFormInput) => void;
}

export default function HomeView({ setActivePage, onSubmitInquiry }: HomeViewProps) {
  // Testimonials Slider State
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // FAQ Accordion State (index of open FAQ or null)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Form State
  const [formData, setFormData] = useState<ContactFormInput>({
    name: '',
    email: '',
    service: 'Steel Building Design',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      alert('Please fill out all required fields.');
      return;
    }
    onSubmitInquiry(formData);
    setFormSubmitted(true);
    setFormData({
      name: '',
      email: '',
      service: 'Steel Building Design',
      message: '',
    });
  };

  return (
    <div className="animate-fade-in pb-12">
      {/* 1. Hero Section */}
      <section className="relative min-h-[795px] flex items-center px-6 md:px-12 py-20 overflow-hidden">
        {/* Background image & gradient */}
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_BACKGROUND}
            alt="Structural steel skyscraper construction"
            className="w-full h-full object-cover brightness-100"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-2xl space-y-8 animate-fade-in pt-12">
          <div className="inline-block px-4 py-1.5 bg-primary-container border border-outline-variant/50 rounded-full">
            <span className="font-mono text-xs text-primary font-semibold uppercase tracking-widest">
              Engineering Excellence
            </span>
          </div>
          
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Professional Steel Building Design &amp; Engineering Services
          </h2>
          
          <p className="font-sans text-lg text-slate-200 max-w-lg leading-relaxed">
            Tekla Structures, STAAD.Pro, AutoCAD, SolidWorks, Interior Design &amp; Furniture Design Solutions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={() => {
                const element = document.getElementById('start-project-form');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-construction-orange hover:bg-orange-600 text-white py-4 px-8 rounded-lg font-bold transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-construction-orange/20 text-center uppercase tracking-wider text-sm cursor-pointer"
              id="hero-consult-btn"
            >
              Get Free Consultation
            </button>
            <button
              onClick={() => setActivePage('contact')}
              className="border border-outline text-on-surface hover:bg-surface-container-high/60 py-4 px-8 rounded-lg font-bold transition-all duration-300 transform hover:scale-[1.02] active:scale-95 text-center uppercase tracking-wider text-sm cursor-pointer"
              id="hero-quote-btn"
            >
              Request a Quote
            </button>
          </div>
        </div>

        {/* CAD Blueprint Grid Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.0511]" style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
      </section>

      {/* 2. Company Overview */}
      <section className="px-6 md:px-12 py-24 bg-surface-container-lowest border-y border-outline-variant/35">
        <div className="max-w-4xl mx-auto space-y-6">
          <h3 className="font-mono text-sm text-construction-orange uppercase tracking-widest font-semibold">
            Our Vision
          </h3>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-on-surface leading-tight tracking-tight">
            Precision in every detail, integrity in every structure.
          </h2>
          <p className="font-sans text-base md:text-lg text-on-surface-variant leading-relaxed pt-2">
            NexDraft Engineering Services stands at the intersection of technical mastery and innovative design. We specialize in providing end-to-end structural solutions that transform complex architectural concepts into tangible, sustainable realities. Our team leverages industry-leading software to ensure every bolt, beam, and blueprint exceeds global safety and quality standards.
          </p>
        </div>
      </section>

      {/* 3. Specialized Services Grid */}
      <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto space-y-12">
        <div className="space-y-3">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-on-surface">
            Specialized Services
          </h2>
          <p className="font-sans text-base text-on-surface-variant">
            Comprehensive engineering and design expertise. Click any service card to view deep-dive technical capabilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((srv) => (
            <div
              key={srv.id}
              onClick={() => setActivePage(srv.id === 'steel' ? 'services' : 'projects')}
              className="glass-panel p-8 rounded-xl space-y-6 hover:border-primary/55 cursor-pointer transition-all duration-300 group hover:translate-y-[-4px]"
            >
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 bg-primary-container rounded-lg flex items-center justify-center border border-outline-variant group-hover:bg-construction-orange/10 group-hover:border-construction-orange/40 transition-colors">
                  <span className="material-symbols-outlined text-primary text-3xl group-hover:text-construction-orange transition-colors">
                    {srv.icon}
                  </span>
                </div>
                <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors text-sm font-bold opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                  arrow_forward
                </span>
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-xl font-bold text-on-surface group-hover:text-primary transition-colors">
                  {srv.title}
                </h3>
                <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed">
                  {srv.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Why Choose Us (Engineered for Success) */}
      <section className="px-6 md:px-12 py-24 bg-primary-container/20 border-y border-outline-variant/30">
        <div className="max-w-4xl mx-auto space-y-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-on-surface text-center">
            Engineered for Success
          </h2>
          
          <div className="space-y-10">
            {/* Expertise */}
            <div className="flex gap-5 items-start">
              <div className="mt-1 flex-shrink-0 w-10 h-10 rounded-full bg-construction-orange/15 border border-construction-orange/40 flex items-center justify-center text-construction-orange shadow-md shadow-construction-orange/5">
                <span className="material-symbols-outlined text-xl">verified</span>
              </div>
              <div className="space-y-1">
                <h4 className="font-display text-lg font-bold text-on-surface">Expertise</h4>
                <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed">
                  Decades of combined experience in global structural standards and software mastery.
                </p>
              </div>
            </div>

            {/* Precision */}
            <div className="flex gap-5 items-start">
              <div className="mt-1 flex-shrink-0 w-10 h-10 rounded-full bg-construction-orange/15 border border-construction-orange/40 flex items-center justify-center text-construction-orange shadow-md shadow-construction-orange/5">
                <span className="material-symbols-outlined text-xl">biotech</span>
              </div>
              <div className="space-y-1">
                <h4 className="font-display text-lg font-bold text-on-surface">Precision</h4>
                <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed">
                  Zero-tolerance for error with multi-stage verification processes for every project.
                </p>
              </div>
            </div>

            {/* Speed */}
            <div className="flex gap-5 items-start">
              <div className="mt-1 flex-shrink-0 w-10 h-10 rounded-full bg-construction-orange/15 border border-construction-orange/40 flex items-center justify-center text-construction-orange shadow-md shadow-construction-orange/5">
                <span className="material-symbols-outlined text-xl">bolt</span>
              </div>
              <div className="space-y-1">
                <h4 className="font-display text-lg font-bold text-on-surface">Speed</h4>
                <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed">
                  Rapid turnaround cycles without compromising on structural integrity or detail.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Project Showcase (Horizontal Scroll) */}
      <section className="py-24 px-6 md:px-12 bg-surface-container-lowest/60">
        <div className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-on-surface">
              Recent Projects
            </h2>
            <p className="font-sans text-base text-on-surface-variant">
              A glimpse into our technical portfolio.
            </p>
          </div>
          <button
            onClick={() => {
              setActivePage('projects');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-wider hover:text-on-surface transition-colors duration-200 cursor-pointer self-start md:self-auto"
          >
            <span>Explore Full Portfolio</span>
            <span className="material-symbols-outlined text-xs">arrow_forward</span>
          </button>
        </div>

        {/* Horizontal scroll section */}
        <div className="max-w-7xl mx-auto flex overflow-x-auto gap-6 pb-6 no-scrollbar snap-x scroll-smooth">
          {RECENT_PROJECTS.map((proj) => (
            <div
              key={proj.id}
              className="flex-shrink-0 w-80 snap-center bg-surface-container-low border border-outline-variant/60 rounded-xl overflow-hidden group hover:border-primary/50 transition-all duration-300"
            >
              <div className="relative aspect-square overflow-hidden bg-surface-container-lowest">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/95 via-background/40 to-transparent pt-10">
                  <span className="font-mono text-xs text-construction-orange font-bold uppercase tracking-widest">
                    {proj.category}
                  </span>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-1">
                  <h4 className="font-display text-lg font-bold text-on-surface">
                    {proj.title}
                  </h4>
                  <p className="font-sans text-sm text-on-surface-variant">
                    {proj.description}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setActivePage('projects');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full py-2.5 rounded border border-outline-variant/60 text-center font-mono text-[11px] uppercase tracking-wider hover:border-primary hover:bg-surface-container transition-all"
                >
                  View Blueprint
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Testimonials */}
      <section className="px-6 md:px-12 py-24 bg-surface-container border-y border-outline-variant/30">
        <div className="max-w-2xl mx-auto relative px-4">
          <span className="material-symbols-outlined text-construction-orange/15 text-[140px] absolute -top-16 -left-12 pointer-events-none select-none">
            format_quote
          </span>
          
          <div className="space-y-8 relative z-10">
            <div className="min-h-[140px] flex items-center">
              <p className="font-sans text-xl md:text-2xl text-on-surface italic leading-relaxed font-light">
                "{TESTIMONIALS[activeTestimonial].quote}"
              </p>
            </div>
            
            <div>
              <p className="font-display text-base font-bold text-on-surface">
                {TESTIMONIALS[activeTestimonial].author}
              </p>
              <p className="font-mono text-xs text-on-surface-variant uppercase tracking-wider mt-0.5">
                {TESTIMONIALS[activeTestimonial].role}
              </p>
            </div>

            {/* Testimonials Navigation Indicators */}
            <div className="flex gap-2 pt-4">
              {TESTIMONIALS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeTestimonial === index ? 'w-8 bg-construction-orange' : 'w-3 bg-outline hover:bg-on-surface-variant'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ Accordion */}
      <section className="px-6 md:px-12 py-24 max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-on-surface">
            Common Questions
          </h2>
          <p className="font-sans text-sm md:text-base text-on-surface-variant">
            Technical answers regarding software capabilities and turnaround processes.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="border border-outline-variant rounded-lg overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 flex items-center justify-between bg-surface-container-high/80 hover:bg-surface-container transition-colors text-left cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-base md:text-lg font-bold text-on-surface">
                    {faq.question}
                  </span>
                  <span className={`material-symbols-outlined text-primary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-40 border-t border-outline-variant/30 opacity-100 py-5' : 'max-h-0 opacity-0 overflow-hidden'
                  } px-6 bg-surface text-on-surface-variant font-sans text-sm md:text-base leading-relaxed`}
                >
                  {faq.answer}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. Contact Form */}
      <section className="px-6 md:px-12 py-24 bg-surface-container-lowest border-t border-outline-variant/30" id="start-project-form">
        <div className="max-w-xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-on-surface">
              Start Your Project
            </h2>
            <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed">
              Send us your initial specifications and structural requirements for a custom proposal within 24 hours.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block font-mono text-xs uppercase tracking-widest text-on-surface-variant font-semibold">
                Full Name <span className="text-construction-orange">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full bg-background border border-outline-variant rounded-lg px-4 py-3.5 focus:ring-1 focus:ring-construction-orange focus:border-construction-orange outline-none transition-all placeholder:text-outline/40 text-on-surface text-base"
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <label className="block font-mono text-xs uppercase tracking-widest text-on-surface-variant font-semibold">
                Work Email <span className="text-construction-orange">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full bg-background border border-outline-variant rounded-lg px-4 py-3.5 focus:ring-1 focus:ring-construction-orange focus:border-construction-orange outline-none transition-all placeholder:text-outline/40 text-on-surface text-base"
                placeholder="john@company.com"
              />
            </div>

            <div className="space-y-2">
              <label className="block font-mono text-xs uppercase tracking-widest text-on-surface-variant font-semibold">
                Service Required
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                className="w-full bg-background border border-outline-variant rounded-lg px-4 py-3.5 focus:ring-1 focus:ring-construction-orange focus:border-construction-orange outline-none transition-all text-on-surface text-base cursor-pointer"
              >
                <option value="Steel Building Design">Steel Building Design</option>
                <option value="CAD & Mechanical Drafting">CAD &amp; Mechanical Drafting</option>
                <option value="Interior Design">Interior Design</option>
                <option value="Furniture Solutions">Furniture Solutions</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block font-mono text-xs uppercase tracking-widest text-on-surface-variant font-semibold">
                Message <span className="text-construction-orange">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                className="w-full bg-background border border-outline-variant rounded-lg px-4 py-3.5 focus:ring-1 focus:ring-construction-orange focus:border-construction-orange outline-none transition-all placeholder:text-outline/40 text-on-surface text-base min-h-[140px] resize-y"
                placeholder="Briefly describe your project needs, loads, or dimension specs..."
                rows={4}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-construction-orange hover:bg-orange-600 text-white py-4 rounded-lg font-bold hover:brightness-110 active:scale-98 transition-all mt-4 uppercase tracking-wider text-sm shadow-md shadow-construction-orange/15 cursor-pointer"
              id="home-submit-btn"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Local Success Overlay Notification (auto dismiss/dismissible) */}
      {formSubmitted && (
        <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex items-center justify-center p-6 animate-fade-in">
          <div className="bg-surface-container-low max-w-md w-full rounded-2xl border border-outline-variant/60 p-8 text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 bg-primary-container rounded-full flex items-center justify-center mx-auto text-primary border border-outline-variant animate-pulse">
              <span className="material-symbols-outlined text-4xl">check_circle</span>
            </div>
            <div className="space-y-2">
              <h3 className="font-display text-2xl font-bold text-on-surface">Consultation Request Sent</h3>
              <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                Thank you! Our engineering team has received your inquiry regarding <strong>{formData.service || 'Steel Building Design'}</strong>. We will review your specs and reach out within 24 business hours.
              </p>
            </div>
            <button
              onClick={() => setFormSubmitted(false)}
              className="w-full py-3 bg-construction-orange text-white rounded-lg font-bold hover:bg-orange-600 transition-colors uppercase tracking-wider text-xs cursor-pointer"
              id="success-dismiss-btn"
            >
              Return to Site
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
