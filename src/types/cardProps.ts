export type CardProps = {
    id: string;
    price: number;
    rating?: number;
    roomName: string;
    roomType: string;
    image: string;
    onListItemHover?: (listItemName: string) => void;
}
