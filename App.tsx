import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import RiderCard from './components/RiderCard';
import Accordion from './components/Accordion';
import { BasePlan, Rider } from './types';
import { calculateRiderPremium, formatCurrencyWithDecimals } from './utils';
import { FileText, ArrowRight, Shield } from 'lucide-react';

// Initial Mock Data
const INITIAL_PLAN: BasePlan = {
  name: 'Alliance - Smart Term Assurance',
  provider: 'Alliance',
  lifeCover: 1000000,
  policyTerm: 10,
  paymentFrequency: 'Monthly',
  insuranceType: 'Fixed Term',
  basePremium: 117.56,
};

const INITIAL_RIDERS: Rider[] = [
  {
    id: '1',
    name: 'Critical Illness / Cancer Cover',
    description: 'Provides a lump sum upon diagnosis of cancer or specified critical illnesses.',
    isSelected: false,
    coverAmount: 200000,
    minCover: 50000,
    maxCover: 500000,
    step: 10000,
    termYears: 10,
    ratePerThousand: 0.15, // Cost factor
  },
  {
    id: '2',
    name: 'Permanent & Total Disability',
    description: 'Financial protection in case of permanent disability preventing work.',
    isSelected: false,
    coverAmount: 500000,
    minCover: 100000,
    maxCover: 1000000,
    step: 50000,
    termYears: 10,
    ratePerThousand: 0.08,
  },
  {
    id: '3',
    name: 'Accidental Death Benefit',
    description: 'Additional payout if death occurs due to an accident.',
    isSelected: false,
    coverAmount: 1000000,
    minCover: 100000,
    maxCover: 2000000,
    step: 100000,
    termYears: 10,
    ratePerThousand: 0.05,
  },
  {
    id: '4',
    name: 'Hospicash Benefit',
    description: 'Daily cash allowance for hospitalization expenses.',
    isSelected: false,
    coverAmount: 500,
    minCover: 100,
    maxCover: 1000,
    step: 50,
    termYears: 10,
    ratePerThousand: 12.5, // Higher rate per unit as units are smaller (daily cash)
  },
];

const App: React.FC = () => {
  const [riders, setRiders] = useState<Rider[]>(INITIAL_RIDERS);

  const handleRiderUpdate = (id: string, updates: Partial<Rider>) => {
    setRiders((prev) =>
      prev.map((rider) => (rider.id === id ? { ...rider, ...updates } : rider))
    );
  };

  // Derived State: Total Premium Calculation
  const totalPremium = useMemo(() => {
    const ridersCost = riders.reduce((acc, rider) => {
      if (rider.isSelected) {
        return acc + calculateRiderPremium(rider.coverAmount, rider.ratePerThousand);
      }
      return acc;
    }, 0);
    return INITIAL_PLAN.basePremium + ridersCost;
  }, [riders]);

  const selectedCount = riders.filter(r => r.isSelected).length;

  return (
    <div className="min-h-screen pb-32">
      {/* Top Navigation Bar Mockup */}
      <nav className="bg-white border-b border-gray-200 py-4 mb-6">
        <div className="max-w-5xl mx-auto px-4 flex justify-between items-center">
            <span className="font-bold text-blue-900 text-lg">Alliance</span>
            <div className="text-sm text-gray-500">Step 2 of 4: Customize Plan</div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 md:px-6 space-y-6">
        
        {/* Main Header Card */}
        <Header plan={INITIAL_PLAN} />

        {/* Included Benefits (Read Only/Static for this demo) */}
        <Accordion title="Included Benefits" defaultOpen={false}>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
               <Shield className="text-green-600 mt-0.5" size={18} />
               <div>
                   <h4 className="font-semibold text-green-900 text-sm">Terminal Illness Cover</h4>
                   <p className="text-xs text-green-700 mt-1">Accelerated payout of life cover upon diagnosis.</p>
               </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
               <Shield className="text-green-600 mt-0.5" size={18} />
               <div>
                   <h4 className="font-semibold text-green-900 text-sm">Repatriation Benefit</h4>
                   <p className="text-xs text-green-700 mt-1">Covers costs of returning remains to home country.</p>
               </div>
            </div>
          </div>
        </Accordion>

        {/* Optional Benefits (The Core Task) */}
        <Accordion title="Optional Benefits (Riders)" defaultOpen={true} count={selectedCount}>
          <div className="space-y-4">
            {riders.map((rider) => (
              <RiderCard 
                key={rider.id} 
                rider={rider} 
                onUpdate={handleRiderUpdate} 
              />
            ))}
          </div>
        </Accordion>

        {/* Informational Note */}
        <div className="text-center py-6 text-gray-400 text-xs">
            <p>Terms and conditions apply. Premium values are indicative and subject to medical underwriting.</p>
        </div>
      </div>

      {/* Sticky Footer Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] p-4 md:py-5 z-50">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-start">
            <button className="flex items-center gap-2 text-blue-600 font-medium hover:text-blue-800 transition-colors">
              <FileText size={18} />
              <span>Plan details</span>
            </button>
            <label className="flex items-center gap-2 cursor-pointer text-gray-700 font-medium hover:text-gray-900">
              <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span>Compare Plan</span>
            </label>
          </div>

          <div className="flex items-center gap-6 w-full md:w-auto">
             <div className="text-right hidden md:block">
                 <p className="text-xs text-gray-500 uppercase font-semibold">Total Monthly Premium</p>
                 <p className="text-2xl font-bold text-gray-900">{formatCurrencyWithDecimals(totalPremium)}</p>
             </div>
             
             <button className="flex-1 md:flex-none bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-bold shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02]">
                <div className="flex flex-col items-start md:hidden leading-none mr-2">
                    <span className="text-[10px] opacity-80 font-normal">TOTAL</span>
                    <span className="text-lg font-bold">{formatCurrencyWithDecimals(totalPremium)}</span>
                </div>
                <span>APPLY NOW</span>
                <ArrowRight size={20} />
             </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default App;