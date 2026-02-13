export interface BasePlan {
  name: string;
  provider: string;
  lifeCover: number;
  policyTerm: number;
  paymentFrequency: 'Monthly' | 'Quarterly' | 'Yearly';
  insuranceType: 'Fixed Term' | 'Whole Life';
  basePremium: number;
}

export interface Rider {
  id: string;
  name: string;
  description?: string;
  isSelected: boolean;
  coverAmount: number;
  minCover: number;
  maxCover: number;
  step: number;
  termYears: number;
  ratePerThousand: number; // Simplified logic for calculating premium
}

export type RiderUpdateHandler = (id: string, updates: Partial<Rider>) => void;