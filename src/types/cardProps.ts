export type CardProps = {
    id: string;
    price: number;
    isInBookmarks: boolean;
    roomName: string;
    roomType: string;
    onListItemHover?: (listItemName: string) => void;
}
