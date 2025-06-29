import { useState, useCallback } from 'react';

interface UseDateTimeSelectionReturn {
  selectedDate: string | null;
  selectedTime: string | null;
  isPickerOpen: boolean;
  
  setSelectedDate: (date: string | null) => void;
  setSelectedTime: (time: string | null) => void;
  setDateTime: (date: string, time: string) => void;
  openPicker: () => void;
  closePicker: () => void;
  reset: () => void;
}

export function useDateTimeSelection(
  initialDate?: string,
  initialTime?: string
): UseDateTimeSelectionReturn {
  const [selectedDate, setSelectedDate] = useState<string | null>(initialDate || null);
  const [selectedTime, setSelectedTime] = useState<string | null>(initialTime || null);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const setDateTime = useCallback((date: string, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
  }, []);

  const openPicker = useCallback(() => {
    setIsPickerOpen(true);
  }, []);

  const closePicker = useCallback(() => {
    setIsPickerOpen(false);
  }, []);

  const reset = useCallback(() => {
    setSelectedDate(initialDate || null);
    setSelectedTime(initialTime || null);
    setIsPickerOpen(false);
  }, [initialDate, initialTime]);

  return {
    selectedDate,
    selectedTime,
    isPickerOpen,
    setSelectedDate,
    setSelectedTime,
    setDateTime,
    openPicker,
    closePicker,
    reset,
  };
}
