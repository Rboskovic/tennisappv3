import { create } from 'zustand';
import { BookingData, BookingStep, Club, TimeSlot, Court } from '../types';

interface BookingStore {
  // Current booking data
  bookingData: BookingData;
  
  // Wizard steps
  currentStep: number;
  steps: BookingStep[];
  
  // Actions
  setClub: (club: Club) => void;
  setDateTime: (date: string, timeSlot: TimeSlot) => void;
  setCourt: (court: Court) => void;
  setDuration: (duration: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  resetBooking: () => void;
  calculateTotalPrice: () => void;
}

const initialSteps: BookingStep[] = [
  { id: 'club', title: 'Izaberi klub', isComplete: false },
  { id: 'datetime', title: 'Datum i vreme', isComplete: false },
  { id: 'confirmation', title: 'Potvrda', isComplete: false },
];

export const useBookingStore = create<BookingStore>((set, get) => ({
  bookingData: {
    duration: 1,
    totalPrice: 0,
  },
  currentStep: 0,
  steps: initialSteps,

  setClub: (club) => {
    set((state) => ({
      bookingData: { ...state.bookingData, club },
      steps: state.steps.map((step, index) => 
        index === 0 ? { ...step, isComplete: true } : step
      ),
    }));
    get().calculateTotalPrice();
  },

  setDateTime: (date, timeSlot) => {
    set((state) => ({
      bookingData: { ...state.bookingData, date, timeSlot },
      steps: state.steps.map((step, index) => 
        index === 1 ? { ...step, isComplete: true } : step
      ),
    }));
    get().calculateTotalPrice();
  },

  setCourt: (court) => {
    set((state) => ({
      bookingData: { ...state.bookingData, court },
    }));
    get().calculateTotalPrice();
  },

  setDuration: (duration) => {
    set((state) => ({
      bookingData: { ...state.bookingData, duration },
    }));
    get().calculateTotalPrice();
  },

  nextStep: () => {
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, state.steps.length - 1),
    }));
  },

  prevStep: () => {
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 0),
    }));
  },

  goToStep: (step) => {
    set({ currentStep: step });
  },

  resetBooking: () => {
    set({
      bookingData: { duration: 1, totalPrice: 0 },
      currentStep: 0,
      steps: initialSteps.map(step => ({ ...step, isComplete: false })),
    });
  },

  calculateTotalPrice: () => {
    const { bookingData } = get();
    if (bookingData.club && bookingData.timeSlot) {
      const basePrice = bookingData.timeSlot.price;
      const totalPrice = basePrice * bookingData.duration;
      set((state) => ({
        bookingData: { ...state.bookingData, totalPrice },
      }));
    }
  },
}));
