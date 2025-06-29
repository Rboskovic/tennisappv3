import React from 'react';
import { cn } from '../../utils/cn';

interface DurationSelectorProps {
  duration: number;
  onDurationChange: (duration: number) => void;
  pricePerHour: number;
}

export function DurationSelector({ duration, onDurationChange, pricePerHour }: DurationSelectorProps) {
  const durations = [
    { value: 0.5, label: '30 min', suffix: 'kratka sesija' },
    { value: 1, label: '1 sat', suffix: 'standardno' },
    { value: 1.5, label: '1.5 sata', suffix: 'prošireno' },
    { value: 2, label: '2 sata', suffix: 'dugotrajno' },
  ];

  return (
    <div className="space-y-3">
      {durations.map((option) => (
        <button
          key={option.value}
          onClick={() => onDurationChange(option.value)}
          className={cn(
            'w-full p-4 rounded-lg border text-left transition-colors',
            duration === option.value
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
          )}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">{option.label}</div>
              <div className="text-sm text-gray-500">{option.suffix}</div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-gray-900">
                {Math.round(pricePerHour * option.value)} RSD
              </div>
              <div className="text-sm text-gray-500">ukupno</div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
