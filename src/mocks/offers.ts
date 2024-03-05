import Offer from '../types/offers';

export const offers: Offer[] = [
  {
    id: '0',
    class: 'Premium',
    name: 'Beautiful &amp; luxurious studio at great location',
    isInBookmarks: false,
    rating: 4.8,
    features: ['Apartment', '3 Bedrooms', 'Max 4 adults'],
    price: 120,
    inside: ['Wi-Fi', 'Washing machine', 'Towels', 'Heating', 'Coffee machine', 'Baby seat', 'Kitchen', 'Dishwasher', 'Cabel TV', 'Fridge'],
    images: ['img/room.jpg', 'img/apartment-01.jpg', 'img/apartment-02.jpg', 'img/apartment-03.jpg', 'img/studio-01.jpg', 'img/apartment-01.jpg'],
    host: {
      name: 'Angelina',
      status: 'Pro',
      img: 'img/avatar-angelina.jpg'
    },
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.\nAn independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.',
    reviews: [
      {
        name: 'Max',
        rating: 80,
        text: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
        date: '2019-04-24',
        img: 'img/avatar-max.jpg'
      }
    ]
  },
  {
    id: '1',
    class: 'Economy',
    name: 'Cozy and affordable room near downtown',
    isInBookmarks: false,
    rating: 4.2,
    features: ['Room', '1 Bedroom', 'Max 2 adults'],
    price: 45,
    inside: ['Wi-Fi', 'Heating', 'Shared bathroom', 'Coffee machine', 'Fridge'],
    images: ['img/room.jpg', 'img/apartment-01.jpg', 'img/apartment-02.jpg', 'img/apartment-03.jpg', 'img/studio-01.jpg', 'img/apartment-01.jpg'],
    host: {
      name: 'Marco',
      status: 'New',
      img: 'img/avatar-angelina.jpg'
    },
    description: 'Compact and affordable accommodation perfect for budget travelers. Located in a quiet neighborhood with easy access to public transportation, making it an ideal base for exploring the city.',
    reviews: [
      {
        name: 'Sarah',
        rating: 75,
        text: 'Great value for the price. The host was very welcoming and the room was clean and comfortable.',
        date: '2020-08-15',
        img: 'img/avatar-max.jpg'
      }
    ]
  },
  {
    id: '2',
    class: 'Deluxe',
    name: 'Spacious family house with a garden',
    isInBookmarks: false,
    rating: 4.9,
    features: ['House', '4 Bedrooms', 'Max 8 adults'],
    price: 250,
    inside: ['Wi-Fi', 'Washing machine', 'Towels', 'Heating', 'Coffee machine', 'Children’s books and toys', 'Kitchen', 'Dishwasher', 'Cable TV', 'Fridge', 'Garden'],
    images: ['img/room.jpg', 'img/apartment-01.jpg', 'img/apartment-02.jpg', 'img/apartment-03.jpg', 'img/studio-01.jpg', 'img/apartment-01.jpg'],
    host: {
      name: 'Elena',
      status: 'Superhost',
      img: 'img/avatar-angelina.jpg'
    },
    description: 'Ideal for family vacations or group trips. This spacious home provides all the comforts you need, including a large outdoor area for relaxation or activities. Situated in a friendly neighborhood with local shops and parks nearby.',
    reviews: [
      {
        name: 'Ben',
        rating: 95,
        text: 'The house was perfect for our family getaway. Plenty of space and the kids loved playing in the garden. Highly recommended!',
        date: '2021-05-20',
        img: 'img/avatar-max.jpg'
      }
    ]
  },
  {
    id: '3',
    class: 'Business',
    name: 'Modern apartment in the business district',
    isInBookmarks: true,
    rating: 4.7,
    features: ['Apartment', '2 Bedrooms', 'Max 4 adults'],
    price: 150,
    inside: ['Wi-Fi', 'Washing machine', 'Iron', 'Heating', 'Coffee machine', 'Work desk', 'Kitchen', 'Dishwasher', 'Cable TV', 'Fridge'],
    images: ['img/room.jpg', 'img/apartment-01.jpg', 'img/apartment-02.jpg', 'img/apartment-03.jpg', 'img/studio-01.jpg', 'img/apartment-01.jpg'],
    host: {
      name: 'Oliver',
      status: 'Pro',
      img: 'img/avatar-angelina.jpg'
    },
    description: 'A sleek and modern apartment designed for business travelers. In the heart of the business district, it’s a short walk to conferences, dining, and nightlife. Equipped with amenities to make your stay productive and relaxing.',
    reviews: [
      {
        name: 'Sophia',
        rating: 85,
        text: 'Excellent location for business travel. The apartment had everything I needed for my stay and the host was very responsive.',
        date: '2022-02-10',
        img: 'img/avatar-max.jpg'
      }
    ]
  }
];
