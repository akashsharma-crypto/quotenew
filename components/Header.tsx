import React from 'react';
import { Pencil, FileText } from 'lucide-react';
import { BasePlan } from '../types';
import { formatCurrency } from '../utils';

interface HeaderProps {
  plan: BasePlan;
}

const Header: React.FC<HeaderProps> = ({ plan }) => {
  return (
    <div className="bg-white rounded-t-xl p-6 md:p-8 shadow-sm border-b border-gray-100">
      {/* Brand and Title */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex items-center gap-2">
          {/* Mock Logo */}
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            A
          </div>
          <div className="flex flex-col">
            <span className="text-blue-900 font-bold text-lg leading-tight">Alliance</span>
            <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">Insurance</span>
          </div>
        </div>
        <div className="h-8 w-px bg-gray-300 mx-2"></div>
        <h1 className="text-gray-900 font-bold text-lg md:text-xl">{plan.name}</h1>
      </div>

      {/* Base Plan Config Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {/* Life Cover */}
        <div className="group cursor-pointer">
          <p className="text-gray-500 text-sm mb-1">Life cover</p>
          <div className="flex items-center gap-2">
            <span className="text-blue-600 font-bold text-lg md:text-xl">
              {formatCurrency(plan.lifeCover)}
            </span>
            <Pencil className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
          </div>
          <div className="h-0.5 w-full bg-blue-100 mt-2 group-hover:bg-blue-200 transition-colors"></div>
        </div>

        {/* Policy Term */}
        <div className="group cursor-pointer">
          <p className="text-gray-500 text-sm mb-1">Policy term</p>
          <div className="flex items-center gap-2">
            <span className="text-blue-600 font-semibold text-lg">
              {plan.policyTerm} years
            </span>
            <Pencil className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
          </div>
          <div className="h-0.5 w-full bg-gray-200 mt-2 group-hover:bg-gray-300 transition-colors"></div>
        </div>

        {/* Payment Frequency */}
        <div className="group cursor-pointer">
          <p className="text-gray-500 text-sm mb-1">Payment frequency</p>
          <div className="flex items-center gap-2">
            <span className="text-blue-600 font-semibold text-lg">
              {plan.paymentFrequency}
            </span>
            <Pencil className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
          </div>
          <div className="h-0.5 w-full bg-gray-200 mt-2 group-hover:bg-gray-300 transition-colors"></div>
        </div>

        {/* Insurance Type */}
        <div className="text-right md:text-left">
          <p className="text-blue-500 text-sm mb-1 font-medium">Insurance Type</p>
          <div className="flex items-center gap-2 justify-end md:justify-start">
            <span className="text-gray-700 font-semibold text-lg">
              {plan.insuranceType}
            </span>
          </div>
          <div className="h-0.5 w-full bg-blue-300 border-dashed mt-2"></div>
        </div>
      </div>
    </div>
  );
};

export default Header;