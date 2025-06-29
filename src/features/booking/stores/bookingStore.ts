import { create } from 'zustand';
import type { Club, Booking, BookingRequest, BookingFilters } from '../types';

interface BookingState {
  // Selected values
  selectedClubs: string[];
  selectedDate: string | null;
  selectedTime: string | null;
  selectedDuration: number;
  
  // Data
  clubs: Club[];
  availableTimeSlots: string[];
  userBookings: Booking[];
  
  // UI state
  isLoading: boolean;
  isClubSelectorOpen: boolean;
  isDatePickerOpen: boolean;
  
  // Actions
  actions: {
    setSelectedClubs: (clubs: string[]) => void;
    toggleClub: (clubId: string) => void;
    setSelectedDate: (date: string | null) => void;
    setSelectedTime: (time: string | null) => void;
    setSelectedDuration: (duration: number) => void;
    setClubSelectorOpen: (open: boolean) => void;
    setDatePickerOpen: (open: boolean) => void;
    searchAvailableCourts: (filters: BookingFilters) => Promise<Club[]>;
    createBooking: (request: BookingRequest) => Promise<Booking>;
    fetchUserBookings: () => Promise<void>;
    cancelBooking: (bookingId: string) => Promise<void>;
    reset: () => void;
  };
}

const initialState = {
  selectedClubs: ['baseline'],
  selectedDate: null,
  selectedTime: null,
  selectedDuration: 60,
  clubs: [],
  availableTimeSlots: [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00'
  ],
  userBookings: [],
  isLoading: false,
  isClubSelectorOpen: false,
  isDatePickerOpen: false,
};

export const useBookingStore = create<BookingState>((set, get) => ({
  ...initialState,
  
  actions: {
    setSelectedClubs: (clubs) => set({ selectedClubs: clubs }),
    
    toggleClub: (clubId) => set((state) => ({
      selectedClubs: state.selectedClubs.includes(clubId)
        ? state.selectedClubs.filter(id => id !== clubId)
        : [...state.selectedClubs, clubId]
    })),
    
    setSelectedDate: (date) => set({ selectedDate: date }),
    setSelectedTime: (time) => set({ selectedTime: time }),
    setSelectedDuration: (duration) => set({ selectedDuration: duration }),
    setClubSelectorOpen: (open) => set({ isClubSelectorOpen: open }),
    setDatePickerOpen: (open) => set({ isDatePickerOpen: open }),
    
    searchAvailableCourts: async (filters) => {
      set({ isLoading: true });
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data - in real app this would be an API call
        const mockClubs: Club[] = [
          {
            id: 'baseline',
            name: 'Baseline',
            distance: 2.3,
            courts: { available: 2, indoor: 3, outdoor: 2, total: 5 }
          },
          {
            id: 'gemax',
            name: 'Gemax',
            distance: 3.1,
            courts: { available: 1, indoor: 4, outdoor: 2, total: 6 }
          }
        ];
        
        set({ clubs: mockClubs });
        return mockClubs;
      } finally {
        set({ isLoading: false });
      }
    },
    
    createBooking: async (request) => {
      set({ isLoading: true });
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const booking: Booking = {
          ...request,
          id: `booking_${Date.now()}`,
          userId: 'user_123',
          status: 'confirmed',
          totalPrice: request.duration === 60 ? 2000 : 3500, // RSD
          createdAt: new Date().toISOString(),
        };
        
        set(state => ({
          userBookings: [...state.userBookings, booking]
        }));
        
        return booking;
      } finally {
        set({ isLoading: false });
      }
    },
    
    fetchUserBookings: async () => {
      set({ isLoading: true });
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock user bookings
        const mockBookings: Booking[] = [];
        set({ userBookings: mockBookings });
      } finally {
        set({ isLoading: false });
      }
    },
    
    cancelBooking: async (bookingId) => {
      set({ isLoading: true });
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        set(state => ({
          userBookings: state.userBookings.map(booking =>
            booking.id === bookingId
              ? { ...booking, status: 'cancelled' }
              : booking
          )
        }));
      } finally {
        set({ isLoading: false });
      }
    },
    
    reset: () => set(initialState),
  },
}));

// Selectors for easy access
export const useBookingActions = () => useBookingStore(state => state.actions);
export const useBookingSelection = () => useBookingStore(state => ({
  selectedClubs: state.selectedClubs,
  selectedDate: state.selectedDate,
  selectedTime: state.selectedTime,
  selectedDuration: state.selectedDuration,
}));
export const useBookingUI = () => useBookingStore(state => ({
  isLoading: state.isLoading,
  isClubSelectorOpen: state.isClubSelectorOpen,
  isDatePickerOpen: state.isDatePickerOpen,
}));
