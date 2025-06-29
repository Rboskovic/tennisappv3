import { Club, TimeSlot } from '../types';

export const mockClubs: Club[] = [
  {
    id: 'baseline',
    name: 'Baseline Tennis Club',
    address: 'Bulevar Arsenija Čarnojevića 54, Novi Beograd',
    pricePerHour: 1200,
    amenities: ['Parking', 'Garderobe', 'Kafić', 'Oprema za iznajmljivanje'],
    courts: [
      { id: 'baseline-1', number: 1, surface: 'hard', isIndoor: false, isAvailable: true },
      { id: 'baseline-2', number: 2, surface: 'hard', isIndoor: false, isAvailable: true },
      { id: 'baseline-3', number: 3, surface: 'clay', isIndoor: true, isAvailable: true },
      { id: 'baseline-4', number: 4, surface: 'clay', isIndoor: true, isAvailable: true },
    ],
  },
  {
    id: 'privilege',
    name: 'Privilege Sport Centar',
    address: 'Bulevar Mihajla Pupina 6, Novi Beograd',
    pricePerHour: 1500,
    amenities: ['Premium garderobe', 'Spa', 'Restoran', 'Parking'],
    courts: [
      { id: 'privilege-1', number: 1, surface: 'hard', isIndoor: true, isAvailable: true },
      { id: 'privilege-2', number: 2, surface: 'hard', isIndoor: true, isAvailable: true },
      { id: 'privilege-3', number: 3, surface: 'clay', isIndoor: false, isAvailable: true },
    ],
  },
  {
    id: 'gemax',
    name: 'Gemax Tenis Klub',
    address: 'Omladinskih brigada 86a, Novi Beograd',
    pricePerHour: 1000,
    amenities: ['Parking', 'Garderobe', 'Restoran'],
    courts: [
      { id: 'gemax-1', number: 1, surface: 'clay', isIndoor: false, isAvailable: true },
      { id: 'gemax-2', number: 2, surface: 'clay', isIndoor: false, isAvailable: true },
      { id: 'gemax-3', number: 3, surface: 'hard', isIndoor: true, isAvailable: true },
      { id: 'gemax-4', number: 4, surface: 'hard', isIndoor: true, isAvailable: true },
    ],
  },
];

export const availableTimeSlots: TimeSlot[] = [
  { id: '08:00', time: '08:00', isAvailable: true, price: 1000 },
  { id: '09:00', time: '09:00', isAvailable: true, price: 1000 },
  { id: '10:00', time: '10:00', isAvailable: true, price: 1200 },
  { id: '11:00', time: '11:00', isAvailable: true, price: 1200 },
  { id: '12:00', time: '12:00', isAvailable: true, price: 1500 },
  { id: '13:00', time: '13:00', isAvailable: true, price: 1500 },
  { id: '14:00', time: '14:00', isAvailable: true, price: 1500 },
  { id: '15:00', time: '15:00', isAvailable: true, price: 1500 },
  { id: '16:00', time: '16:00', isAvailable: true, price: 1800 },
  { id: '17:00', time: '17:00', isAvailable: true, price: 1800 },
  { id: '18:00', time: '18:00', isAvailable: true, price: 2000 },
  { id: '19:00', time: '19:00', isAvailable: true, price: 2000 },
  { id: '20:00', time: '20:00', isAvailable: true, price: 1800 },
  { id: '21:00', time: '21:00', isAvailable: true, price: 1500 },
];
