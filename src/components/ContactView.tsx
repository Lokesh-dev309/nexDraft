/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, ChangeEvent, DragEvent, FormEvent } from 'react';
import { MAP_IMAGE } from '../data';
import { ContactFormInput } from '../types';

interface ContactViewProps {
  preFilledDetails?: string;
  onSubmitInquiry: (form: ContactFormInput) => void;
}

export default function ContactView({ preFilledDetails, onSubmitInquiry }: ContactViewProps) {
  // File attachments state
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: number; type: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [service, setService] = useState('Structural Engineering');
  const [message, setMessage] = useState(preFilledDetails || '');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Drag and Drop State
  const [isDragging, setIsDragging] = useState(false);

  // File Upload Handlers
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addFiles(Array.from(e.target.files));
    }
  };

  const addFiles = (filesList: File[]) => {
    const validFiles = filesList.filter((f) => {
      const isLt25MB = f.size <= 25 * 1024 * 1024;
      if (!isLt25MB) {
        alert(`File ${f.name} exceeds the 25MB maximum limit.`);
      }
      return isLt25MB;
    });

    const mapped = validFiles.map((f) => ({
      name: f.name,
      size: f.size,
      type: f.type,
    }));

    setUploadedFiles((prev) => [...prev, ...mapped]);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, idx) => idx !== index));
  };

  const triggerFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Submission handler
  const handleSubmitInquiry = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      alert('Please fill out all required fields.');
      return;
    }

    const payload: ContactFormInput = {
      name,
      email,
      phone,
      company,
      service,
      message,
    };

    onSubmitInquiry(payload);
    setFormSubmitted(true);

    // Reset Form fields
    setName('');
    setEmail('');
    setPhone('');
    setCompany('');
    setService('Structural Engineering');
    setMessage('');
    setUploadedFiles([]);
  };

  // Helper format file size
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div className="animate-fade-in pb-12">
      {/* 1. Header Hero Card */}
      <section className="px-6 mb-12">
        <div className="relative overflow-hidden rounded-xl p-8 bg-surface-container-low border border-outline-variant max-w-5xl mx-auto">
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none select-none">
            <span className="material-symbols-outlined text-[130px] font-thin">
              architecture
            </span>
          </div>
          <div className="max-w-md space-y-3">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
              Let's Discuss Your Project
            </h1>
            <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed">
              Precision engineering and architectural drafting services tailored directly to your structural vision and load parameters.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Form & Direct Channels Layout */}
      <section className="px-6 mb-12 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Form Container (lg:col-span-8) */}
        <div className="lg:col-span-8 glass-panel p-6 md:p-8 rounded-xl space-y-6">
          <form onSubmit={handleSubmitInquiry} className="space-y-6">
            
            {/* Full Name */}
            <div className="space-y-2">
              <label className="block font-mono text-xs text-primary uppercase tracking-widest font-semibold">
                Full Name <span className="text-construction-orange">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-background border border-outline-variant rounded p-3.5 text-on-surface placeholder:text-outline/40 text-sm focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="John Doe"
              />
            </div>

            {/* Email and Phone Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="block font-mono text-xs text-primary uppercase tracking-widest font-semibold">
                  Email Address <span className="text-construction-orange">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-background border border-outline-variant rounded p-3.5 text-on-surface placeholder:text-outline/40 text-sm focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="john@firm.com"
                />
              </div>

              <div className="space-y-2">
                <label className="block font-mono text-xs text-primary uppercase tracking-widest font-semibold">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-background border border-outline-variant rounded p-3.5 text-on-surface placeholder:text-outline/40 text-sm focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>

            {/* Company Name */}
            <div className="space-y-2">
              <label className="block font-mono text-xs text-primary uppercase tracking-widest font-semibold">
                Company Name
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full bg-background border border-outline-variant rounded p-3.5 text-on-surface placeholder:text-outline/40 text-sm focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="Architectural Solutions Ltd."
              />
            </div>

            {/* Required Service Dropdown */}
            <div className="space-y-2">
              <label className="block font-mono text-xs text-primary uppercase tracking-widest font-semibold">
                Required Service
              </label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full bg-background border border-outline-variant rounded p-3.5 text-on-surface text-sm focus:border-primary focus:ring-1 focus:ring-primary cursor-pointer"
              >
                <option value="Structural Engineering">Structural Engineering (STAAD.Pro / Tekla)</option>
                <option value="CAD Drafting & Detailing">CAD Drafting &amp; Detailing (SolidWorks / AutoCAD)</option>
                <option value="Interior Architecture">Interior Architecture &amp; Space Planning</option>
                <option value="Furniture Design">Furniture Design &amp; Modeling</option>
                <option value="3D Visualization">3D Photorealistic Rendering</option>
              </select>
            </div>

            {/* Project Details */}
            <div className="space-y-2">
              <label className="block font-mono text-xs text-primary uppercase tracking-widest font-semibold">
                Project Details <span className="text-construction-orange">*</span>
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full bg-background border border-outline-variant rounded p-3.5 text-on-surface placeholder:text-outline/40 text-sm focus:border-primary focus:ring-1 focus:ring-primary resize-y min-h-[120px]"
                placeholder="Describe your design scale, span length, timeline target, or dynamic loading requirements..."
                rows={4}
              />
            </div>

            {/* Blueprints / Attachments Upload Zone */}
            <div className="space-y-3">
              <label className="block font-mono text-xs text-primary uppercase tracking-widest font-semibold">
                Blueprints / Attachments
              </label>
              
              {/* Drop Area */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={triggerFileSelect}
                className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center bg-surface-container-lowest/50 cursor-pointer transition-all ${
                  isDragging
                    ? 'border-construction-orange bg-construction-orange/5'
                    : 'border-outline-variant hover:border-primary'
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  multiple
                  className="hidden"
                  accept=".pdf,.dwg,.dxf,.png,.jpg,.jpeg"
                />
                <span className="material-symbols-outlined text-outline text-3xl mb-3">
                  upload_file
                </span>
                <p className="font-sans text-sm text-on-surface font-medium text-center">
                  Drag and drop your engineering blueprints here, or <span className="text-primary underline">browse</span>
                </p>
                <p className="font-mono text-[10px] text-outline mt-1.5 uppercase">
                  Supports PDF, DWG, DXF, PNG, JPG (MAX FILE SIZE: 25MB)
                </p>
              </div>

              {/* Rendered Uploaded Files List */}
              {uploadedFiles.length > 0 && (
                <div className="space-y-2 pt-2 animate-fade-in">
                  <p className="font-mono text-[10px] text-primary uppercase tracking-wider">
                    ATTACHED DOCUMENTS ({uploadedFiles.length})
                  </p>
                  <div className="space-y-1.5">
                    {uploadedFiles.map((file, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 bg-surface-container rounded border border-outline-variant/60 font-mono text-xs"
                      >
                        <div className="flex items-center gap-2.5 truncate max-w-[80%]">
                          <span className="material-symbols-outlined text-primary text-base">
                            draft
                          </span>
                          <span className="text-white font-medium truncate">{file.name}</span>
                          <span className="text-outline text-[10px]">({formatBytes(file.size)})</span>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveFile(idx);
                          }}
                          className="text-on-surface-variant hover:text-red-400 p-1 rounded transition-colors"
                          aria-label={`Remove file ${file.name}`}
                        >
                          <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Submit Project Inquiry button */}
            <button
              type="submit"
              className="w-full py-4 bg-primary hover:bg-surface-tint hover:scale-[1.01] active:scale-95 text-on-primary font-mono text-xs font-bold rounded shadow-lg transition-all uppercase tracking-widest cursor-pointer"
              id="contact-submit-btn"
            >
              Submit Project Inquiry
            </button>
          </form>
        </div>

        {/* Direct Channels & Contact Info (lg:col-span-4) */}
        <div className="lg:col-span-4 space-y-8">
          <div className="space-y-6">
            <h2 className="font-mono text-xs font-semibold text-primary uppercase tracking-[0.2em] border-l-2 border-primary pl-4">
              Direct Channels
            </h2>
            
            <div className="grid grid-cols-1 gap-4">
              {/* Headquarters */}
              <div className="flex items-start gap-4 p-4 rounded-lg border border-outline-variant/60 bg-surface-container-low hover:border-primary/40 transition-colors">
                <div className="bg-primary-container p-2.5 rounded text-primary border border-outline-variant/60">
                  <span className="material-symbols-outlined text-xl">location_on</span>
                </div>
                <div className="space-y-0.5">
                  <p className="font-mono text-xs font-bold text-on-surface">Headquarters</p>
                  <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                   sector 37, Faridabad, Haryana, India<br /> India 121003
                  </p>
                </div>
              </div>

              {/* Technical Support */}
              <div className="flex items-center gap-4 p-4 rounded-lg border border-outline-variant/60 bg-surface-container-low hover:border-primary/40 transition-colors">
                <div className="bg-primary-container p-2.5 rounded text-primary border border-outline-variant/60">
                  <span className="material-symbols-outlined text-xl">call</span>
                </div>
                <div className="space-y-0.5">
                  <p className="font-mono text-xs font-bold text-on-surface">Technical Support</p>
                  <p className="font-sans text-xs text-on-surface-variant">+91 99718 85501</p>
                </div>
              </div>

              {/* General Inquiries */}
              <div className="flex items-center gap-4 p-4 rounded-lg border border-outline-variant/60 bg-surface-container-low hover:border-primary/40 transition-colors">
                <div className="bg-primary-container p-2.5 rounded text-primary border border-outline-variant/60">
                  <span className="material-symbols-outlined text-xl">mail</span>
                </div>
                <div className="space-y-0.5">
                  <p className="font-mono text-xs font-bold text-on-surface">General Inquiries</p>
                  <p className="font-sans text-xs text-on-surface-variant">solutions@nexdraft.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* WhatsApp Direct CTA */}
          <div className="p-5 rounded-xl bg-surface-container-low border border-outline-variant/60 text-center space-y-4">
            <span className="material-symbols-outlined text-construction-orange text-3xl animate-bounce">
              chat_bubble
            </span>
            <div className="space-y-1">
              <h4 className="font-display text-sm font-bold text-on-surface">Need an Instant Consultation?</h4>
              <p className="font-sans text-xs text-on-surface-variant">
                Our lead structural engineers are active for technical review on mobile channels.
              </p>
            </div>
            
            <a
              href="https://wa.me/919971885501"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-mono text-xs font-bold rounded-lg shadow-xl active:scale-[0.98] transition-all uppercase tracking-wide cursor-pointer"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              <span>Chat on WhatsApp</span>
            </a>
            <p className="font-mono text-[10px] text-outline uppercase tracking-wider">
              Instant response during business hours
            </p>
          </div>
        </div>
      </section>

      {/* 3. Dark Theme Google Map Placeholder */}
      <section className="px-6 mb-12 max-w-5xl mx-auto">
        <div className="relative h-64 w-full rounded-xl overflow-hidden border border-outline-variant shadow-md">
          <div className="absolute inset-0 bg-surface-container-highest">
            <img
              className="w-full h-full object-cover brightness-110 contrast-110 saturate-125"
              src={MAP_IMAGE}
              alt="Clean architectural map grid of San FranciscoFinancial District"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
            
            {/* Compass badge details */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <span className="font-mono text-[10px] bg-background/80 backdrop-blur px-3 py-1.5 rounded border border-outline-variant/60 uppercase tracking-widest text-on-surface">
                sector 37, Faridabad, Haryana, India
              </span>
              <a
                href="https://www.google.com/maps/place/Sector+37,+Faridabad,+Haryana/@28.4794086,77.3014365,15z/data=!3m1!4b1!4m6!3m5!1s0x390ce71647de8197:0xe58a736ad59b2397!8m2!3d28.4810408!4d77.3116621!16s%2Fg%2F1tl1lv64?entry=ttu&g_ep=EgoyMDI2MDYyNC4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary hover:bg-surface-tint text-on-primary p-2.5 rounded-full shadow-lg transition-colors flex items-center justify-center cursor-pointer"
                aria-label="Get Directions in Google Maps"
                id="map-directions-btn"
              >
                <span className="material-symbols-outlined text-sm font-bold">directions</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Complete Inquiry Success Dialog Overlay */}
      {formSubmitted && (
        <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex items-center justify-center p-6 animate-fade-in">
          <div className="bg-surface-container-low max-w-md w-full rounded-2xl border border-outline-variant/60 p-8 text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 bg-primary-container rounded-full flex items-center justify-center mx-auto text-primary border border-outline-variant">
              <span className="material-symbols-outlined text-4xl">check_circle</span>
            </div>
            <div className="space-y-2">
              <h3 className="font-display text-2xl font-bold text-on-surface">Inquiry Received</h3>
              <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                Thank you! Your full project dossier has been securely compiled. A structural pre-feasibility engineer will review the documents and provide draft structural recommendations within 24 hours.
              </p>
            </div>
            <button
              onClick={() => setFormSubmitted(false)}
              className="w-full py-3 bg-construction-orange text-white rounded-lg font-bold hover:bg-orange-600 transition-colors uppercase tracking-wider text-xs cursor-pointer"
              id="success-close-btn"
            >
              Back to Site
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
