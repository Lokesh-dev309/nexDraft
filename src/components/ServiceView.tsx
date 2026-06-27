/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, ChangeEvent, FormEvent } from 'react';
import { CORE_EXPERTISE, WORKFLOW_PHASES, SERVICE_SHOWCASES, STEEL_BLUEPRINT_IMAGE } from '../data';
import { ContactFormInput } from '../types';

interface ServiceViewProps {
  onSubmitInquiry: (form: ContactFormInput) => void;
}

export default function ServiceView({ onSubmitInquiry }: ServiceViewProps) {
  // Form state
  const [formData, setFormData] = useState<ContactFormInput>({
    name: '',
    email: '',
    service: 'Steel Building Design',
    tonnage: '',
    message: '',
  });
  const [projectType, setProjectType] = useState('Warehousing');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Estimator States for the interactive tonnage calculator tool
  const [length, setLength] = useState(40); // meters
  const [width, setWidth] = useState(25); // meters
  const [height, setHeight] = useState(8); // meters
  const [complexity, setComplexity] = useState('Medium'); // Low, Medium, High

  // Tonnage Estimator Logic (empirical model for structural steel)
  // Base steel density for building frame is roughly 35kg to 85kg per square meter depending on complexity
  const calculateEstimatedTonnage = () => {
    const area = length * width;
    let baseKgPerSqm = 45; // default Medium
    if (complexity === 'Low') baseKgPerSqm = 30;
    if (complexity === 'High') baseKgPerSqm = 75;

    // Height correction factor (taller building requires beefier columns)
    const heightFactor = 1 + (height - 6) * 0.05;

    const estimatedKg = area * baseKgPerSqm * heightFactor;
    return Math.round(estimatedKg / 1000); // return in Metric Tons (MT)
  };

  const handleApplyTonnage = () => {
    const calculated = calculateEstimatedTonnage();
    setFormData((prev) => ({ ...prev, tonnage: calculated.toString() }));
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
    onSubmitInquiry({
      ...formData,
      service: `Steel Building Design - ${projectType}`,
    });
    setFormSubmitted(true);
    setFormData({
      name: '',
      email: '',
      service: 'Steel Building Design',
      tonnage: '',
      message: '',
    });
  };

  return (
    <div className="animate-fade-in pb-12">
      {/* 1. Service Hero */}
      <section className="relative px-6 md:px-12 py-16 overflow-hidden">
        {/* Technical Blueprint Grid Background */}
        <div className="absolute inset-0 technical-grid -z-10"></div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary-container">
              <span className="material-symbols-outlined text-primary text-sm">architecture</span>
              <span className="font-mono text-[10px] text-primary uppercase tracking-widest font-semibold">
                Industrial Excellence
              </span>
            </div>
            
            <h2 className="font-display text-4xl md:text-5xl font-bold text-on-surface tracking-tight leading-tight">
              Steel Building Design
            </h2>
            
            <p className="font-sans text-base md:text-lg text-on-surface-variant leading-relaxed">
              Precision engineering meets high-fidelity structural modeling. We deliver comprehensive steel design solutions for industrial, agricultural, and commercial sectors globally.
            </p>

            <div className="flex gap-4 pt-2">
              <div className="border-l-2 border-construction-orange pl-4">
                <span className="font-mono text-xs text-on-surface-variant block">COMPLIANCE</span>
                <span className="font-display text-sm font-bold text-on-surface block">AISC / Eurocodes</span>
              </div>
              <div className="border-l-2 border-construction-orange pl-4">
                <span className="font-mono text-xs text-on-surface-variant block">LOD STANDARD</span>
                <span className="font-display text-sm font-bold text-on-surface block">LOD 400 Detail</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 relative">
            <div className="relative rounded-xl overflow-hidden border border-outline-variant/70 shadow-2xl blueprint-glow bg-surface-container-lowest">
              <img
                className="w-full aspect-video object-cover brightness-90 hover:scale-102 transition-transform duration-500"
                src={STEEL_BLUEPRINT_IMAGE}
                alt="Detailed 3D Tekla structural steel modeling detailing connections"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-transparent to-transparent"></div>
              
              {/* Overlay engineering specs label */}
              <div className="absolute bottom-4 left-4 font-mono text-[10px] bg-background/80 backdrop-blur border border-outline-variant/60 px-3 py-1.5 rounded text-on-surface-variant/90 space-y-0.5">
                <div>TEKLA STRUCTURES / MODEL_ID: 9812-C</div>
                <div>NODAL CONNECTIONS: BOLTED & WELLED H-SECTIONS</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Core Expertise Grid */}
      <section className="px-6 md:px-12 py-24 bg-surface-container-low border-y border-outline-variant/30">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col gap-2">
            <h3 className="font-mono text-xs text-primary tracking-[0.2em] uppercase font-bold">
              Core Expertise
            </h3>
            <p className="font-sans text-sm text-on-surface-variant">
              Comprehensive modeling and stress analysis following strict engineering codes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {CORE_EXPERTISE.map((exp, index) => (
              <div
                key={index}
                className="p-6 bg-surface-container-high border-l-2 border-primary rounded-r-lg flex flex-col justify-between space-y-4 hover:bg-surface-container-highest/85 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded bg-primary-container flex items-center justify-center text-primary border border-outline-variant group-hover:bg-primary group-hover:text-on-primary transition-all">
                    <span className="material-symbols-outlined text-lg">{exp.icon}</span>
                  </div>
                  <h4 className="font-display text-base font-bold text-on-surface leading-tight group-hover:text-primary transition-colors">
                    {exp.title}
                  </h4>
                </div>
                <p className="font-sans text-on-surface-variant text-xs md:text-sm leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Process Workflow Phase Timeline */}
      <section className="px-6 md:px-12 py-24 max-w-4xl mx-auto space-y-12">
        <div className="space-y-1.5">
          <h3 className="font-mono text-xs text-primary tracking-[0.2em] uppercase font-bold">
            Workflow Phase
          </h3>
          <p className="font-sans text-sm text-on-surface-variant">
            From physical load calculations to detailed workshop shop drawings.
          </p>
        </div>

        <div className="relative space-y-12 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1px] before:bg-outline-variant/60">
          {WORKFLOW_PHASES.map((wf, idx) => {
            const isFirst = idx === 0;
            return (
              <div key={idx} className="relative pl-10 group">
                {/* Timeline connector circle node */}
                <div
                  className={`absolute left-0 top-1 w-6 h-6 rounded-full bg-background border-2 flex items-center justify-center z-10 transition-colors ${
                    isFirst ? 'border-primary' : 'border-outline group-hover:border-primary'
                  }`}
                >
                  {isFirst && <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>}
                </div>
                
                <span className={`font-mono text-xs ${isFirst ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>
                  {wf.phase}
                </span>
                
                <h4 className="font-display text-lg font-bold text-on-surface mt-1 group-hover:text-primary transition-colors">
                  {wf.title}
                </h4>
                
                <p className="font-sans text-on-surface-variant text-sm mt-2 leading-relaxed max-w-2xl">
                  {wf.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Horizontal Gallery / Project Showcases */}
      <section className="py-24 bg-surface-container-lowest border-y border-outline-variant/30">
        <div className="px-6 md:px-12 max-w-7xl mx-auto mb-10">
          <h3 className="font-mono text-xs text-primary tracking-[0.2em] uppercase font-bold mb-1">
            Project Showcase
          </h3>
          <p className="font-sans text-sm text-on-surface-variant">
            Recently designed and fabricated structural buildings.
          </p>
        </div>

        <div className="flex overflow-x-auto gap-6 px-6 md:px-12 max-w-7xl mx-auto no-scrollbar snap-x scroll-smooth pb-4">
          {SERVICE_SHOWCASES.map((show) => (
            <div
              key={show.id}
              className="min-w-[280px] md:min-w-[340px] snap-center bg-surface-container rounded-xl overflow-hidden border border-outline-variant/50 relative group"
            >
              <div className="aspect-[4/5] relative overflow-hidden bg-surface-container-lowest">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={show.image}
                  alt={show.title}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent pt-40"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2">
                  <span className="font-mono text-xs text-primary uppercase tracking-wider font-semibold">
                    {show.category}
                  </span>
                  <h4 className="font-display text-lg font-bold text-white">
                    {show.title}
                  </h4>
                  <p className="font-sans text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                    {show.detailText}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Benefits Grid */}
      <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Structural Integrity */}
          <div className="space-y-4 p-6 bg-surface-container/50 rounded-xl border border-outline-variant/40 hover:border-primary/40 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-surface-container-high border border-outline-variant/80 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">verified</span>
            </div>
            <h4 className="font-display text-lg font-bold text-on-surface">
              Structural Integrity
            </h4>
            <p className="font-sans text-on-surface-variant text-sm leading-relaxed">
              Rigorous adherence to international safety codes (AISC, BS, IS) and dynamic load analysis for lifetime structural durability.
            </p>
          </div>

          {/* Cost-Optimization */}
          <div className="space-y-4 p-6 bg-surface-container/50 rounded-xl border border-outline-variant/40 hover:border-primary/40 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-surface-container-high border border-outline-variant/80 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">monetization_on</span>
            </div>
            <h4 className="font-display text-lg font-bold text-on-surface">
              Cost-Optimization
            </h4>
            <p className="font-sans text-on-surface-variant text-sm leading-relaxed">
              Intelligent weight distribution and member selection to minimize steel tonnage while maximizing load span capacity.
            </p>
          </div>

          {/* Digital Precision */}
          <div className="space-y-4 p-6 bg-surface-container/50 rounded-xl border border-outline-variant/40 hover:border-primary/40 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-surface-container-high border border-outline-variant/80 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">center_focus_strong</span>
            </div>
            <h4 className="font-display text-lg font-bold text-on-surface">
              Digital Precision
            </h4>
            <p className="font-sans text-on-surface-variant text-sm leading-relaxed">
              Millimeter-accurate detailing produces fabrication-ready shop layouts, guaranteeing zero costly field rework.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Tonnage Weight Estimator Tool (Craftsmanship Enhancement) */}
      <section className="px-6 md:px-12 py-12 max-w-5xl mx-auto">
        <div className="p-8 rounded-xl bg-primary-container/20 border border-primary/30 space-y-6">
          <div className="flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined">calculate</span>
            <span className="font-mono text-xs uppercase tracking-wider font-bold">Steel Weight Estimator Tool</span>
          </div>

          <div className="space-y-2">
            <h3 className="font-display text-xl font-bold text-on-surface">Estimator Engine</h3>
            <p className="font-sans text-sm text-on-surface-variant">
              Adjust building dimensions to compute an approximate steel weight (Metric Tons) based on standard industrial structures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-2">
            {/* Length slider */}
            <div className="space-y-2">
              <div className="flex justify-between font-mono text-xs">
                <span className="text-on-surface-variant">LENGTH</span>
                <span className="text-primary font-bold">{length} m</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full accent-construction-orange bg-outline-variant/60 rounded h-1 cursor-pointer"
              />
            </div>

            {/* Width slider */}
            <div className="space-y-2">
              <div className="flex justify-between font-mono text-xs">
                <span className="text-on-surface-variant">SPAN (WIDTH)</span>
                <span className="text-primary font-bold">{width} m</span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                className="w-full accent-construction-orange bg-outline-variant/60 rounded h-1 cursor-pointer"
              />
            </div>

            {/* Height slider */}
            <div className="space-y-2">
              <div className="flex justify-between font-mono text-xs">
                <span className="text-on-surface-variant">EAVE HEIGHT</span>
                <span className="text-primary font-bold">{height} m</span>
              </div>
              <input
                type="range"
                min="4"
                max="20"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full accent-construction-orange bg-outline-variant/60 rounded h-1 cursor-pointer"
              />
            </div>

            {/* Complexity Select */}
            <div className="space-y-2">
              <label className="block font-mono text-xs text-on-surface-variant uppercase">
                LOAD COMPLEXITY
              </label>
              <select
                value={complexity}
                onChange={(e) => setComplexity(e.target.value)}
                className="w-full bg-background border border-outline-variant rounded p-1.5 text-xs text-on-surface focus:border-construction-orange outline-none"
              >
                <option value="Low">Low (Light Shed/Storage)</option>
                <option value="Medium">Medium (Warehouse / Crane Runway)</option>
                <option value="High">High (Multi-tier Plant / Heavy Equipment)</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="font-mono text-xs text-on-surface-variant uppercase">
                ESTIMATED TONNAGE:
              </div>
              <div className="font-mono text-2xl font-bold text-construction-orange">
                {calculateEstimatedTonnage()} MT
              </div>
              <span className="font-sans text-[11px] text-on-surface-variant/80 italic">
                (Approx. Weight)
              </span>
            </div>

            <button
              onClick={handleApplyTonnage}
              className="py-2.5 px-5 bg-surface-container-high border border-outline-variant rounded hover:bg-primary hover:text-on-primary hover:border-primary text-primary font-mono text-xs uppercase transition-all duration-200 cursor-pointer"
            >
              Apply Weight to Form Quote
            </button>
          </div>
        </div>
      </section>

      {/* 6. Contact Quote Form */}
      <section className="px-6 md:px-12 py-16 relative">
        <div className="absolute inset-0 technical-grid opacity-5 -z-10"></div>
        
        <div className="max-w-2xl mx-auto bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/70 shadow-xl space-y-6">
          <div className="space-y-1">
            <h3 className="font-display text-2xl font-bold text-on-surface">
              Request a Design Quote
            </h3>
            <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
              Send us your project requirements for a detailed, compliant technical proposal.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-mono text-xs text-on-surface-variant mb-1.5 uppercase tracking-wider">
                Full Name <span className="text-construction-orange">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full bg-background border border-outline-variant rounded-lg px-4 py-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-outline/40"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block font-mono text-xs text-on-surface-variant mb-1.5 uppercase tracking-wider">
                Email Address <span className="text-construction-orange">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full bg-background border border-outline-variant rounded-lg px-4 py-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-outline/40"
                placeholder="john@company.com"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block font-mono text-xs text-on-surface-variant mb-1.5 uppercase tracking-wider">
                  Project Type
                </label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full bg-background border border-outline-variant rounded-lg px-4 py-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all cursor-pointer"
                >
                  <option value="Warehousing">Warehousing</option>
                  <option value="Industrial Plant">Industrial Plant</option>
                  <option value="Commercial Frame">Commercial Frame</option>
                  <option value="Mezzanine Design">Mezzanine Design</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-xs text-on-surface-variant mb-1.5 uppercase tracking-wider">
                  Estimated Tonnage (MT)
                </label>
                <input
                  type="number"
                  name="tonnage"
                  value={formData.tonnage}
                  onChange={handleInputChange}
                  className="w-full bg-background border border-outline-variant rounded-lg px-4 py-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-outline/40"
                  placeholder="MT Tonnage (e.g., 45)"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-xs text-on-surface-variant mb-1.5 uppercase tracking-wider">
                Message / Design Scope <span className="text-construction-orange">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                className="w-full bg-background border border-outline-variant rounded-lg px-4 py-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-outline/40 min-h-[110px]"
                placeholder="Tell us about your span length, loading parameters, soil report, or timeline requirements..."
                rows={4}
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-primary text-on-primary font-mono text-xs font-bold uppercase rounded-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 tracking-widest shadow-lg shadow-primary/10 cursor-pointer"
              id="quote-submit-btn"
            >
              <span>Submit Proposal Request</span>
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </form>
        </div>
      </section>

      {/* Submission Success Dialog Modal Overlay */}
      {formSubmitted && (
        <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex items-center justify-center p-6 animate-fade-in">
          <div className="bg-surface-container-low max-w-md w-full rounded-2xl border border-outline-variant/60 p-8 text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 bg-primary-container rounded-full flex items-center justify-center mx-auto text-primary border border-outline-variant">
              <span className="material-symbols-outlined text-4xl">check_circle</span>
            </div>
            <div className="space-y-2">
              <h3 className="font-display text-2xl font-bold text-on-surface">Design Inquiry Received</h3>
              <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                Thank you! Your quote request for <strong>{projectType} ({formData.tonnage ? `${formData.tonnage} MT` : 'Unspecified Weight'})</strong> has been logged. Our structural engineers will review your messages and contact you with a pre-design blueprint overview.
              </p>
            </div>
            <button
              onClick={() => setFormSubmitted(false)}
              className="w-full py-3 bg-construction-orange text-white rounded-lg font-bold hover:bg-orange-600 transition-colors uppercase tracking-wider text-xs cursor-pointer"
            >
              Back to Site
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
