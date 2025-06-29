import React from 'react';
import { cn } from '../../utils/cn';

interface TimeSlot {
  id: string;
  time: string;
  isAvailable: boolean;
  price: number;
}

interface TimeSlotsProps {
  timeSlots: TimeSlot[];
  selected?: string;
  onSelect: (timeSlot: TimeSlot) => void;
}

export function TimeSlots({ timeSlots, selected, onSelect }: TimeSlotsProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {timeSlots.map((slot) => (
        <button
          key={slot.id}
          onClick={() => slot.isAvailable && onSelect(slot)}
          disabled={!slot.isAvailable}
          className={cn(
            'p-3 rounded-lg border text-center transition-colors',
            {
              'border-blue-500 bg-blue-50 text-blue-700': selected === slot.id,
              'border-gray-200 hover:border-gray-300 hover:bg-gray-50': 
                selected !== slot.id && slot.isAvailable,
              'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed': 
                !slot.isAvailable,
            }
          )}
        >
          <div className="font-medium text-sm">{slot.time}</div>
          <div className="text-xs text-gray-500 mt-1">
            {slot.isAvailable ? `${slot.price} RSD` : 'Zauzeto'}
          </div>
        </button>
      ))}
    </div>
  );
}
