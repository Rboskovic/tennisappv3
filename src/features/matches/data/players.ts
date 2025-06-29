// src/features/matches/data/players.ts
import { Player, Achievement } from '../types';

// Common achievements in Serbian tennis culture
const achievements: Achievement[] = [
  {
    id: 'first-win',
    title: 'Prva Pobeda',
    description: 'Osvojio prvi zvanični meč',
    icon: '🏆',
    earnedAt: '2024-01-15',
    rarity: 'common'
  },
  {
    id: 'streak-5',
    title: 'Serija Pobeda',
    description: '5 uzastopnih pobeda',
    icon: '🔥',
    earnedAt: '2024-06-10',
    rarity: 'rare'
  },
  {
    id: 'baseline-master',
    title: 'Baseline Majstor',
    description: 'Osvojio 20 mečeva sa osnovne linije',
    icon: '🎾',
    earnedAt: '2024-05-20',
    rarity: 'epic'
  },
  {
    id: 'club-champion',
    title: 'Klupski Šampion',
    description: 'Pobedio u klupskom turniru',
    icon: '👑',
    earnedAt: '2024-07-01',
    rarity: 'legendary'
  }
];

export const players: Player[] = [
  {
    id: 'player-1',
    name: 'Ana Jovanović',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    age: 28,
    location: 'Novi Beograd',
    bio: 'Volim agresivnu igru i brze površine. Igram tenis 8 godina i uvek tražim nova izazove!',
    
    skillLevel: 'advanced',
    ntrpRating: 4.5,
    rankingPoints: 1420,
    preferredCourts: ['hard', 'clay'],
    preferredPlayStyle: 'aggressive',
    
    stats: {
      matchesPlayed: 156,
      matchesWon: 124,
      winRate: 79.5,
      currentStreak: 5,
      longestStreak: 12,
      averageMatchDuration: 85,
      favoriteOpponents: ['player-3', 'player-5'],
      recentForm: ['W', 'W', 'L', 'W', 'W']
    },
    
    isOnline: true,
    lastSeen: new Date().toISOString(),
    availability: {
      timezone: 'Europe/Belgrade',
      weeklySchedule: {
        monday: { available: false, timeSlots: [], preferredLocations: [] },
        tuesday: { available: true, timeSlots: [{ start: '18:00', end: '21:00' }], preferredLocations: ['Baseline', 'Gemax'] },
        wednesday: { available: true, timeSlots: [{ start: '19:00', end: '22:00' }], preferredLocations: ['Baseline'] },
        thursday: { available: false, timeSlots: [], preferredLocations: [] },
        friday: { available: true, timeSlots: [{ start: '17:00', end: '20:00' }], preferredLocations: ['Privilege'] },
        saturday: { available: true, timeSlots: [{ start: '09:00', end: '18:00' }], preferredLocations: ['Baseline', 'Gemax', 'Privilege'] },
        sunday: { available: true, timeSlots: [{ start: '10:00', end: '16:00' }], preferredLocations: ['Ada Ciganlija'] }
      },
      customDates: [],
      autoAcceptRating: 4.0
    },
    
    clubs: ['Baseline', 'Privilege'],
    achievements: [achievements[1], achievements[2]],
    verified: true
  },
  
  {
    id: 'player-2', 
    name: 'Marko Đorđević',
    avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
    age: 32,
    location: 'Zemun',
    bio: 'Obrambeni igrač koji voli duge poene. Najbolji sam na šljaci!',
    
    skillLevel: 'intermediate',
    ntrpRating: 4.0,
    rankingPoints: 1180,
    preferredCourts: ['clay', 'hard'],
    preferredPlayStyle: 'defensive',
    
    stats: {
      matchesPlayed: 89,
      matchesWon: 51,
      winRate: 57.3,
      currentStreak: 2,
      longestStreak: 8,
      averageMatchDuration: 105,
      favoriteOpponents: ['player-4'],
      recentForm: ['L', 'W', 'W', 'L', 'W']
    },
    
    isOnline: false,
    lastSeen: '2025-06-29T09:30:00Z',
    availability: {
      timezone: 'Europe/Belgrade',
      weeklySchedule: {
        monday: { available: true, timeSlots: [{ start: '19:00', end: '21:00' }], preferredLocations: ['Gemax'] },
        tuesday: { available: false, timeSlots: [], preferredLocations: [] },
        wednesday: { available: true, timeSlots: [{ start: '20:00', end: '22:00' }], preferredLocations: ['Gemax', 'Trim'] },
        thursday: { available: true, timeSlots: [{ start: '19:00', end: '21:00' }], preferredLocations: ['Gemax'] },
        friday: { available: false, timeSlots: [], preferredLocations: [] },
        saturday: { available: true, timeSlots: [{ start: '14:00', end: '18:00' }], preferredLocations: ['Trim', 'Ada Ciganlija'] },
        sunday: { available: true, timeSlots: [{ start: '11:00', end: '15:00' }], preferredLocations: ['Ada Ciganlija'] }
      },
      customDates: [],
      autoAcceptRating: 3.5
    },
    
    clubs: ['Gemax'],
    achievements: [achievements[0]],
    verified: false
  },

  {
    id: 'player-3',
    name: 'Stefan Milanović', 
    avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
    age: 24,
    location: 'Vračar',
    bio: 'Mladi ambiciozni igrač. Treniram svaki dan i cilj mi je profesionalni tenis!',
    
    skillLevel: 'expert',
    ntrpRating: 5.5,
    rankingPoints: 1780,
    preferredCourts: ['hard', 'clay', 'grass'],
    preferredPlayStyle: 'all-court',
    
    stats: {
      matchesPlayed: 234,
      matchesWon: 198,
      winRate: 84.6,
      currentStreak: 11,
      longestStreak: 18,
      averageMatchDuration: 78,
      favoriteOpponents: ['player-1', 'player-6'],
      recentForm: ['W', 'W', 'W', 'W', 'W']
    },
    
    isOnline: true,
    lastSeen: new Date().toISOString(),
    availability: {
      timezone: 'Europe/Belgrade',
      weeklySchedule: {
        monday: { available: true, timeSlots: [{ start: '16:00', end: '19:00' }], preferredLocations: ['Privilege', 'Tipsarevic'] },
        tuesday: { available: true, timeSlots: [{ start: '16:00', end: '19:00' }], preferredLocations: ['Privilege', 'Tipsarevic'] },
        wednesday: { available: true, timeSlots: [{ start: '16:00', end: '19:00' }], preferredLocations: ['Privilege'] },
        thursday: { available: true, timeSlots: [{ start: '16:00', end: '19:00' }], preferredLocations: ['Privilege', 'Tipsarevic'] },
        friday: { available: true, timeSlots: [{ start: '16:00', end: '19:00' }], preferredLocations: ['Privilege'] },
        saturday: { available: true, timeSlots: [{ start: '08:00', end: '20:00' }], preferredLocations: ['Privilege', 'Tipsarevic', 'Baseline'] },
        sunday: { available: true, timeSlots: [{ start: '08:00', end: '18:00' }], preferredLocations: ['Privilege', 'Baseline'] }
      },
      customDates: [],
      autoAcceptRating: 4.5
    },
    
    clubs: ['Privilege', 'Tipsarevic'],
    achievements: [achievements[1], achievements[2], achievements[3]],
    verified: true
  },

  {
    id: 'player-4',
    name: 'Milica Stojanović',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg', 
    age: 35,
    location: 'Banovo Brdo',
    bio: 'Rekreativna igračka koja voli druženje kroz tenis. Forme nisu bitne, važno je uživanje!',
    
    skillLevel: 'lower-intermediate',
    ntrpRating: 3.5,
    rankingPoints: 920,
    preferredCourts: ['clay'],
    preferredPlayStyle: 'recreational',
    
    stats: {
      matchesPlayed: 45,
      matchesWon: 23,
      winRate: 51.1,
      currentStreak: 1,
      longestStreak: 4,
      averageMatchDuration: 95,
      favoriteOpponents: ['player-2', 'player-7'],
      recentForm: ['W', 'L', 'L', 'W', 'L']
    },
    
    isOnline: false,
    lastSeen: '2025-06-28T16:45:00Z',
    availability: {
      timezone: 'Europe/Belgrade',
      weeklySchedule: {
        monday: { available: false, timeSlots: [], preferredLocations: [] },
        tuesday: { available: true, timeSlots: [{ start: '10:00', end: '14:00' }], preferredLocations: ['Trim', 'Ada Ciganlija'] },
        wednesday: { available: false, timeSlots: [], preferredLocations: [] },
        thursday: { available: true, timeSlots: [{ start: '10:00', end: '14:00' }], preferredLocations: ['Trim'] },
        friday: { available: false, timeSlots: [], preferredLocations: [] },
        saturday: { available: true, timeSlots: [{ start: '09:00', end: '13:00' }], preferredLocations: ['Ada Ciganlija', 'Trim'] },
        sunday: { available: true, timeSlots: [{ start: '10:00', end: '14:00' }], preferredLocations: ['Ada Ciganlija'] }
      },
      customDates: [],
      autoAcceptRating: 3.0
    },
    
    clubs: ['Trim'],
    achievements: [achievements[0]],
    verified: false
  },

  {
    id: 'player-5',
    name: 'Nemanja Petrović',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    age: 29,
    location: 'Novi Beograd', 
    bio: 'Bivši profesionalac, sada trener. Uvek spreman za dobru partiju!',
    
    skillLevel: 'professional',
    ntrpRating: 6.5,
    rankingPoints: 2150,
    preferredCourts: ['hard', 'clay'],
    preferredPlayStyle: 'all-court',
    
    stats: {
      matchesPlayed: 312,
      matchesWon: 276,
      winRate: 88.5,
      currentStreak: 8,
      longestStreak: 23,
      averageMatchDuration: 72,
      favoriteOpponents: ['player-3', 'player-1'],
      recentForm: ['W', 'W', 'W', 'L', 'W']
    },
    
    isOnline: true,
    lastSeen: new Date().toISOString(),
    availability: {
      timezone: 'Europe/Belgrade', 
      weeklySchedule: {
        monday: { available: true, timeSlots: [{ start: '17:00', end: '20:00' }], preferredLocations: ['Baseline', 'Tipsarevic'] },
        tuesday: { available: true, timeSlots: [{ start: '17:00', end: '20:00' }], preferredLocations: ['Baseline', 'Tipsarevic'] },
        wednesday: { available: true, timeSlots: [{ start: '17:00', end: '20:00' }], preferredLocations: ['Baseline'] },
        thursday: { available: true, timeSlots: [{ start: '17:00', end: '20:00' }], preferredLocations: ['Baseline', 'Tipsarevic'] },
        friday: { available: true, timeSlots: [{ start: '17:00', end: '20:00' }], preferredLocations: ['Baseline'] },
        saturday: { available: true, timeSlots: [{ start: '09:00', end: '19:00' }], preferredLocations: ['Baseline', 'Tipsarevic', 'Privilege'] },
        sunday: { available: true, timeSlots: [{ start: '10:00', end: '17:00' }], preferredLocations: ['Baseline', 'Tipsarevic'] }
      },
      customDates: [],
      autoAcceptRating: 5.0
    },
    
    clubs: ['Baseline', 'Tipsarevic'],
    achievements: [achievements[1], achievements[2], achievements[3]],
    verified: true
  }
];

// Helper functions for player data
export const getPlayerById = (id: string): Player | undefined => {
  return players.find(player => player.id === id);
};

export const getOnlinePlayers = (): Player[] => {
  return players.filter(player => player.isOnline);
};

export const getPlayersBySkillLevel = (skillLevel: string): Player[] => {
  return players.filter(player => player.skillLevel === skillLevel);
};

export const getPlayersByClub = (clubName: string): Player[] => {
  return players.filter(player => player.clubs.includes(clubName));
};

export const getPlayersInRatingRange = (min: number, max: number): Player[] => {
  return players.filter(player => 
    player.ntrpRating >= min && player.ntrpRating <= max
  );
};

export const getCompatiblePlayers = (targetPlayer: Player): Player[] => {
  // Simple compatibility algorithm - can be enhanced
  return players.filter(player => {
    if (player.id === targetPlayer.id) return false;
    
    const ratingDiff = Math.abs(player.ntrpRating - targetPlayer.ntrpRating);
    const hasCommonClub = player.clubs.some(club => targetPlayer.clubs.includes(club));
    const hasCommonCourt = player.preferredCourts.some(court => 
      targetPlayer.preferredCourts.includes(court)
    );
    
    return ratingDiff <= 1.0 && (hasCommonClub || hasCommonCourt);
  });
};
