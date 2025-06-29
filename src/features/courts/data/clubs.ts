// src/features/courts/data/clubs.ts
import { Club, TimeSlot } from '../types';

export const clubs: Club[] = [
  {
    id: "baseline",
    name: "Baseline",
    location: "Novi Beograd",
    image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400",
    courts: [
      { id: "baseline-1", number: 1, type: "hard", isIndoor: true, isAvailable: true, pricePerHour: 1200 },
      { id: "baseline-2", number: 2, type: "hard", isIndoor: true, isAvailable: true, pricePerHour: 1200 },
      { id: "baseline-3", number: 3, type: "clay", isIndoor: false, isAvailable: true, pricePerHour: 1000 },
      { id: "baseline-4", number: 4, type: "clay", isIndoor: false, isAvailable: true, pricePerHour: 1000 },
    ],
    amenities: ["Parking", "Restroom", "Locker Room", "Pro Shop"],
    pricePerHour: 1200,
    distance: 2.1,
  },
  {
    id: "gemax",
    name: "Gemax",
    location: "Zemun",
    image: "https://images.unsplash.com/photo-1544919982-b61976f0ba43?w=400",
    courts: [
      { id: "gemax-1", number: 1, type: "hard", isIndoor: true, isAvailable: true, pricePerHour: 1100 },
      { id: "gemax-2", number: 2, type: "hard", isIndoor: true, isAvailable: true, pricePerHour: 1100 },
      { id: "gemax-3", number: 3, type: "hard", isIndoor: false, isAvailable: true, pricePerHour: 900 },
      { id: "gemax-4", number: 4, type: "hard", isIndoor: false, isAvailable: true, pricePerHour: 900 },
    ],
    amenities: ["Parking", "Restroom", "Cafe"],
    pricePerHour: 1100,
    distance: 5.3,
  },
  {
    id: "privilege",
    name: "Privilege",
    location: "Vračar",
    image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400",
    courts: [
      { id: "privilege-1", number: 1, type: "clay", isIndoor: true, isAvailable: true, pricePerHour: 1500 },
      { id: "privilege-2", number: 2, type: "clay", isIndoor: true, isAvailable: true, pricePerHour: 1500 },
      { id: "privilege-3", number: 3, type: "hard", isIndoor: true, isAvailable: true, pricePerHour: 1400 },
      { id: "privilege-4", number: 4, type: "hard", isIndoor: false, isAvailable: true, pricePerHour: 1200 },
    ],
    amenities: ["Valet Parking", "Premium Locker Room", "Restaurant", "Spa", "Pro Shop"],
    pricePerHour: 1500,
    distance: 4.7,
  },
  {
    id: "trim",
    name: "Trim",
    location: "Banovo Brdo",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    courts: [
      { id: "trim-1", number: 1, type: "clay", isIndoor: false, isAvailable: true, pricePerHour: 800 },
      { id: "trim-2", number: 2, type: "clay", isIndoor: false, isAvailable: true, pricePerHour: 800 },
      { id: "trim-3", number: 3, type: "hard", isIndoor: false, isAvailable: true, pricePerHour: 900 },
      { id: "trim-4", number: 4, type: "hard", isIndoor: false, isAvailable: true, pricePerHour: 900 },
    ],
    amenities: ["Parking", "Restroom", "Snack Bar"],
    pricePerHour: 800,
    distance: 8.2,
  },
];

// Available time slots for court booking
export const availableTimeSlots = [
  "08:00", "09:00", "10:00", "11:00", "12:00", "13:00",
  "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"
];

// Mock availability data - in real app this would come from API
export const generateAvailabilityForClub = (clubId: string, date: string): TimeSlot[] => {
  const club = clubs.find(c => c.id === clubId);
  if (!club) return [];

  return availableTimeSlots.map(time => {
    // Simulate some slots being unavailable
    const isAvailable = Math.random() > 0.3; // 70% availability
    const randomCourt = club.courts[Math.floor(Math.random() * club.courts.length)];
    
    return {
      time,
      isAvailable,
      price: randomCourt.pricePerHour,
      court: isAvailable ? randomCourt : undefined,
    };
  });
};

export const getClubById = (id: string): Club | undefined => {
  return clubs.find(club => club.id === id);
};

export const getClubsByIds = (ids: string[]): Club[] => {
  return clubs.filter(club => ids.includes(club.id));
};
