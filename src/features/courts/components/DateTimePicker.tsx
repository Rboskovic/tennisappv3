// src/features/courts/components/DateTimePicker.tsx
import React, { useState } from 'react';
import { Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../../shared/utils/cn';
import dayjs from 'dayjs';

interface DateTimePickerProps {
  selectedDate?: string;
  selectedTime?: string;
  onDateSelect: (date: string) => void;
  onTimeSelect: (time: string) => void;
  availableTimeSlots?: string[];
  className?: string;
}

export function DateTimePicker({
  selectedDate,
  selectedTime,
  onDateSelect,
  onTimeSelect,
  availableTimeSlots = [
    "08:00", "09:00", "10:00", "11:00", "12:00", "13:00",
    "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"
  ],
  className
}: DateTimePickerProps) {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [showTimeSlots, setShowTimeSlots] = useState(!!selectedDate);

  // Generate next 14 days for date selection
  const generateDates = () => {
    const dates = [];
    for (let i = 0; i < 14; i++) {
      dates.push(dayjs().add(i, 'day'));
    }
    return dates;
  };

  const dates = generateDates();

  const handleDateClick = (date: dayjs.Dayjs) => {
    const dateString = date.format('YYYY-MM-DD');
    onDateSelect(dateString);
    setShowTimeSlots(true);
  };

  const handleTimeClick = (time: string) => {
    onTimeSelect(time);
  };

  const formatDateDisplay = (date: dayjs.Dayjs) => {
    if (date.isSame(dayjs(), 'day')) return 'Danas';
    if (date.isSame(dayjs().add(1, 'day'), 'day')) return 'Sutra';
    return date.format('MMM DD');
  };

  const formatDayDisplay = (date: dayjs.Dayjs) => {
    return date.format('ddd').toUpperCase();
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Date Selection */}
      <div>
        <div className="flex items-center mb-4">
          <Calendar className="w-5 h-5 text-gray-600 mr-2" />
          <h3 className="font-semibold text-gray-900">Izaberite datum</h3>
        </div>

        <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
          {dates.map((date) => {
            const dateString = date.format('YYYY-MM-DD');
            const isSelected = selectedDate === dateString;
            const isToday = date.isSame(dayjs(), 'day');
            
            return (
              <button
                key={dateString}
                onClick={() => handleDateClick(date)}
                className={cn(
                  "flex-shrink-0 flex flex-col items-center justify-center w-16 h-20 rounded-xl border-2 transition-all",
                  "hover:border-primary-300",
                  isSelected
                    ? "border-primary-500 bg-primary-50 text-primary-700"
                    : "border-gray-200 text-gray-700 hover:bg-gray-50"
                )}
              >
                <div className="text-xs font-medium mb-1">
                  {formatDayDisplay(date)}
                </div>
                <div className={cn(
                  "text-lg font-bold",
                  isToday && !isSelected && "text-primary-600"
                )}>
                  {date.date()}
                </div>
                <div className="text-xs">
                  {formatDateDisplay(date)}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Selection */}
      {showTimeSlots && (
        <div>
          <div className="flex items-center mb-4">
            <Clock className="w-5 h-5 text-gray-600 mr-2" />
            <h3 className="font-semibold text-gray-900">Izaberite vreme</h3>
            {selectedDate && (
              <span className="ml-2 text-sm text-gray-500">
                {dayjs(selectedDate).format('DD. MMM YYYY')}
              </span>
            )}
          </div>

          <div className="grid grid-cols-4 gap-3">
            {availableTimeSlots.map((time) => {
              const isSelected = selectedTime === time;
              const isPastTime = selectedDate === dayjs().format('YYYY-MM-DD') && 
                dayjs(`${selectedDate} ${time}`).isBefore(dayjs());
              
              return (
                <button
                  key={time}
                  onClick={() => !isPastTime && handleTimeClick(time)}
                  disabled={isPastTime}
                  className={cn(
                    "py-3 px-2 rounded-lg border-2 text-sm font-medium transition-all",
                    "hover:border-primary-300 disabled:opacity-50 disabled:cursor-not-allowed",
                    isSelected
                      ? "border-primary-500 bg-primary-500 text-white"
                      : isPastTime
                      ? "border-gray-200 text-gray-400 bg-gray-100"
                      : "border-gray-200 text-gray-700 hover:bg-gray-50"
                  )}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Selected datetime summary */}
      {selectedDate && selectedTime && (
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-primary-900">
                Izabrano vreme
              </div>
              <div className="text-primary-700">
                {dayjs(selectedDate).format('dddd, DD. MMMM YYYY')} u {selectedTime}
              </div>
            </div>
            <div className="text-2xl">
              🎾
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
