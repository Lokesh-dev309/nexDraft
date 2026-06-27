/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ActivePage } from '../types';

interface HeaderProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export default function Header({ activePage, setActivePage, theme, toggleTheme }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: { label: string; value: ActivePage }[] = [
    { label: 'Home', value: 'home' },
    { label: 'Services', value: 'services' },
    { label: 'Portfolio', value: 'projects' },
    { label: 'Contact', value: 'contact' },
  ];

  const handleNavClick = (page: ActivePage) => {
    setActivePage(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-outline-variant transition-all duration-200">
      <div className="flex items-center justify-between px-6 py-4 w-full mx-auto max-w-7xl">
        {/* Logo and Menu toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-primary hover:text-on-surface transition-colors p-1"
            aria-label="Toggle Navigation Menu"
            id="nav-menu-btn"
          >
            <span className="material-symbols-outlined text-2xl">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
          
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 text-left hover:opacity-90 transition-opacity"
            id="brand-logo-btn"
          >
            <img
              src="/logo23.png"
              alt="NexDraft Logo"
              className="w-12 h-12 object-contain"
             />
            <h1 className="font-display text-2xl font-bold tracking-tight text-on-surface">
              NexDraft
            </h1>
          </button>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Desktop Main Navigation">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => handleNavClick(item.value)}
              className={`font-sans text-sm font-medium tracking-wide transition-all hover:text-on-surface cursor-pointer relative py-1 ${
                activePage === item.value ? 'text-primary font-semibold' : 'text-on-surface-variant'
              }`}
            >
              {item.label}
              {activePage === item.value && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-construction-orange rounded-full animate-pulse" />
              )}
            </button>
          ))}
        </nav>

        {/* Action Controls: Theme Toggle & Contact Button */}
        <div className="flex items-center gap-3 md:gap-4">
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center p-2 rounded-full border border-outline-variant hover:bg-surface-container-high hover:border-outline text-on-surface-variant hover:text-on-surface transition-all duration-300 active:scale-90 cursor-pointer"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} Mode`}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            id="theme-toggle-btn"
          >
            <span className="material-symbols-outlined text-xl">
              {theme === 'light' ? 'dark_mode' : 'light_mode'}
            </span>
          </button>

          <button
            onClick={() => handleNavClick('contact')}
            className={`font-mono text-xs tracking-wider px-5 py-2.5 border rounded uppercase font-semibold transition-all duration-300 hover:scale-[1.03] active:scale-95 ${
              activePage === 'contact'
                ? 'bg-construction-orange text-white border-construction-orange shadow-lg shadow-construction-orange/20'
                : 'border-outline text-primary hover:bg-surface-container-high hover:border-primary'
            }`}
            id="header-contact-btn"
          >
            Contact
          </button>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-[65px] left-0 right-0 bg-surface-container-low border-b border-outline-variant shadow-xl z-40 animate-fade-in">
          <nav className="flex flex-col p-4 space-y-2" aria-label="Mobile Navigation Drawer">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => handleNavClick(item.value)}
                className={`flex items-center justify-between px-4 py-3 rounded-lg font-sans text-base text-left transition-all ${
                  activePage === item.value
                    ? 'bg-primary-container text-primary font-semibold border-l-4 border-construction-orange'
                    : 'text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                <span>{item.label}</span>
                <span className="material-symbols-outlined text-xs">
                  chevron_right
                </span>
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
