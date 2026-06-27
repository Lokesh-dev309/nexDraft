/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ActivePage, ContactFormInput } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import ServiceView from './components/ServiceView';
import ProjectsView from './components/ProjectsView';
import ContactView from './components/ContactView';

export default function App() {
  // Navigation active tab page state
  const [activePage, setActivePage] = useState<ActivePage>('home');

  // Theme state: light or dark
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const stored = localStorage.getItem('nexdraft_theme');
      if (stored === 'light' || stored === 'dark') return stored;
      // Default to light as requested
      return 'light';
    } catch {
      return 'light';
    }
  });

  // Apply theme to html element
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('nexdraft_theme', theme);
    } catch (e) {
      console.warn('LocalStorage save failed for theme:', e);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Consultation pre-fill state (e.g. from Projects page inquiry)
  const [preFilledDetails, setPreFilledDetails] = useState<string>('');

  // Local storage inquiry submission logger
  const [allInquiries, setAllInquiries] = useState<ContactFormInput[]>([]);

  // Back to top scrolling button visibility
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Load inquiries history on load
  useEffect(() => {
    try {
      const stored = localStorage.getItem('nexdraft_inquiries');
      if (stored) {
        setAllInquiries(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('LocalStorage not available:', e);
    }
  }, []);

  // Monitor scroll for header adjustments and back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Form submit handler
  const handleInquirySubmit = async (form: ContactFormInput) => {
    const updated = [...allInquiries, form];
    setAllInquiries(updated);
    try {
      localStorage.setItem('nexdraft_inquiries', JSON.stringify(updated));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company,
          service: form.service,
          tonnage: form.tonnage,
          message: form.message,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned error status ${response.status}`);
      }
      const data = await response.json();
      console.log('Inquiry submitted to backend successfully:', data);
    } catch (err) {
      console.error('Failed to submit inquiry to backend API:', err);
    }
  };

  // Helper setter to handle prefill transitions
  const handleSetContactPreFill = (text: string) => {
    setPreFilledDetails(text);
  };

  // Clear prefilled details when leaving contact page
  useEffect(() => {
    if (activePage !== 'contact') {
      setPreFilledDetails('');
    }
  }, [activePage]);

  // Back to Top execution
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-on-background font-sans flex flex-col selection:bg-construction-orange/30 selection:text-white">
      {/* Sticky Main Navigation */}
      <Header activePage={activePage} setActivePage={setActivePage} theme={theme} toggleTheme={toggleTheme} />

      {/* Main Content Area */}
      <main className="pt-20 flex-grow">
        {activePage === 'home' && (
          <HomeView
            setActivePage={setActivePage}
            onSubmitInquiry={handleInquirySubmit}
          />
        )}

        {activePage === 'services' && (
          <ServiceView
            onSubmitInquiry={handleInquirySubmit}
          />
        )}

        {activePage === 'projects' && (
          <ProjectsView
            setActivePage={setActivePage}
            setContactPreFill={handleSetContactPreFill}
          />
        )}

        {activePage === 'contact' && (
          <ContactView
            preFilledDetails={preFilledDetails}
            onSubmitInquiry={handleInquirySubmit}
          />
        )}
      </main>

      {/* Persistent General Footer */}
      <Footer setActivePage={setActivePage} />

      {/* Persistent Floating WhatsApp Floating Widget (Image 3) */}
      <div className="fixed bottom-24 md:bottom-8 right-6 z-40 group flex items-center">
        {/* Hover Tooltip Label */}
        <span className="bg-background/95 text-white text-xs font-mono px-3 py-1.5 rounded border border-outline-variant mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-xl">
          Chat with an Engineer
        </span>
        
        <a
          href="https://wa.me/14155550128"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact lead structural engineer on WhatsApp"
          className="w-14 h-14 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(37,211,102,0.35)] active:scale-95 hover:scale-105 transition-all duration-300"
          id="whatsapp-float-widget"
        >
          <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-4.821 4.754a8.117 8.117 0 01-3.882-1.034l-.278-.164-2.885.756.77-2.812-.18-.287a8.117 8.117 0 01-1.241-4.393c0-4.487 3.65-8.137 8.137-8.137 2.176 0 4.22.846 5.758 2.384a8.102 8.102 0 012.384 5.753c0 4.488-3.65 8.137-8.137 8.137m9.708-15.464C20.47 1.805 18.06 1 15.488 1a10.457 10.457 0 00-10.45 10.45c0 1.83.479 3.618 1.388 5.207L5 23l6.47-1.697a10.43 10.43 0 005.013 1.284h.004c5.761 0 10.451-4.69 10.451-10.45 0-2.79-1.086-5.413-3.056-7.382z" />
          </svg>
        </a>
      </div>

      {/* Back to top scroll button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 md:bottom-28 right-6 z-40 bg-surface-container-high border border-outline-variant text-primary hover:text-on-surface p-3 rounded-full hover:border-primary active:scale-90 transition-all shadow-xl flex items-center justify-center cursor-pointer"
          aria-label="Scroll Back to Top"
          id="scroll-top-widget"
        >
          <span className="material-symbols-outlined text-sm font-bold">arrow_upward</span>
        </button>
      )}

      {/* Bottom Navigation for Mobile (Image 1, Image 2, Image 3) */}
      <nav
        aria-label="Mobile Bottom App Navigation Bar"
        className="md:hidden fixed bottom-0 left-0 right-0 w-full bg-surface-container-low/95 border-t border-outline-variant z-50 flex items-center justify-around py-2.5 px-4 backdrop-blur-md shadow-2xl"
      >
        <button
          onClick={() => {
            setActivePage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${
            activePage === 'home' ? 'text-primary font-bold' : 'text-on-surface-variant'
          }`}
        >
          <span className="material-symbols-outlined text-2xl">home</span>
          <span className="font-mono text-[9px] uppercase tracking-wider">Home</span>
        </button>

        <button
          onClick={() => {
            setActivePage('services');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${
            activePage === 'services' ? 'text-primary font-bold' : 'text-on-surface-variant'
          }`}
        >
          <span className="material-symbols-outlined text-2xl">grid_view</span>
          <span className="font-mono text-[9px] uppercase tracking-wider">Services</span>
        </button>

        <button
          onClick={() => {
            setActivePage('projects');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${
            activePage === 'projects' ? 'text-primary font-bold' : 'text-on-surface-variant'
          }`}
        >
          <span className="material-symbols-outlined text-2xl">folder_special</span>
          <span className="font-mono text-[9px] uppercase tracking-wider">Projects</span>
        </button>

        <button
          onClick={() => {
            setActivePage('contact');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${
            activePage === 'contact' ? 'text-primary font-bold' : 'text-on-surface-variant'
          }`}
        >
          <span className="material-symbols-outlined text-2xl">mail</span>
          <span className="font-mono text-[9px] uppercase tracking-wider">Contact</span>
        </button>
      </nav>
    </div>
  );
}
