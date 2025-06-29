import React from 'react';
import { Calendar, Clock, Plus } from 'lucide-react';
import { Button } from '../../../../shared/components/ui';
import { cn } from '../../../../shared/utils/cn';
import { formatDateDisplay } from '../../../../shared/utils/dateTime';

interface DateTimeDisplayProps {
  selectedDate?: string;
  selectedTime?: string;
  onOpenPicker: () => void;
  placeholder?: string;
  className?: string;
}

export function DateTimeDisplay({
  selectedDate,
  selectedTime,
  onOpenPicker,
  placeholder = 'Izaberite datum i vreme',
  className,
}: DateTimeDisplayProps): JSX.Element {
  const hasSelection = selectedDate || selectedTime;

  return (
    <div className={cn('space-y-3', className)}>
      {/* Main Display Button */}
      <Button
        variant="outline"
        onClick={onOpenPicker}
        className={cn(
          'w-full justify-start text-left h-auto p-4',
          !hasSelection && 'text-gray-500'
        )}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            <Clock className="w-5 h-5" />
          </div>
          
          <div className="flex-1">
            {hasSelection ? (
              <div>
                <div className="font-medium text-gray-900">
                  {selectedDate && formatDateDisplay(selectedDate)}
                </div>
                {selectedTime && (
                  <div className="text-sm text-gray-600">
                    u {selectedTime}h
                  </div>
                )}
              </div>
            ) : (
              <span>{placeholder}</span>
            )}
          </div>
          
          <Plus className="w-5 h-5 text-gray-400" />
        </div>
      </Button>

      {/* Quick Actions (optional) */}
      {!hasSelection && (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              // Quick select today + next available time
              const today = new Date().toISOString().split('T')[0];
              onOpenPicker();
            }}
            className="text-xs"
          >
            <Calendar className="w-3 h-3 mr-1" />
            Danas
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              // Quick select tomorrow
              const tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              const tomorrowStr = tomorrow.toISOString().split('T')[0];
              onOpenPicker();
            }}
            className="text-xs"
          >
            <Calendar className="w-3 h-3 mr-1" />
            Sutra
          </Button>
        </div>
      )}
    </div>
  );
}
