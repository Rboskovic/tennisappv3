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

export interface Player {
  id: string;
  name: string;
  image: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  rating: number;
  matches: number;
  wins: number;
  winRate: number;
  points: number;
}

export interface Trainer {
  id: string;
  name: string;
  image: string;
  rating: string;
  reviews: string;
  bio: string;
  specializations: string[];
  hourlyRate: number;
  availability: Record<string, boolean>;
}

export interface Tournament {
  id: string;
  name: string;
  status: 'open' | 'closed' | 'locked';
  participants: {
    current: number;
    max: number;
  };
  startDate: string;
  endDate: string;
  entryFee?: number;
  credits?: number;
  pointsRequired?: number;
  location: string;
  type: 'singles' | 'doubles';
  clubs: string[];
}

export interface League extends Tournament {
  matches: number;
  duration: string;
  leagueFee?: number;
  statusReason?: string;
}

export interface Notification {
  id: string;
  type: 'match-result' | 'confirmed' | 'info';
  title: string;
  message: string;
  time: string;
  actionText?: string;
  actionHandler?: () => void;
}

export interface User {
  id: string;
  name: string;
  image: string;
  level: string;
  rating: number;
  points: number;
  matches: number;
  wins: number;
  winRate: number;
}
