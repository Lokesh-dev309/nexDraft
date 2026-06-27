/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ActivePage = 'home' | 'services' | 'projects' | 'contact';

export interface ServiceCard {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface ExpertiseCard {
  icon: string;
  title: string;
  description: string;
}

export interface WorkflowPhase {
  phase: string;
  title: string;
  description: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  category: 'Steel' | 'Furniture' | 'Interiors' | 'CAD';
  image: string;
  detailText?: string;
  tonnage?: string;
  location?: string;
  year?: string;
  client?: string;
  compliance?: string;
  software?: string;
  tolerances?: string;
  deliverables?: string;
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ContactFormInput {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  message: string;
  tonnage?: string;
  attachments?: File[];
}
