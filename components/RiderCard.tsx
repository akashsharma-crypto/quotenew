import React, { useState, useEffect } from 'react';
import { Info, Check, ShieldCheck } from 'lucide-react';
import { Rider, RiderUpdateHandler } from '../types';
import { formatCurrency, calculateRiderPremium, formatCurrencyWithDecimals } from '../utils';

interface RiderCardProps {
  rider: Rider;
  onUpdate: RiderUpdateHandler;
}

const RiderCard: React.FC<RiderCardProps> = ({ rider, onUpdate }) => {
  const [localCover, setLocalCover] = useState(rider.coverAmount);
  
  // Update local state when prop changes (e.g., reset)
  useEffect(() => {
    setLocalCover(rider.coverAmount);
  }, [rider.coverAmount]);

  const premium = calculateRiderPremium(localCover, rider.ratePerThousand);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = parseInt(e.target.value);
    setLocalCover(newVal);
    onUpdate(rider.id, { coverAmount: newVal });
  };

  const handleSelection = () => {
    onUpdate(rider.id, { isSelected: !rider.isSelected });
  };

  // Calculate percentage for slider background gradient
  const progressPercent = ((localCover - rider.minCover) / (rider.maxCover - rider.minCover)) * 100;

  return (
    <div 
      className={`relative p-5 md:p-6 rounded-xl border transition-all duration-200 ${
        rider.isSelected 
          ? 'bg-blue-50/50 border-blue-200 shadow-sm' 
          : 'bg-white border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex flex-col md:flex-row gap-6">
        
        {/* Left Column: Checkbox & Basic Info */}
        <div className="flex gap-4 md:w-1/3">
          <div className="pt-1">
            <button
              onClick={handleSelection}
              className={`w-6 h-6 rounded border flex items-center justify-center transition-all ${
                rider.isSelected
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'bg-white border-gray-300 text-transparent hover:border-blue-400'
              }`}
            >
              <Check size={14} strokeWidth={3} />
            </button>
          </div>
          <div>
            <div className="flex items-center gap-2">
                <ShieldCheck className={`w-4 h-4 ${rider.isSelected ? 'text-blue-600' : 'text-gray-400'}`} />
                <h3 className={`font-semibold text-base ${rider.isSelected ? 'text-gray-900' : 'text-gray-700'}`}>
                {rider.name}
                </h3>
                <Info size={14} className="text-gray-400 cursor-help" />
            </div>
            {rider.description && (
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    {rider.description}
                </p>
            )}
            <div className="mt-3 md:hidden">
                {/* Mobile only price display */}
                {rider.isSelected ? (
                     <div className="text-blue-600 font-bold">
                        +{formatCurrencyWithDecimals(premium)} <span className="text-xs font-normal text-gray-500">/mo</span>
                     </div>
                ) : (
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">Not Selected</span>
                )}
            </div>
          </div>
        </div>

        {/* Middle Column: Interactive Controls */}
        <div className={`md:w-1/2 flex flex-col justify-center transition-opacity duration-200 ${rider.isSelected ? 'opacity-100' : 'opacity-40 pointer-events-none grayscale'}`}>
          <div className="flex justify-between items-end mb-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Cover Amount</label>
            <div className="flex items-baseline gap-1 bg-white border border-gray-200 rounded px-2 py-1 shadow-sm">
                <span className="text-gray-400 text-xs">AED</span>
                <input 
                    type="number"
                    min={rider.minCover}
                    max={rider.maxCover}
                    value={localCover}
                    onChange={(e) => {
                        const val = Math.max(rider.minCover, Math.min(rider.maxCover, parseInt(e.target.value) || 0));
                        setLocalCover(val);
                        onUpdate(rider.id, { coverAmount: val });
                    }}
                    className="w-24 text-right font-bold text-gray-800 text-sm focus:outline-none focus:text-blue-600"
                />
            </div>
          </div>
          
          <div className="relative h-6 flex items-center">
             {/* Custom Slider Track Background */}
             <div className="absolute w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-blue-500 transition-all duration-75 ease-out"
                    style={{ width: `${progressPercent}%` }}
                ></div>
             </div>
             
            <input
              type="range"
              min={rider.minCover}
              max={rider.maxCover}
              step={rider.step}
              value={localCover}
              onChange={handleSliderChange}
              className="absolute w-full h-full opacity-0 cursor-pointer z-10"
            />
            
            {/* Visual Thumb for styling purposes (optional, since input range is styled in CSS, but this adds specific design control) */}
            <div 
                className="absolute h-4 w-4 bg-white border-2 border-blue-500 rounded-full shadow pointer-events-none transition-all duration-75 ease-out"
                style={{ left: `calc(${progressPercent}% - 8px)` }}
            ></div>
          </div>

          <div className="flex justify-between text-[10px] text-gray-400 font-medium mt-1">
            <span>{formatCurrency(rider.minCover)}</span>
            <span>{formatCurrency(rider.maxCover)}</span>
          </div>
        </div>

        {/* Right Column: Term & Price */}
        <div className="hidden md:flex flex-col justify-between items-end md:w-1/6 text-right border-l border-gray-100 pl-6">
            <div>
                <span className="block text-[10px] text-gray-400 uppercase font-semibold">Policy Term</span>
                <span className="text-sm font-medium text-gray-700">{rider.termYears} Years</span>
            </div>

            <div className="mt-auto">
                {rider.isSelected ? (
                    <div>
                        <span className="block text-[10px] text-gray-400 uppercase font-semibold mb-1">Premium</span>
                        <div className="text-lg font-bold text-blue-600 leading-none">
                            {formatCurrencyWithDecimals(premium)}
                        </div>
                        <span className="text-[10px] text-gray-500">monthly</span>
                    </div>
                ) : (
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-wide mt-auto block pb-1">Optional</span>
                )}
            </div>
        </div>

      </div>
    </div>
  );
};

export default RiderCard;