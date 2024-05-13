export type CardProps = {
    id: string;
    price: number;
    rating?: number;
    isFavorite: boolean;
    roomName: string;
    roomType: string;
    image: string;
    onListItemHover?: (listItemName: string) => void;
}
