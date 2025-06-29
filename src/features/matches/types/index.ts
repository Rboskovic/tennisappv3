// src/features/matches/types/index.ts

// Player & User Types
export interface Player {
  id: string;
  name: string;
  avatar: string;
  age: number;
  location: string;
  bio?: string;
  
  // Tennis specifics
  skillLevel: SkillLevel;
  ntrpRating: number;
  rankingPoints: number;
  preferredCourts: CourtType[];
  preferredPlayStyle: PlayStyle;
  
  // Statistics
  stats: PlayerStats;
  
  // Availability & Status
  isOnline: boolean;
  lastSeen: string;
  availability: Availability;
  
  // Social
  clubs: string[];
  achievements: Achievement[];
  verified: boolean;
}

export interface PlayerStats {
  matchesPlayed: number;
  matchesWon: number;
  winRate: number;
  currentStreak: number;
  longestStreak: number;
  averageMatchDuration: number; // minutes
  favoriteOpponents: string[];
  recentForm: ('W' | 'L')[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedAt: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

// Match Types
export interface Match {
  id: string;
  status: MatchStatus;
  type: MatchType;
  format: MatchFormat;
  
  // Players
  player1: Player;
  player2?: Player;
  hostId: string;
  
  // Scheduling
  scheduledFor?: string;
  duration: number; // estimated minutes
  location: MatchLocation;
  
  // Results (if completed)
  result?: MatchResult;
  
  // Metadata
  createdAt: string;
  updatedAt: string;
  notes?: string;
}

export interface MatchResult {
  winner: string;
  sets: Set[];
  duration: number; // actual minutes played
  pointsAwarded: {
    winner: number;
    loser: number;
  };
  ratingChange: {
    player1: number;
    player2: number;
  };
}

export interface Set {
  player1Games: number;
  player2Games: number;
  tiebreak?: {
    player1Points: number;
    player2Points: number;
  };
}

export interface MatchLocation {
  type: 'club' | 'public' | 'private';
  name: string;
  address: string;
  courtNumber?: number;
  courtType: CourtType;
  indoor: boolean;
}

// Search & Filter Types
export interface MatchSearchFilters {
  skillLevels: SkillLevel[];
  ratingRange: {
    min: number;
    max: number;
  };
  ageRange?: {
    min: number;
    max: number;
  };
  locations: string[];
  availableToday?: boolean;
  availableThisWeek?: boolean;
  matchTypes: MatchType[];
  onlineOnly?: boolean;
  preferredPlayStyles?: PlayStyle[];
  maxDistance?: number; // km
}

export interface MatchSearchResult {
  players: Player[];
  totalCount: number;
  suggestedMatches: SuggestedMatch[];
  filters: MatchSearchFilters;
}

export interface SuggestedMatch {
  player: Player;
  compatibilityScore: number;
  reasons: string[];
  estimatedMatchQuality: 'excellent' | 'good' | 'fair';
  availableSlots: AvailableSlot[];
}

export interface AvailableSlot {
  date: string;
  time: string;
  location: MatchLocation;
  confidence: number; // 0-1
}

// Match Request & Communication
export interface MatchRequest {
  id: string;
  from: Player;
  to: Player;
  status: RequestStatus;
  message?: string;
  proposedDate?: string;
  proposedTime?: string;
  proposedLocation?: MatchLocation;
  createdAt: string;
  expiresAt: string;
  response?: string;
}

export interface ChatMessage {
  id: string;
  matchId: string;
  from: string;
  to: string;
  message: string;
  timestamp: string;
  type: 'text' | 'match_request' | 'system';
}

// Availability System
export interface Availability {
  timezone: string;
  weeklySchedule: WeeklyAvailability;
  customDates: CustomAvailability[];
  autoAcceptRating?: number; // auto-accept requests from players with this rating or higher
}

export interface WeeklyAvailability {
  monday: DayAvailability;
  tuesday: DayAvailability;
  wednesday: DayAvailability;
  thursday: DayAvailability;
  friday: DayAvailability;
  saturday: DayAvailability;
  sunday: DayAvailability;
}

export interface DayAvailability {
  available: boolean;
  timeSlots: TimeSlot[];
  preferredLocations: string[];
}

export interface TimeSlot {
  start: string; // HH:mm format
  end: string;   // HH:mm format
}

export interface CustomAvailability {
  date: string; // YYYY-MM-DD
  available: boolean;
  timeSlots?: TimeSlot[];
  note?: string;
}

// Enums
export type SkillLevel = 
  | 'beginner'           // 1.0-2.5 NTRP
  | 'lower-intermediate' // 3.0-3.5 NTRP  
  | 'intermediate'       // 4.0 NTRP
  | 'advanced'          // 4.5-5.0 NTRP
  | 'expert'            // 5.5 NTRP
  | 'professional';     // 6.0+ NTRP

export type CourtType = 'hard' | 'clay' | 'grass' | 'carpet';

export type PlayStyle = 
  | 'aggressive'     // Power baseline, aggressive net play
  | 'defensive'      // Counter-puncher, retriever
  | 'all-court'      // Versatile, adapts to situation
  | 'serve-volley'   // Classic attacking style
  | 'baseline'       // Prefers to stay back
  | 'recreational';  // Just for fun, not competitive

export type MatchStatus = 
  | 'seeking'        // Looking for opponent
  | 'pending'        // Request sent, waiting for response
  | 'confirmed'      // Match scheduled
  | 'in-progress'    // Currently playing
  | 'completed'      // Finished with result
  | 'cancelled'      // Cancelled by either party
  | 'no-show';       // One player didn't show up

export type MatchType = 
  | 'casual'         // Friendly, no stakes
  | 'competitive'    // Ranking points, serious
  | 'practice'       // Skill improvement focus
  | 'league'         // Part of organized league
  | 'tournament';    // Tournament match

export type MatchFormat = 
  | 'singles'        // 1v1
  | 'doubles'        // 2v2
  | 'mixed-doubles'  // Mixed gender 2v2
  | 'mini-tennis';   // Shorter format

export type RequestStatus = 
  | 'pending'        // Waiting for response
  | 'accepted'       // Accepted, match scheduled
  | 'declined'       // Declined politely
  | 'expired'        // No response within time limit
  | 'cancelled';     // Cancelled by sender
