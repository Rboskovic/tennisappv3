import { dayjs } from './dateConfig';

export interface ValidationError {
  field: string;
  message: string;
}

export const validateBookingData = (data: any): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!data.club) {
    errors.push({ field: 'club', message: 'Morate izabrati klub' });
  }

  if (!data.date) {
    errors.push({ field: 'date', message: 'Morate izabrati datum' });
  } else {
    const selectedDate = dayjs(data.date);
    const today = dayjs();
    const maxDate = today.add(30, 'day');

    if (selectedDate.isBefore(today, 'day')) {
      errors.push({ field: 'date', message: 'Ne možete rezervisati u prošlosti' });
    }

    if (selectedDate.isAfter(maxDate, 'day')) {
      errors.push({ field: 'date', message: 'Možete rezervisati maksimalno 30 dana unapred' });
    }
  }

  if (!data.timeSlot) {
    errors.push({ field: 'timeSlot', message: 'Morate izabrati vreme' });
  }

  if (!data.court) {
    errors.push({ field: 'court', message: 'Morate izabrati teren' });
  }

  if (!data.duration || data.duration <= 0) {
    errors.push({ field: 'duration', message: 'Morate izabrati trajanje' });
  }

  return errors;
};

export const validateStep = (step: number, data: any): ValidationError[] => {
  switch (step) {
    case 0: // Club selection
      return data.club ? [] : [{ field: 'club', message: 'Izaberite klub' }];
    
    case 1: // Date/time selection
      const errors: ValidationError[] = [];
      if (!data.date) errors.push({ field: 'date', message: 'Izaberite datum' });
      if (!data.timeSlot) errors.push({ field: 'timeSlot', message: 'Izaberite vreme' });
      return errors;
    
    case 2: // Confirmation
      return validateBookingData(data);
    
    default:
      return [];
  }
};
