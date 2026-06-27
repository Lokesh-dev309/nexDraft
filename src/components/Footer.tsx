/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ActivePage } from '../types';

interface FooterProps {
  setActivePage: (page: ActivePage) => void;
}

export default function Footer({ setActivePage }: FooterProps) {
  const [dbStatus, setDbStatus] = useState({ connected: false, configured: false });

  useEffect(() => {
    fetch('/api/db-status')
      .then((res) => res.json())
      .then((data) => setDbStatus(data))
      .catch((err) => console.warn('Failed to fetch DB status:', err));
  }, []);

  const handleNavClick = (page: ActivePage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant py-16 px-6 relative overflow-hidden">
      {/* Decorative Blueprint Background element */}
      <div className="absolute right-0 bottom-0 opacity-[0.03] pointer-events-none select-none">
        <span className="material-symbols-outlined text-[320px]">
          architecture
        </span>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        {/* About column */}
        <div className="space-y-4">
          <button
            onClick={() => handleNavClick('home')}
            className="font-display text-2xl font-bold tracking-tight text-on-surface hover:opacity-85 text-left"
            id="footer-logo-btn"
          >
            NexDraft
          </button>
          <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
            Engineering precision with a modern architectural perspective. Delivering global standards in structural design, CAD modeling, and interior space optimization.
          </p>
          <div className="flex gap-4 pt-2">
            <button className="text-on-surface-variant hover:text-primary transition-colors p-1" aria-label="Share">
              <span className="material-symbols-outlined text-lg">share</span>
            </button>
            <button className="text-on-surface-variant hover:text-primary transition-colors p-1" aria-label="Web Website">
              <span className="material-symbols-outlined text-lg">public</span>
            </button>
            <button className="text-on-surface-variant hover:text-primary transition-colors p-1" aria-label="Verified Security">
              <span className="material-symbols-outlined text-lg">verified_user</span>
            </button>
          </div>
        </div>

        {/* Services column */}
        <div className="space-y-4">
          <h3 className="font-mono text-xs font-semibold text-primary uppercase tracking-widest border-b border-outline-variant/30 pb-2">
            Services
          </h3>
          <ul className="space-y-3 font-sans text-sm text-on-surface-variant">
            <li>
              <button
                onClick={() => handleNavClick('services')}
                className="hover:text-tertiary transition-colors hover:translate-x-1 duration-200 text-left cursor-pointer"
              >
                Structural Steel Design
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('projects')}
                className="hover:text-tertiary transition-colors hover:translate-x-1 duration-200 text-left cursor-pointer"
              >
                CAD Services & Modeling
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('projects')}
                className="hover:text-tertiary transition-colors hover:translate-x-1 duration-200 text-left cursor-pointer"
              >
                Interior Architecture
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('projects')}
                className="hover:text-tertiary transition-colors hover:translate-x-1 duration-200 text-left cursor-pointer"
              >
                Furniture Solutions
              </button>
            </li>
          </ul>
        </div>

        {/* Company Column */}
        <div className="space-y-4">
          <h3 className="font-mono text-xs font-semibold text-primary uppercase tracking-widest border-b border-outline-variant/30 pb-2">
            Company
          </h3>
          <ul className="space-y-3 font-sans text-sm text-on-surface-variant">
            <li>
              <button
                onClick={() => handleNavClick('home')}
                className="hover:text-tertiary transition-colors hover:translate-x-1 duration-200 text-left cursor-pointer"
              >
                About Us
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('projects')}
                className="hover:text-tertiary transition-colors hover:translate-x-1 duration-200 text-left cursor-pointer"
              >
                Our Projects
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('contact')}
                className="hover:text-tertiary transition-colors hover:translate-x-1 duration-200 text-left cursor-pointer"
              >
                Contact Us
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('home')}
                className="hover:text-tertiary transition-colors hover:translate-x-1 duration-200 text-left cursor-pointer"
              >
                Terms & Conditions
              </button>
            </li>
          </ul>
        </div>

        {/* Technical spec card */}
        <div className="space-y-4 p-5 bg-surface-container rounded-lg border border-outline-variant/40">
          <div className="flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined text-sm">precision_manufacturing</span>
            <span className="font-mono text-xs uppercase tracking-wider font-bold">Workspace System</span>
          </div>
          <div className="font-mono text-xs space-y-1.5 text-on-surface-variant/80">
            <div>DATABASE: {dbStatus.connected ? '⚡ MongoDB Active' : dbStatus.configured ? '⚠️ Connection Error' : 'In-Memory (Local)'}</div>
            <div>VERSION: 2.14.0_LOD</div>
            <div>COMPLIANCE: AISC, Eurocode</div>
            <div>PRECISION: ±0.01mm</div>
          </div>
        </div>
      </div>

      {/* Copyright row */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-outline-variant/40 text-center">
        <p className="font-mono text-[11px] text-on-surface-variant/70 leading-relaxed uppercase tracking-widest">
          © 2026 NexDraft Engineering Services. Precision in Every Detail. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
