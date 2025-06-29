import { Club } from '../types';

export const clubs: Club[] = [
  {
    id: "baseline",
    name: "Baseline",
    logo: "https://media.licdn.com/dms/image/v2/C4E0BAQHQOaO4PH0YqA/company-logo_200_200/company-logo_200_200/0/1630580616826/baseline_creative_logo?e=2147483647&v=beta&t=y4KWnyeaQ0qpkKY1Lw0mJNrFo0bY8uUrPBfGELIjyxY",
    distance: 1.2,
    address: "Strahinjića Bana 89, Beograd",
    courts: {
      available: 4,
      indoor: 6,
      outdoor: 2,
      total: 8,
    },
    surfaces: ["Hard court", "Clay"],
    amenities: ["Parking", "Shower", "Shop", "Cafe"],
    prices: {
      weekday: { singles: 1500, doubles: 2000 },
      weekend: { singles: 2000, doubles: 2500 },
    },
    rating: 4.8,
    reviews: 156,
  },
  {
    id: "gemax",
    name: "Gemax",
    logo: "https://scontent.fbeg9-1.fna.fbcdn.net/v/t39.30808-6/430973888_782687087218842_5916996700262079966_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=EwCeGCjQkJQQ7kNvgGOBjW5&_nc_zt=23&_nc_ht=scontent.fbeg9-1.fna&_nc_gid=AOklGQ6LeTZBvElJC9qb6vl&oh=00_AYB9N13e-LV1ovppCYC8mQqp5fwVPJR2Y6H2A1YBHXD1nw&oe=677BC87F",
    distance: 2.8,
    address: "Maksima Gorkog 15, Beograd",
    courts: {
      available: 2,
      indoor: 4,
      outdoor: 0,
      total: 4,
    },
    surfaces: ["Hard court"],
    amenities: ["Parking", "Shower", "Cafe"],
    prices: {
      weekday: { singles: 1800, doubles: 2300 },
      weekend: { singles: 2200, doubles: 2700 },
    },
    rating: 4.6,
    reviews: 89,
  },
  {
    id: "privilege",
    name: "Privilege",
    logo: "https://scontent.fbeg9-1.fna.fbcdn.net/v/t39.30808-6/247926071_4547950445291695_5384949946789436434_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=g3jLPkUjV-MQ7kNvgEpFYwI&_nc_zt=23&_nc_ht=scontent.fbeg9-1.fna&_nc_gid=AOklGQ6LeTZBvElJC9qb6vl&oh=00_AYCDlm2fP3qYhw6MPJyiK4_FXF-Yp6pOm9CjFrNPWtC7fA&oe=677BE40B",
    distance: 4.1,
    address: "Patrijarha Dimitrija 12, Beograd",
    courts: {
      available: 1,
      indoor: 3,
      outdoor: 3,
      total: 6,
    },
    surfaces: ["Hard court", "Clay"],
    amenities: ["Parking", "Shower", "Shop", "Cafe", "Gym"],
    prices: {
      weekday: { singles: 2000, doubles: 2500 },
      weekend: { singles: 2500, doubles: 3000 },
    },
    rating: 4.9,
    reviews: 203,
  },
];
