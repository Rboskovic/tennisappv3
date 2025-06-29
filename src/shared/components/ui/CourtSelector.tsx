import React from 'react';
import { cn } from '../../utils/cn';

interface Court {
  id: string;
  number: number;
  surface: 'hard' | 'clay' | 'grass';
  isIndoor: boolean;
  isAvailable: boolean;
}

interface CourtSelectorProps {
  courts: Court[];
  selected?: string;
  onSelect: (court: Court) => void;
}

export function CourtSelector({ courts, selected, onSelect }: CourtSelectorProps) {
  const getSurfaceColor = (surface: string) => {
    switch (surface) {
      case 'hard': return 'bg-blue-100 text-blue-700';
      case 'clay': return 'bg-orange-100 text-orange-700';
      case 'grass': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      {courts.map((court) => (
        <button
          key={court.id}
          onClick={() => court.isAvailable && onSelect(court)}
          disabled={!court.isAvailable}
          className={cn(
            'p-4 rounded-lg border text-left transition-colors',
            {
              'border-blue-500 bg-blue-50': selected === court.id,
              'border-gray-200 hover:border-gray-300 hover:bg-gray-50': 
                selected !== court.id && court.isAvailable,
              'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed': 
                !court.isAvailable,
            }
          )}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Teren {court.number}</span>
            <span className={cn('px-2 py-1 rounded text-xs font-medium', getSurfaceColor(court.surface))}>
              {court.surface.charAt(0).toUpperCase() + court.surface.slice(1)}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className={cn('w-2 h-2 rounded-full mr-2', court.isIndoor ? 'bg-blue-500' : 'bg-yellow-500')} />
            {court.isIndoor ? 'Zatvoreni' : 'Otvoreni'}
          </div>
          {!court.isAvailable && (
            <div className="text-xs text-red-500 mt-1">Zauzet</div>
          )}
        </button>
      ))}
    </div>
  );
}
