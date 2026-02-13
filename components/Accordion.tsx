import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AccordionProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
  count?: number;
}

const Accordion: React.FC<AccordionProps> = ({ title, defaultOpen = true, children, count }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center gap-2">
            <h2 className="font-bold text-gray-800 text-sm md:text-base">{title}</h2>
            {count !== undefined && count > 0 && (
                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full">
                    {count} Selected
                </span>
            )}
        </div>
        {isOpen ? <ChevronUp className="text-gray-500" size={20} /> : <ChevronDown className="text-gray-500" size={20} />}
      </button>
      
      {isOpen && (
        <div className="p-4 md:p-6 border-t border-gray-100 animate-in slide-in-from-top-2 duration-200">
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;