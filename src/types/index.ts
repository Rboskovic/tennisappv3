export interface Club {
  id: string;
  name: string;
  logo: string;
  distance: number;
  address: string;
  courts: {
    available: number;
    indoor: number;
    outdoor: number;
    total: number;
  };
  surfaces: string[];
  amenities: string[];
  prices: {
    weekday: { singles: number; doubles: number };
    weekend: { singles: number; doubles: number };
  };
  rating: number;
  reviews: number;
}

export interface Notification {
  id: string;
  type: 'match-result' | 'confirmed' | 'info';
  title: string;
  message: string;
  time: string;
  actionText: string;
}
