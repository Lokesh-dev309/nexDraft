/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ServiceCard, ExpertiseCard, WorkflowPhase, ProjectItem, TestimonialItem, FAQItem } from './types';

/**
 * =========================================================================
 *                   NEXDRAFT PORTFOLIO & COMPANY STATIC DATA
 * =========================================================================
 * This file contains all the textual content, service items, recent projects, 
 * and testimonials shown on the website.
 * 
 * 💡 HOW TO CUSTOMIZE THIS DATA FOR YOUR PROJECTS:
 * 
 * 1. CHANGING PICTURES/IMAGES:
 *    - To use your own project pictures, host your images on a cloud service 
 *      (e.g., Google Drive, Imgur, AWS S3, or your web server) and paste the 
 *      direct image link in the "image" field.
 *    - Alternatively, place images inside the "/assets" directory (e.g., "/assets/my-project.jpg") 
 *      and use that path relative to your build.
 * 
 * 2. MODIFYING PROJECT DETAILS (METADATA):
 *    - Each project in "PORTFOLIO_PROJECTS" has rich custom fields:
 *      • tonnage: The weight of steel structural elements (e.g. "450 MT") [Optional]
 *      • client: The corporate or developer name [Optional]
 *      • location: Where the construction took place (e.g. "Chicago, IL") [Optional]
 *      • year: Completion date [Optional]
 *      • compliance: Standard building codes adhered to (e.g. "AISC 360-16, EN 1993") [Optional]
 *      • software: Softwares used for modeling and stress tests (e.g. "Tekla, STAAD.Pro") [Optional]
 *      • tolerances: Precision index (e.g. "Millimeter Snapping (±0.01mm)") [Optional]
 *      • deliverables: File formats handed over (e.g. "DWG, IFC, Tekla NC") [Optional]
 *      • detailText: Extended descriptive paragraph displayed in the pop-up spec drawer.
 * 
 * 3. CATEGORIES:
 *    - Supported categories: 'Steel' | 'Furniture' | 'Interiors' | 'CAD'
 */

// Global high-contrast background & technical blueprints
export const HERO_BACKGROUND = '/Hero11.jpg'; // Modern skyscraper framework under construction
export const STEEL_BLUEPRINT_IMAGE = '/Service1.jpg'; // Professional engineering blueprints and tablet
export const MAP_IMAGE = 'Map1.png'; // World map with pinpointed locations

/**
 * Core Service Offerings
 */
export const SERVICES: ServiceCard[] = [
  {
    id: 'steel',
    icon: 'architecture',
    title: 'Structural Steel Detailing',
    description: 'Full-scale structural steel design, complex joint detailing, and load analysis using state-of-the-art STAAD.Pro and Tekla workflows.'
  },
  {
    id: 'cad',
    icon: 'precision_manufacturing',
    title: 'CAD & Mechanical Modeling',
    description: 'Precision mechanical drafting, 3D parametric part modeling, and tolerance stack-up analysis for assemblies.'
  },
  {
    id: 'interior',
    icon: 'chair_alt',
    title: 'Commercial Interior Planning',
    description: 'Space planning, architectural layout design, and ergonomics analysis tailored for high-productivity corporate offices.'
  },
  {
    id: 'furniture',
    icon: 'weekend',
    title: 'Custom Furniture Engineering',
    description: 'Bespoke, structural, and ergonomic furniture solutions designed and optimized in SolidWorks for volume manufacturing.'
  }
];

/**
 * Technical Capabilities Highlighted on Homepage
 */
export const CORE_EXPERTISE: ExpertiseCard[] = [
  {
    icon: 'view_in_ar',
    title: 'LOD 400 Tekla Models',
    description: 'Highly detailed, fabrication-ready 3D structural representations, down to every structural bolt, weld, and gusset.'
  },
  {
    icon: 'analytics',
    title: 'Seismic & Wind Stress Test',
    description: 'Comprehensive static and dynamic structural loading simulations inside STAAD.Pro following international codes.'
  },
  {
    icon: 'settings_input_component',
    title: 'Joint Connection Calculations',
    description: 'Custom engineering for heavy industrial connection nodes conforming to AISC, Eurocode, or IS specifications.'
  },
  {
    icon: 'draw',
    title: 'Shop Assembly Drawings',
    description: 'High-density, error-free fabrication blueprints ensuring swift production and seamless on-site erection.'
  }
];

/**
 * Step-by-Step Engineering Execution Workflow
 */
export const WORKFLOW_PHASES: WorkflowPhase[] = [
  {
    phase: 'PHASE 01',
    title: 'Initial Parameters & Loading Calculations',
    description: 'We evaluate structural dead, live, wind, and seismic loads specific to your geographical project site.'
  },
  {
    phase: 'PHASE 02',
    title: 'Finite Element Analysis & Optimization',
    description: 'Using STAAD.Pro, we optimize steel cross-sections to minimize tonnage while maintaining a robust safety coefficient.'
  },
  {
    phase: 'PHASE 03',
    title: 'Unified 3D BIM Coordination',
    description: 'We develop a detailed 3D model in Tekla or SolidWorks to eliminate coordinate clashes with HVAC and electrical runs.'
  },
  {
    phase: 'PHASE 04',
    title: 'Fabrication Drawings & NC Generation',
    description: 'We deliver comprehensive assembly drawings, single-part shop drawings, and direct NC files for computerized fabrication.'
  }
];

/**
 * Quick-glance Recent Projects Shown on the Homepage
 */
export const RECENT_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-metropolis',
    title: 'Siddhartha Grease (Maharashtra) 900 MT',
    description: 'High-cube structural steel framework detailing and wind load optimization.',
    category: 'Steel',
    image: "/Re1.png", // High quality modern warehouse logistics framework
    detailText: 'Full high-strength connection detailing, wind load calculations following ASCE 7-16, and construction-ready shop assemblies for a high-cube industrial warehouse distribution center spanning 45,000 sqm.',
    tonnage: '420 MT',
    location: 'Houston, TX',
    client: 'Metropolis Logistics Inc.',
    year: '2025'
  },
  {
    id: 'proj-techhq',
    title: 'FOB-CD Chowk Gurugram',
    description: 'Ergonomic interior space optimization and custom collaborative workstations.',
    category: 'Interiors',
    image: "/Re2.png", // Beautiful modern office interior space
    detailText: 'Spatial zoning, acoustics modeling, and custom-engineered modular collaborative workstation configurations for a massive 4-story tech corporate headquarters.',
    location: 'Silicon Valley, CA',
    client: 'Innovatech Corp',
    year: '2026'
  },
  {
    id: 'proj-geardrive',
    title: 'Pune Metro Station 800MT',
    description: 'High-precision mechanical component design with structural stress limit analysis.',
    category: 'Steel',
    image: "/Re3.png", // Mechanical engineering high precision planetary gear assembly
    detailText: 'SolidWorks parametric CAD modeling for high-load planetary gears with rigorous structural stress simulations, physical alignment analysis, and 100% accurate thermal expansion compensation.',
    location: 'Munich, Germany',
    client: 'Krupp Industrial Systems',
    year: '2025'
  }
];

/**
 * Service Showcases for Steel Structures Detailing
 */
export const SERVICE_SHOWCASES: ProjectItem[] = [
  {
    id: 'show-warehouse',
    title: 'Siddhartha Grease (Maharashtra) 900 MT',
    description: 'Industrial frame detailing and connection calculations.',
    category: 'Steel',
    image: '/Re1.png', // Modern warehouse logistics framework
    detailText: 'Comprehensive Tekla detailing spanning over 40,000 square meters. Complete structural analysis utilizing high-strength steel grades and modular assembly configurations.'
  },
  {
    id: 'show-factory',
    title: 'FOB-CD Chowk Gurugram',
    description: 'Deflection-critical heavy gantry support engineering.',
    category: 'Steel',
    image: '/Re2.png', // Heavy industry gantry structure
    detailText: 'Overhead traveling crane supporting columns and structural design. Adheres to strict deflection limits to ensure safety and equipment alignment.'
  },
  {
    id: 'show-tower',
    title: 'Pune Metro Station 800MT',
    description: 'Seismic moment-resistant skeleton framework design.',
    category: 'Steel',
    image: '/Re3.png', // High-rise commercial tower
    detailText: 'High-rise structural skeleton utilizing seismic-resistant moment frames and buckling-restrained braces to meet strict building codes.'
  }
];

/**
 * Full Portfolio Projects Database (Filterable by Category on the Projects Page)
 * 💡 Add or change your own projects here!
 */
export const PORTFOLIO_PROJECTS: ProjectItem[] = [
  {
    id: 'port-1',
    title: 'Siddhartha Grease (Maharashtra) 900 MT',
    description: 'High-density structural steel framework for a 45-story commercial skyscraper using moment-resistant joints.',
    category: 'Steel',
    image: '/Re1.png', // Glass and steel skyscraper skeleton
    tonnage: '3,200 MT',
    client: 'Apex Commercial Properties',
    location: 'Maharashtra, India',
    year: '2023',
   
    
    detailText: 'Engineered high-rise structural stability with detailed wind-tunnel simulation models. Completed LOD 400 BIM coordinate modeling resolving over 400 potential clashes with HVAC, MEP, and elevator tracks.'
  },
  {
    id: 'port-2',
    title: 'TFOB-CD Chowk Gurugram',
    description: 'Bespoke interior architectural blueprints and ergonomic furniture integration for a modern financial headquarters.',
    category: 'Interiors',
    image: '/Re2.png', // Executive workspace interior
    client: 'Vertex Asset Management',
    location: 'Gurugram, Haryana',
    year: '2022',
    compliance: 'ADA Compliance standards, LEED Green Building codes',
    software: 'Autodesk Revit BIM / 3ds Max / V-Ray Renderer',
    tolerances: 'Spatial Layout Tolerance (±1.00mm)',
    deliverables: 'Photorealistic Renderings, CAD Millwork Details, Spatial Layout Plans',
    detailText: 'Designed executive chambers combining warm walnut millwork details with smart, sound-attenuating ceiling panels and responsive architectural task lighting systems.'
  },
  {
    id: 'port-3',
    title: 'EPCM SERVICES FOR CRU, IOCL GUWAHATI REFINERY 500MT',
    description: 'Precision CAD drafting and stress testing for power transmission mechanical planetary gear systems.',
    category: 'CAD',
    image: '/Re3.png', // High-precision steel manufacturing
    client: 'Henschel Heavy Engineering Corp',
    location: 'Guwahati, Assam',
    year: '2024',
    compliance: 'ISO 1328 (Cylindrical Gears), ASME Y14.5 (GD&T)',
    software: 'SolidWorks Professional v2024 / ANSYS Workbench',
    tolerances: 'Ultra-Precision Fit (0.01mm limit deviation)',
    deliverables: 'SolidWorks Assemblies (.sldasm), Detailed 2D Shop Drawings, Stress Hotspot Reports',
    detailText: 'Designed multi-stage planetary gearbox systems with integrated finite element analysis (FEA) testing. Handled complex geometry parameters, shaft keys, bearing tolerances, and thermal dissipation paths.'
  },
  {
    id: 'port-4',
    title: 'Mini Millet Factory (Rise Mill)',
    description: 'Industrial workspace furniture design focusing on scalable configurations, steel frames, and durable surfaces.',
    category: 'Furniture',
    image: '/Re4.png', // Modern workplace desk setup
    client: 'Modular Labs Furniture LLC',
    location: 'Pune, Maharashtra',
    year: '2024',
    compliance: 'BIFMA X5.5 (Desk Products), ISO 9001 quality specifications',
    software: 'SolidWorks Sheet Metal / Keyshot Pro',
    tolerances: 'Laser Cut Sheet Metal Snapping (±0.05mm)',
    deliverables: 'DXF Nesting Files, Bill of Materials (BOM), Assembly Instruction Graphics',
    detailText: 'Engineered a highly flexible workspace bench system. The load-bearing steel skeleton was optimized in SolidWorks FEA to bear up to 250kg of lab equipment per module while keeping structural mass as low as possible.'
  },
  {
    id: 'port-5',
    title: 'Platform Structure',
    description: 'Structural steel detailing and joint calculations for an architectural steel arch bridge.',
    category: 'Steel',
    image: '/Re6.png', // Steel arch pedestrian bridge
    tonnage: '185 MT',
    client: 'San Francisco Transit Department',
    location: 'gurugram, Haryana',
    year: '2025',
    compliance: 'AASHTO LRFD Bridge Specifications, AISC Steel Bridge Detailing Guide',
    software: 'Tekla Structures / Bentley RM Bridge',
    tolerances: 'Bridge Pier Alignment (±0.01mm)',
    deliverables: 'Shop Drawings, Erection Sequence Diagrams, 3D IFC Models',
    detailText: 'Engineered structural connection details for an aesthetic curved hollow structural section (HSS) arch flyover, managing complex double-curvature plates and high-stress field splice welds.'
  }
];

/**
 * Client Testimonials
 */
export const TESTIMONIALS: TestimonialItem[] = [
  {
    quote: "The precision NexDraft brought to our industrial complex was unmatched. Their Tekla detailing saved us weeks in fabrication and on-site alignment.",
    author: "James Arkwright",
    role: "Director of Structural Development, BuildCorp Global"
  },
  {
    quote: "Their SolidWorks models saved us tons of prototype iterations. Highly precise, complete mechanical drawings and assemblies.",
    author: "Sarah Lin",
    role: "Lead Mechanical Engineer, GridDesign Partners"
  },
  {
    quote: "Professional architectural planning paired with rigorous structural analysis. NexDraft is our go-to engineering outsourcing house.",
    author: "Elena Rostova",
    role: "Principal Architect, Rostova & Associates"
  }
];

/**
 * Technical FAQ Section
 */
export const FAQS: FAQItem[] = [
  {
    question: "What building codes do you conform to for steel detailing?",
    answer: "We conform strictly to AISC (American Institute of Steel Construction), Eurocode (EN 1993), Indian Standards (IS 800), and ASCE wind/seismic regulations depending on the geographical location of your project."
  },
  {
    question: "Can we provide our own structural concepts or Revit files?",
    answer: "Absolutely. We routinely import client-provided architectural concept drawings, Revit files, or STAAD output files, detailing them into LOD 400 fabrication-ready shop models."
  },
  {
    question: "What files do we receive upon project completion?",
    answer: "You receive standard 2D shop fabrication drawings (DWG/DXF/PDF), 3D BIM coordination models (IFC/3D DWG), CNC cutting files (.NC/.NC1), and a comprehensive structural validation report if requested."
  },
  {
    question: "What is your typical turnaround time for a structural design?",
    answer: "Turnaround times vary by complexity, but we typically deliver preliminary calculations and initial layouts within 3-5 business days for standard assignments."
  }
];
