/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { PORTFOLIO_PROJECTS } from '../data';
import { ProjectItem, ActivePage } from '../types';

interface ProjectsViewProps {
  setActivePage: (page: ActivePage) => void;
  setContactPreFill: (serviceName: string) => void;
}

export default function ProjectsView({ setActivePage, setContactPreFill }: ProjectsViewProps) {
  // Category Filtering States
  const [activeCategory, setActiveCategory] = useState<'All' | 'Steel' | 'Furniture' | 'Interiors' | 'CAD'>('All');
  
  // Project Search State
  const [searchQuery, setSearchQuery] = useState('');

  // Project Detail Modal State
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Filter projects based on active tab and search query
  const filteredProjects = PORTFOLIO_PROJECTS.filter((proj) => {
    const matchesCategory = activeCategory === 'All' || proj.category === activeCategory;
    const matchesSearch = proj.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          proj.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories: ('All' | 'Steel' | 'Furniture' | 'Interiors' | 'CAD')[] = [
    'All',
    'Steel',
    'Furniture',
    'Interiors',
    'CAD'
  ];

  const handleInquireProject = (proj: ProjectItem) => {
    setContactPreFill(`${proj.category} Project Inquiry: ${proj.title}`);
    setSelectedProject(null);
    setActivePage('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="animate-fade-in pb-12 px-6 max-w-7xl mx-auto pt-8">
      {/* 1. Page Header */}
      <section className="mb-10 space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-[1px] w-10 bg-primary"></div>
          <span className="font-mono text-xs text-primary uppercase tracking-widest font-semibold">
            Our Projects
          </span>
        </div>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-on-surface tracking-tight leading-tight">
          Engineering Excellence Portfolio
        </h2>
        <p className="font-sans text-base text-on-surface-variant max-w-xl leading-relaxed">
          Exploring structural integrity and aesthetic precision through our curated selection of drafting, high-performance manufacturing modeling, and space design achievements.
        </p>
      </section>

      {/* Interactive Search Bar & Filters Layout */}
      <div className="mb-10 flex flex-col md:flex-row gap-6 md:items-center justify-between pb-4 border-b border-outline-variant/30">
        {/* Filter Navigation Bar */}
        <nav aria-label="Project category filters" className="flex overflow-x-auto gap-3.5 no-scrollbar scroll-smooth py-1 select-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  // Quick subtle scale microinteraction
                  const target = document.getElementById(`filter-chip-${cat}`);
                  if (target) {
                    target.style.transform = 'scale(0.95)';
                    setTimeout(() => { target.style.transform = 'scale(1)'; }, 100);
                  }
                }}
                id={`filter-chip-${cat}`}
                className={`whitespace-nowrap px-6 py-2 rounded-full font-mono text-xs tracking-wide transition-all cursor-pointer ${
                  isActive
                    ? 'bg-primary text-on-primary font-bold shadow-lg shadow-primary/10'
                    : 'bg-surface-container-high border border-outline-variant/50 text-on-surface-variant hover:border-primary/60 hover:text-on-surface'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </nav>

        {/* CAD Blueprint Style Search Input */}
        <div className="relative max-w-xs w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-container-low border border-outline-variant/60 rounded-lg pl-10 pr-4 py-2 font-mono text-xs text-on-surface placeholder:text-outline/40 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder="FILTER SYSTEM SEARCH..."
          />
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-lg pointer-events-none">
            search
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-outline hover:text-on-surface"
              aria-label="Clear Search"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. Masonry-Like Portfolio Grid */}
      {filteredProjects.length === 0 ? (
        <div className="py-20 text-center border border-dashed border-outline-variant/50 rounded-xl space-y-4">
          <span className="material-symbols-outlined text-outline text-5xl">folder_off</span>
          <div className="space-y-1">
            <h4 className="font-display text-lg font-bold text-on-surface">No Blueprints Found</h4>
            <p className="font-sans text-sm text-on-surface-variant">
              No projects matched the search filters. Try resetting the category or query.
            </p>
          </div>
          <button
            onClick={() => {
              setActiveCategory('All');
              setSearchQuery('');
            }}
            className="px-5 py-2 bg-surface-container border border-outline-variant rounded font-mono text-xs text-primary hover:bg-primary hover:text-on-primary hover:border-primary transition-all duration-200"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((proj) => (
            <article
              key={proj.id}
              className="bg-surface-container border border-outline-variant/60 rounded-xl overflow-hidden flex flex-col group hover:border-primary/50 transition-all duration-300 shadow-lg hover:translate-y-[-2px]"
            >
              {/* Asset Container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-surface-container-lowest">
                <img
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-103"
                  src={proj.image}
                  alt={proj.title}
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating pill tags */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-background/85 backdrop-blur-md px-3.5 py-1 rounded font-mono text-[10px] text-primary border border-primary/20 font-semibold tracking-wider uppercase">
                    {proj.category}
                  </span>
                  {proj.tonnage && (
                    <span className="bg-background/85 backdrop-blur-md px-3.5 py-1 rounded font-mono text-[10px] text-construction-orange border border-construction-orange/20 font-semibold tracking-wider">
                      {proj.tonnage}
                    </span>
                  )}
                </div>
              </div>

              {/* Text Description Box */}
              <div className="p-6 flex flex-col flex-grow space-y-4">
                <div className="space-y-2 flex-grow">
                  <h3 className="font-display text-xl font-bold text-on-surface group-hover:text-primary transition-colors">
                    {proj.title}
                  </h3>
                  <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                    {proj.description}
                  </p>
                </div>
                
                <button
                  onClick={() => setSelectedProject(proj)}
                  className="w-full py-3 bg-surface-container-highest border border-outline-variant text-on-surface font-mono text-xs uppercase tracking-wider hover:bg-primary hover:text-on-primary hover:border-primary transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>View Details</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* 3. Detailed Specification Drawer / Popover Overlay Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] bg-background/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-6 animate-fade-in overflow-y-auto">
          <div className="bg-surface-container-low max-w-2xl w-full rounded-2xl border border-outline-variant p-6 md:p-8 space-y-6 shadow-2xl relative">
            
            {/* Close trigger button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface p-1 hover:bg-surface-container-high rounded transition-colors"
              aria-label="Close details"
              id="close-spec-modal"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>

            {/* Header specifications */}
            <div className="space-y-3.5">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="bg-primary/10 text-primary border border-primary/30 px-2.5 py-0.5 rounded font-mono text-[10px] font-bold uppercase tracking-wider">
                  {selectedProject.category}
                </span>
                {selectedProject.tonnage && (
                  <span className="bg-construction-orange/10 text-construction-orange border border-construction-orange/30 px-2.5 py-0.5 rounded font-mono text-[10px] font-bold uppercase tracking-wider">
                    SPEC WEIGHT: {selectedProject.tonnage}
                  </span>
                )}
                <span className="font-mono text-[10px] text-outline">LOD_VER: LOD400</span>
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-on-surface">
                {selectedProject.title}
              </h3>
            </div>

            {/* Full High Contrast Image Asset */}
            <div className="relative rounded-xl overflow-hidden border border-outline-variant/60 aspect-video bg-surface-container-lowest">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent"></div>
            </div>

            {/* Structured Specifications Data Table */}
            <div className="space-y-4">
              <h4 className="font-mono text-xs font-bold text-primary uppercase tracking-widest border-b border-outline-variant/30 pb-1.5">
                TECHNICAL DATA SPECIFICATIONS
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded bg-background border border-outline-variant/50 space-y-1 font-mono text-xs text-on-surface-variant">
                  <div className="text-[10px] text-outline font-semibold uppercase">CLIENT &amp; LOCATION</div>
                  <div className="text-on-surface font-bold text-xs">
                    {selectedProject.client || 'Confidential Enterprise'} • {selectedProject.location || 'Global Delivery'} ({selectedProject.year || 'Recent'})
                  </div>
                </div>

                <div className="p-4 rounded bg-background border border-outline-variant/50 space-y-1 font-mono text-xs text-on-surface-variant">
                  <div className="text-[10px] text-outline font-semibold uppercase">COMPLIANCE NORMS</div>
                  <div className="text-on-surface font-bold text-xs">
                    {selectedProject.compliance || 'AISC 360-16, ASCE 7-16, EN 1993, IS 800'}
                  </div>
                </div>

                <div className="p-4 rounded bg-background border border-outline-variant/50 space-y-1 font-mono text-xs text-on-surface-variant">
                  <div className="text-[10px] text-outline font-semibold uppercase">DETAILING ACCURACY</div>
                  <div className="text-on-surface font-bold text-xs">
                    {selectedProject.tolerances || 'Millimeter Snapping (±0.01mm)'}
                  </div>
                </div>

                <div className="p-4 rounded bg-background border border-outline-variant/50 space-y-1 font-mono text-xs text-on-surface-variant">
                  <div className="text-[10px] text-outline font-semibold uppercase">MODEL ENGINE SOFTWARE</div>
                  <div className="text-on-surface font-bold text-xs">
                    {selectedProject.software || (
                      selectedProject.category === 'Steel' ? 'Tekla Structures / STAAD.Pro' : 
                      selectedProject.category === 'CAD' ? 'SolidWorks / AutoCAD' : '3D Max / Revit BIM'
                    )}
                  </div>
                </div>

                <div className="p-4 rounded bg-background border border-outline-variant/50 space-y-1 font-mono text-xs text-on-surface-variant md:col-span-2">
                  <div className="text-[10px] text-outline font-semibold uppercase">DELIVERABLES FORMAT</div>
                  <div className="text-on-surface font-bold text-xs">
                    {selectedProject.deliverables || 'DWG, IFC, DXF, Structural Calc PDF, Tekla NC Files'}
                  </div>
                </div>
              </div>

              <p className="font-sans text-sm text-on-surface-variant leading-relaxed pt-2">
                {selectedProject.detailText || selectedProject.description}
              </p>
            </div>

            {/* Action buttons */}
            <div className="pt-4 border-t border-outline-variant/40 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => handleInquireProject(selectedProject)}
                className="flex-1 py-3 bg-construction-orange hover:bg-orange-600 text-white font-mono text-xs font-bold uppercase rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-construction-orange/10"
                id="inquire-project-btn"
              >
                <span>Inquire About Design Specifications</span>
                <span className="material-symbols-outlined text-[16px]">mail</span>
              </button>
              <button
                onClick={() => setSelectedProject(null)}
                className="py-3 px-6 bg-surface-container-high border border-outline-variant rounded-lg font-mono text-xs uppercase hover:bg-surface-container transition-colors cursor-pointer"
              >
                Close Spec Sheet
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
