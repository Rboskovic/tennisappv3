export interface Club {
  id: string;
  name: string;
  logo?: string;
  distance: number;
  courts: {
    available: number;
    indoor: number;
    outdoor: number;
    total: number;
  };
  type?: 'tennis' | 'padel';
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
  price: number;
}

export interface BookingRequest {
  clubId: string;
  date: string;
  timeSlot: string;
  duration: number; // minutes
  courtType?: 'indoor' | 'outdoor';
}

export interface Booking extends BookingRequest {
  id: string;
  userId: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  totalPrice: number;
  createdAt: string;
}

export interface BookingFilters {
  date?: string;
  minTime?: string;
  maxTime?: string;
  courtType?: 'indoor' | 'outdoor' | 'any';
  maxDistance?: number;
}
