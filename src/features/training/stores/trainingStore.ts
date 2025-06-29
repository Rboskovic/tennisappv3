import { create } from 'zustand';

export interface Trainer {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  experience: number;
  specialties: string[];
  certifications: string[];
  languages: string[];
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  availability: Record<string, { start: string; end: string; available: boolean }>;
  location: string;
  clubs: string[];
  isOnline: boolean;
  responseTime: string;
  cancellationPolicy: string;
  reviews: any[];
}

interface TrainingState {
  trainers: Trainer[];
  selectedTrainer: Trainer | null;
  selectedDate: string | null;
  selectedTime: string | null;
  sessionType: 'individual' | 'group' | 'assessment' | 'match-play';
  sessionDuration: number;
  sessionFocus: string[];
  bookingLoading: boolean;
  bookingError: string | null;
  setSelectedTrainer: (trainer: Trainer | null) => void;
  setSelectedDate: (date: string | null) => void;
  setSelectedTime: (time: string | null) => void;
  setSessionType: (type: 'individual' | 'group' | 'assessment' | 'match-play') => void;
  setSessionDuration: (duration: number) => void;
  setSessionFocus: (focus: string[]) => void;
  bookSession: (data: any) => Promise<void>;
  clearError: () => void;
}

export const useTrainingStore = create<TrainingState>((set, get) => ({
  trainers: [],
  selectedTrainer: null,
  selectedDate: null,
  selectedTime: null,
  sessionType: 'individual',
  sessionDuration: 1,
  sessionFocus: [],
  bookingLoading: false,
  bookingError: null,
  setSelectedTrainer: (trainer) => set({ selectedTrainer: trainer }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setSelectedTime: (time) => set({ selectedTime: time }),
  setSessionType: (type) => set({ sessionType: type }),
  setSessionDuration: (duration) => set({ sessionDuration: duration }),
  setSessionFocus: (focus) => set({ sessionFocus: focus }),
  bookSession: async (data) => {
    set({ bookingLoading: true, bookingError: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Booking training session:', data);
    } catch (error) {
      set({ bookingError: 'Failed to book training session' });
    } finally {
      set({ bookingLoading: false });
    }
  },
  clearError: () => set({ bookingError: null }),
}));
