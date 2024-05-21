import {
  Offer,
  City,
  Location,
  FullOffer,
  Host,
  Comment,
} from '../types/offers';
import { CardProps } from '../types/cardProps';

export const location: Location = {
  latitude: 69.228,
  longitude: 1337.69,
  zoom: 5,
};

export const city: City = {
  name: 'Paris',
  location: location,
};

export const offers: Offer[] = [
  {
    id: 'abc123',
    title: 'Full House',
    type: 'Pro Max',
    price: 1337.69,
    city: city,
    location: location,
    isFavorite: false,
    isPremium: true,
    rating: 5,
    previewImage: 'img/house.webp',
  },
];

export const sampleCards: CardProps[] = [
  {
    id: '1',
    price: 200,
    rating: 4.5,
    isFavorite: true,
    roomName: 'Deluxe Room',
    roomType: 'Apartment',
    image: 'img1.jpg',
    onListItemHover: vi.fn(),
  },
  {
    id: '2',
    price: 150,
    rating: 4.0,
    isFavorite: false,
    roomName: 'Standard Room',
    roomType: 'Studio',
    image: 'img2.jpg',
    onListItemHover: vi.fn(),
  },
  {
    id: '3',
    price: 300,
    rating: 5.0,
    isFavorite: true,
    roomName: 'Luxury Suite',
    roomType: 'Penthouse',
    image: 'img3.jpg',
    onListItemHover: vi.fn(),
  },
];

export const host: Host = {
  name: 'Mister Host',
  avatarUrl: 'img/host.png',
  isPro: true,
};

export const fullOffer: FullOffer = {
  id: 'abc123',
  title: 'Full House',
  type: 'Pro Max',
  price: 1337.69,
  city: city,
  location: location,
  isFavorite: false,
  isPremium: true,
  rating: 5,
  description: 'very nice house',
  bedrooms: 4,
  goods: ['good1', 'good2'],
  host: host,
  images: ['img1', 'img2'],
  maxAdults: 10,
};

export const comments: Comment[] = [
  {
    id: 'comment1',
    date: '2004-04-03',
    user: host,
    comment: 'goooooooood',
    rating: 4,
  },
];
