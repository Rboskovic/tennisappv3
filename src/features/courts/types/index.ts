// src/features/courts/types/index.ts
export interface Club {
  id: string;
  name: string;
  location: string;
  image: string;
  courts: Court[];
  amenities: string[];
  pricePerHour: number;
  distance?: number;
}

export interface Court {
  id: string;
  number: number;
  type: "hard" | "clay" | "grass";
  isIndoor: boolean;
  isAvailable: boolean;
  pricePerHour: number;
}

export interface TimeSlot {
  time: string;
  isAvailable: boolean;
  price: number;
  court?: Court;
}

export interface BookingFormData {
  clubId: string;
  courtId?: string;
  date: string;
  time: string;
  duration: number; // in minutes
  type: "single" | "recurring";
  notes?: string;
}

export interface Booking {
  id: string;
  clubId: string;
  clubName: string;
  courtId: string;
  courtNumber: number;
  date: string;
  time: string;
  duration: number;
  totalPrice: number;
  status: "confirmed" | "pending" | "cancelled";
  userId: string;
  createdAt: string;
}

export interface CourtAvailability {
  clubId: string;
  date: string;
  timeSlots: TimeSlot[];
}

// Filter and search types
export interface CourtSearchFilters {
  clubs: string[];
  date?: string;
  timePreferences: string[];
  courtType?: "hard" | "clay" | "grass";
  isIndoor?: boolean;
  maxPrice?: number;
  duration: number;
}

export interface CourtSearchResult {
  club: Club;
  availableSlots: TimeSlot[];
  totalSlots: number;
}
