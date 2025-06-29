import { create } from 'zustand';

export interface Player {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  skillLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  winRate: number;
  totalMatches: number;
  preferredClubs: string[];
  availability: string[];
  bio?: string;
  isOnline: boolean;
  lastActive: string;
}

export interface Club {
  id: string;
  name: string;
  location: string;
  courts: number;
  rating: number;
}

interface MatchState {
  players: Player[];
  clubs: Club[];
  preferences: any;
  bookingLoading: boolean;
  bookingError: string | null;
  bookedMatch: any;
  setPreferences: (prefs: any) => void;
  bookMatch: (data: any) => Promise<void>;
  resetBooking: () => void;
}

export const useMatchStore = create<MatchState>((set) => ({
  players: [],
  clubs: [
    {
      id: 'baseline-club',
      name: 'Baseline Club',
      location: 'Novi Beograd',
      courts: 6,
      rating: 4.8,
    },
    {
      id: 'tennis-center',
      name: 'Tennis Center',
      location: 'Zemun',
      courts: 4,
      rating: 4.5,
    },
  ],
  preferences: null,
  bookingLoading: false,
  bookingError: null,
  bookedMatch: null,
  setPreferences: (prefs) => set({ preferences: prefs }),
  bookMatch: async (data) => {
    set({ bookingLoading: true, bookingError: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ bookedMatch: data });
    } catch (error) {
      set({ bookingError: 'Failed to book match' });
    } finally {
      set({ bookingLoading: false });
    }
  },
  resetBooking: () => set({ bookedMatch: null, bookingError: null }),
}));
