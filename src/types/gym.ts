export type ClassCategory = 'all' | 'crossfit' | 'hiit' | 'strength' | 'mobility' | 'challenge';

export interface GymClass {
  id: string;
  name: string;
  category: 'crossfit' | 'hiit' | 'strength' | 'mobility' | 'challenge';
  time: string;
  duration: string;
  days: string[]; // ['Monday', 'Wednesday', 'Friday']
  coach: string;
  intensity: 'Medium' | 'High' | 'Elite';
  capacity: number;
  enrolled: number;
  description: string;
  location: string;
}

export interface ServiceProgram {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  image: string;
  tag: string;
  idealFor: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  description: string;
  monthlyPrice: number;
  quarterlyPrice: number; // per month billed quarterly
  annualPrice: number; // per month billed annually
  popular?: boolean;
  features: string[];
  perks: string[];
}

export interface Coach {
  name: string;
  role: string;
  specialty: string;
  experience: string;
  certifications: string[];
  bio: string;
}

export interface Testimonial {
  name: string;
  role: string;
  program: string;
  outcome: string;
  quote: string;
  monthsActive: number;
}
