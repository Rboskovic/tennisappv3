import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Check } from 'lucide-react';
import { Modal, Button, Card, Badge } from '../../../../shared/components/ui';
import { cn } from '../../../../shared/utils/cn';
import { 
  generateAvailableDates, 
  generateTimeSlots, 
  formatDateDisplay,
  isToday,
  isTomorrow,
  type DateInfo,
  type TimeSlotInfo
} from '../../../../shared/utils/dateTime';

interface DateTimePickerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate?: string;
  selectedTime?: string;
  onConfirm: (date: string, time: string) => void;
  mode?: 'date' | 'time' | 'datetime';
  title?: string;
}

export function DateTimePicker({
  isOpen,
  onClose,
  selectedDate,
  selectedTime,
  onConfirm,
  mode = 'datetime',
  title = 'Izaberite Datum i Vreme',
}: DateTimePickerProps): JSX.Element {
  const [currentView, setCurrentView] = useState<'date' | 'time'>(
    mode === 'time' ? 'time' : 'date'
  );
  const [tempDate, setTempDate] = useState<string>(selectedDate || '');
  const [tempTime, setTempTime] = useState<string>(selectedTime || '');
  
  const [availableDates] = useState<DateInfo[]>(() => generateAvailableDates());
  const [timeSlots, setTimeSlots] = useState<TimeSlotInfo[]>([]);

  // Generate time slots when date changes
  useEffect(() => {
    if (tempDate) {
      setTimeSlots(generateTimeSlots(tempDate));
    }
  }, [tempDate]);

  // Initialize with first available date if none selected
  useEffect(() => {
    if (isOpen && !tempDate && availableDates.length > 0) {
      setTempDate(availableDates[0].date);
    }
  }, [isOpen, tempDate, availableDates]);

  const handleDateSelect = (date: string) => {
    setTempDate(date);
    if (mode === 'date') {
      handleConfirm(date, tempTime);
    } else {
      setCurrentView('time');
    }
  };

  const handleTimeSelect = (time: string) => {
    setTempTime(time);
    if (mode === 'time') {
      handleConfirm(tempDate, time);
    }
  };

  const handleConfirm = (date?: string, time?: string) => {
    const finalDate = date || tempDate;
    const finalTime = time || tempTime;
    
    if (mode === 'datetime' && (!finalDate || !finalTime)) {
      return; // Both required for datetime mode
    }
    
    onConfirm(finalDate, finalTime);
    onClose();
  };

  const canConfirm = () => {
    if (mode === 'date') return !!tempDate;
    if (mode === 'time') return !!tempTime;
    return !!tempDate && !!tempTime;
  };

  const getDateLabel = (date: DateInfo) => {
    if (isToday(date.date)) return 'Danas';
    if (isTomorrow(date.date)) return 'Sutra';
    return date.dayOfWeek;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="large"
    >
      <div className="p-6">
        {/* Mode Navigation */}
        {mode === 'datetime' && (
          <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setCurrentView('date')}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md text-sm font-medium transition-colors',
                currentView === 'date'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              )}
            >
              <Calendar className="w-4 h-4" />
              Datum
            </button>
            <button
              onClick={() => setCurrentView('time')}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md text-sm font-medium transition-colors',
                currentView === 'time'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              )}
            >
              <Clock className="w-4 h-4" />
              Vreme
            </button>
          </div>
        )}

        {/* Selected Date/Time Display */}
        {(tempDate || tempTime) && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-1">Izabrano:</h4>
            <p className="text-blue-700">
              {tempDate && formatDateDisplay(tempDate)}
              {tempDate && tempTime && ' u '}
              {tempTime && `${tempTime}h`}
            </p>
          </div>
        )}

        {/* Date Selection */}
        {(currentView === 'date' || mode === 'date') && (
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900 mb-4">Izaberite Datum</h3>
            <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto">
              {availableDates.map((date) => (
                <DateCard
                  key={date.date}
                  date={date}
                  isSelected={tempDate === date.date}
                  onSelect={() => handleDateSelect(date.date)}
                  label={getDateLabel(date)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Time Selection */}
        {(currentView === 'time' || mode === 'time') && tempDate && (
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900 mb-4">Izaberite Vreme</h3>
            <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto">
              {timeSlots.map((slot) => (
                <TimeSlotCard
                  key={slot.time}
                  slot={slot}
                  isSelected={tempTime === slot.time}
                  onSelect={() => handleTimeSelect(slot.time)}
                />
              ))}
            </div>
            
            {timeSlots.filter(slot => slot.available).length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Clock className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Nema dostupnih termina za izabrani datum</p>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Otkaži
          </Button>
          <Button 
            onClick={() => handleConfirm()} 
            disabled={!canConfirm()}
            className="flex-1"
          >
            Potvrdi
          </Button>
        </div>
      </div>
    </Modal>
  );
}

interface DateCardProps {
  date: DateInfo;
  isSelected: boolean;
  onSelect: () => void;
  label: string;
}

function DateCard({ date, isSelected, onSelect, label }: DateCardProps): JSX.Element {
  return (
    <Card
      className={cn(
        'cursor-pointer transition-all duration-200 border-2',
        isSelected
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-200 hover:border-gray-300',
        date.isPast && 'opacity-50 cursor-not-allowed'
      )}
      padding="md"
      onClick={!date.isPast ? onSelect : undefined}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-900">{label}</span>
            {date.isToday && (
              <Badge variant="success" size="sm">Danas</Badge>
            )}
            {date.isWeekend && !date.isToday && (
              <Badge variant="warning" size="sm">Vikend</Badge>
            )}
          </div>
          <p className="text-sm text-gray-600 mt-1">{date.displayDate}</p>
        </div>
        
        {isSelected && (
          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
            <Check className="w-4 h-4 text-white" />
          </div>
        )}
      </div>
    </Card>
  );
}

interface TimeSlotCardProps {
  slot: TimeSlotInfo;
  isSelected: boolean;
  onSelect: () => void;
}

function TimeSlotCard({ slot, isSelected, onSelect }: TimeSlotCardProps): JSX.Element {
  if (!slot.available) {
    return (
      <div className="p-3 bg-gray-100 rounded-lg text-center border border-gray-200 opacity-50">
        <div className="text-sm font-medium text-gray-400">{slot.time}</div>
        <div className="text-xs text-gray-400 mt-1">Zauzeto</div>
      </div>
    );
  }

  return (
    <Card
      className={cn(
        'cursor-pointer transition-all duration-200 border-2 text-center',
        isSelected
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-200 hover:border-gray-300'
      )}
      padding="sm"
      onClick={onSelect}
    >
      <div className="text-sm font-medium text-gray-900">{slot.time}</div>
      <div className="text-xs text-gray-600 mt-1">
        {slot.price && `${slot.price} RSD`}
      </div>
      {slot.isPeak && (
        <Badge variant="warning" size="sm" className="mt-1">
          Špic
        </Badge>
      )}
      {isSelected && (
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
          <Check className="w-3 h-3 text-white" />
        </div>
      )}
    </Card>
  );
}
