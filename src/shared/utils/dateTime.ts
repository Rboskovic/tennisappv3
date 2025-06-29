import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export interface DateInfo {
  date: string; // YYYY-MM-DD format
  dayOfWeek: string;
  displayDate: string;
  isToday: boolean;
  isPast: boolean;
  isWeekend: boolean;
}

export interface TimeSlotInfo {
  time: string; // HH:mm format
  available: boolean;
  price?: number;
  isPeak?: boolean;
}

// Generate next 14 days for booking
export function generateAvailableDates(): DateInfo[] {
  const dates: DateInfo[] = [];
  const today = dayjs();
  
  for (let i = 0; i < 14; i++) {
    const date = today.add(i, 'day');
    const dateStr = date.format('YYYY-MM-DD');
    
    dates.push({
      date: dateStr,
      dayOfWeek: date.format('dddd'),
      displayDate: date.format('D MMM'),
      isToday: i === 0,
      isPast: false,
      isWeekend: date.day() === 0 || date.day() === 6,
    });
  }
  
  return dates;
}

// Generate time slots for a day
export function generateTimeSlots(date?: string): TimeSlotInfo[] {
  const slots: TimeSlotInfo[] = [];
  const selectedDate = dayjs(date);
  const now = dayjs();
  const isToday = selectedDate.isSame(now, 'day');
  
  // Generate slots from 8:00 to 22:00
  for (let hour = 8; hour <= 22; hour++) {
    const timeStr = `${hour.toString().padStart(2, '0')}:00`;
    const slotDateTime = selectedDate.hour(hour).minute(0);
    
    // Check if slot is in the past
    const isPast = isToday && slotDateTime.isBefore(now);
    
    // Mock availability (in real app, this would come from API)
    const isAvailable = !isPast && Math.random() > 0.3; // 70% availability
    
    // Peak hours (17:00-21:00) cost more
    const isPeak = hour >= 17 && hour <= 21;
    const basePrice = 2000; // RSD
    const price = isPeak ? basePrice * 1.5 : basePrice;
    
    slots.push({
      time: timeStr,
      available: isAvailable,
      price: Math.round(price),
      isPeak,
    });
  }
  
  return slots;
}

// Format date for display
export function formatDateDisplay(date: string): string {
  return dayjs(date).format('dddd, D MMMM YYYY');
}

// Format time for display
export function formatTimeDisplay(time: string): string {
  return dayjs(`2024-01-01 ${time}`).format('HH:mm');
}

// Check if date is today
export function isToday(date: string): boolean {
  return dayjs(date).isSame(dayjs(), 'day');
}

// Check if date is tomorrow
export function isTomorrow(date: string): boolean {
  return dayjs(date).isSame(dayjs().add(1, 'day'), 'day');
}
