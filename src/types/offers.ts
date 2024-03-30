type Host = {
    name: string;
    status: string;
    img: string;
}

export type ReviewProps = {
    name: string;
    rating: number;
    text: string;
    date: string;
    img: string;
}

type Coordinates = [number, number];

export type Offer = {
    id: string;
    coordinates: Coordinates;
    class: string;
    name: string;
    isInBookmarks: boolean;
    rating: number;
    features: string[];
    price: number;
    inside: string[];
    images: string[];
    host: Host;
    description: string;
    reviews: ReviewProps[];
}
