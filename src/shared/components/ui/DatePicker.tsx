import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';
import { dayjs, serbianMonths, serbianWeekdaysShort } from '../../utils/dateConfig';

interface DatePickerProps {
  selected?: string;
  onSelect: (date: string) => void;
  minDate?: string;
  maxDate?: string;
  disabled?: boolean;
}

export function DatePicker({ selected, onSelect, minDate, maxDate, disabled }: DatePickerProps) {
  const [currentMonth, setCurrentMonth] = useState(dayjs(selected || undefined));
  
  const today = dayjs();
  const startOfMonth = currentMonth.startOf('month');
  const endOfMonth = currentMonth.endOf('month');
  const startDate = startOfMonth.startOf('week').add(1, 'day'); // Start from Monday
  const endDate = endOfMonth.endOf('week').add(1, 'day');

  const weeks = [];
  let day = startDate;
  
  while (day.isBefore(endDate, 'day') || day.isSame(endDate, 'day')) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      week.push(day);
      day = day.add(1, 'day');
    }
    weeks.push(week);
  }

  const isDateDisabled = (date: dayjs.Dayjs) => {
    if (disabled) return true;
    if (date.isBefore(today, 'day')) return true;
    if (minDate && date.isBefore(dayjs(minDate), 'day')) return true;
    if (maxDate && date.isAfter(dayjs(maxDate), 'day')) return true;
    return false;
  };

  const isDateSelected = (date: dayjs.Dayjs) => {
    return selected && date.isSame(dayjs(selected), 'day');
  };

  const handleDateClick = (date: dayjs.Dayjs) => {
    if (!isDateDisabled(date)) {
      onSelect(date.format('YYYY-MM-DD'));
    }
  };

  const nextMonth = () => setCurrentMonth(currentMonth.add(1, 'month'));
  const prevMonth = () => setCurrentMonth(currentMonth.subtract(1, 'month'));

  const canGoPrev = !minDate || currentMonth.startOf('month').isAfter(dayjs(minDate).startOf('month'));
  const canGoNext = !maxDate || currentMonth.endOf('month').isBefore(dayjs(maxDate).endOf('month'));

  return (
    <div className={cn('bg-white rounded-lg border border-gray-200 p-4', disabled && 'opacity-50')}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          disabled={!canGoPrev || disabled}
          className="p-1 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="font-semibold text-gray-900">
          {serbianMonths[currentMonth.month()]} {currentMonth.year()}
        </h2>
        <button
          onClick={nextMonth}
          disabled={!canGoNext || disabled}
          className="p-1 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Week days */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {serbianWeekdaysShort.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-500 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {weeks.flat().map((date, index) => {
          const isDisabled = isDateDisabled(date);
          const isSelected = isDateSelected(date);
          const isCurrentMonth = date.month() === currentMonth.month();
          const isToday = date.isSame(today, 'day');

          return (
            <button
              key={index}
              onClick={() => handleDateClick(date)}
              disabled={isDisabled}
              className={cn(
                'w-10 h-10 text-sm rounded-lg transition-colors',
                {
                  'text-gray-300': !isCurrentMonth,
                  'text-gray-900': isCurrentMonth && !isSelected && !isDisabled,
                  'bg-blue-600 text-white': isSelected,
                  'bg-blue-100 text-blue-600': isToday && !isSelected,
                  'text-gray-400 cursor-not-allowed': isDisabled,
                  'hover:bg-gray-100': !isDisabled && !isSelected && isCurrentMonth,
                }
              )}
            >
              {date.date()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
