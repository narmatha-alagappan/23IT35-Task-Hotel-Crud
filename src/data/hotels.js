export const seedHotels = [
  {
    id: 1,
    title: 'Grand Residency',
    description: 'A luxurious hotel in RS Puram, Coimbatore, offering premium rooms and world-class amenities.',
    image: 'https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/htl-imgs/201409011551477753-d8fd0882292b11e4b9f35ee5da2daa2a.jpg',
    latitude: 11.0085,
    longitude: 76.9515,
    price: 8500,
  },
  {
    id: 2,
    title: 'Green Valley Resort',
    description: 'A peaceful resort near Vadavalli surrounded by greenery with a swimming pool and beautiful views.',
    image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/ea/e9/87/lobby.jpg?w=500&h=-1&s=1',
    latitude: 11.0245,
    longitude: 76.9120,
    price: 6500,
  },
  {
    id: 3,
    title: 'Mountain View Stay',
    description: 'A cozy hotel near Marudhamalai offering a relaxing atmosphere and scenic hill views.',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600',
    latitude: 11.0450,
    longitude: 76.8850,
    price: 4500,
  },
  {
    id: 4,
    title: 'City Central Hotel',
    description: 'A modern business hotel in Gandhipuram, close to shopping centers and transportation facilities.',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600',
    latitude: 11.0180,
    longitude: 76.9670,
    price: 5000,
  },
  {
    id: 5,
    title: 'Royal Heritage Inn',
    description: 'An elegant hotel near Race Course featuring comfortable rooms and traditional hospitality.',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600',
    latitude: 11.0055,
    longitude: 76.9740,
    price: 7500,
  },
  {
    id: 6,
    title: 'Lakeside Retreat',
    description: 'A peaceful accommodation near Singanallur Lake with beautiful surroundings and comfortable stays.',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600',
    latitude: 10.9980,
    longitude: 77.0170,
    price: 4000,
  },
  {
    id: 7,
    title: 'Comfort Paradise',
    description: 'A relaxing hotel in Peelamedu, Coimbatore, with modern facilities and easy airport access.',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600',
    latitude: 11.0250,
    longitude: 77.0020,
    price: 5500,
  },
  {
    id: 8,
    title: 'Royal Garden Hotel',
    description: 'A premium hotel on Avinashi Road featuring elegant interiors, gardens and fine dining.',
    image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600',
    latitude: 11.0255,
    longitude: 77.0150,
    price: 9000,
  },
  {
    id: 9,
    title: 'Sunrise Guest House',
    description: 'Budget-friendly accommodation near Saibaba Colony with clean rooms and essential facilities.',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600',
    latitude: 11.0250,
    longitude: 76.9470,
    price: 2000,
  },
  {
    id: 10,
    title: 'Nature Nest Resort',
    description: 'A beautiful resort near Thondamuthur offering a peaceful stay surrounded by nature.',
    image: 'https://images.unsplash.com/photo-1587985064135-0366536eab42?w=600',
    latitude: 10.9850,
    longitude: 76.8650,
    price: 6000,
  },
];
const STORAGE_KEY = 'hotels_data'
const VERSION_KEY = 'hotels_version'
const DATA_VERSION = 5

export const getHotels = () => {
  const stored = localStorage.getItem(STORAGE_KEY)
  const storedVersion = localStorage.getItem(VERSION_KEY)

  if (!stored || storedVersion !== String(DATA_VERSION)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedHotels))
    localStorage.setItem(VERSION_KEY, String(DATA_VERSION))
    return seedHotels
  }
  return JSON.parse(stored)
}

export const saveHotels = (hotels) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(hotels))
}