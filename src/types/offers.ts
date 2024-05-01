export type Location = {
    latitude: number;
    longitude: number;
    zoom: number;
};

export type City = {
    name: string;
    location: Location;
}

export type Offer = {
    id: string;
    title: string;
    type: string;
    price: number;
    city: City;
    location: Location;
    isFavorite: boolean;
    isPremium: boolean;
    rating: number;
    previewImage: string;
}

export type Host = {
    name: string;
    avatarUrl: string;
    isPro: boolean;
}

export type User = Host;

export type FullOffer = {
    id: string;
    title: string;
    type: string;
    price: number;
    city: City;
    location: Location;
    isFavorite: boolean;
    isPremium: boolean;
    rating: number;
    description: string;
    bedrooms: number;
    goods: string[];
    host: Host;
    images: string[];
    maxAdults: number;
}

export type Comment = {
    id: string;
    date: string;
    user: User;
    comment: string;
    rating: number;
};
