import type { Club } from '../features/booking/types';

export const tennisClubs: Club[] = [
  {
    id: 'baseline',
    name: 'Baseline',
    logo: '/logos/baseline.png',
    distance: 2.3,
    courts: {
      available: 2,
      indoor: 3,
      outdoor: 2,
      total: 5,
    },
    type: 'tennis',
  },
  {
    id: 'gemax',
    name: 'Gemax',
    logo: '/logos/gemax.png',
    distance: 3.1,
    courts: {
      available: 1,
      indoor: 4,
      outdoor: 2,
      total: 6,
    },
    type: 'tennis',
  },
  {
    id: 'privilege',
    name: 'Privilege',
    logo: '/logos/privilege.png',
    distance: 1.5,
    courts: {
      available: 3,
      indoor: 2,
      outdoor: 4,
      total: 6,
    },
    type: 'tennis',
  },
  {
    id: 'padel-center',
    name: 'Padel Center',
    logo: '/logos/padel-center.png',
    distance: 1.8,
    courts: {
      available: 2,
      indoor: 4,
      outdoor: 0,
      total: 4,
    },
    type: 'padel',
  },
];

export const additionalClubs: Club[] = [
  {
    id: 'trim',
    name: 'Trim',
    distance: 3.2,
    courts: {
      available: 1,
      indoor: 2,
      outdoor: 1,
      total: 3,
    },
    type: 'tennis',
  },
  {
    id: 'ada-ciganlija',
    name: 'Ada Ciganlija',
    distance: 3.2,
    courts: {
      available: 2,
      indoor: 0,
      outdoor: 8,
      total: 8,
    },
    type: 'tennis',
  },
  {
    id: 'toplana',
    name: 'Toplana',
    distance: 3.2,
    courts: {
      available: 0,
      indoor: 2,
      outdoor: 0,
      total: 2,
    },
    type: 'tennis',
  },
  {
    id: 'tipsarevic',
    name: 'Tipsarevic Center',
    distance: 3.2,
    courts: {
      available: 1,
      indoor: 3,
      outdoor: 1,
      total: 4,
    },
    type: 'tennis',
  },
];

export const allClubs = [...tennisClubs, ...additionalClubs];
