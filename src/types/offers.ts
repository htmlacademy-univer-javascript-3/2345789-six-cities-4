type Host = {
    name: string;
    status: string;
    img: string;
}

type Review = {
    name: string;
    rating: number;
    text: string;
    date: string;
    img: string;
}

type Offer = {
    id: string;
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
    reviews: Review[];
}

export default Offer;
