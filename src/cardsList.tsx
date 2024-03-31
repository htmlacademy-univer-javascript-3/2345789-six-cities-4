import { CardProps } from './types/cardProps';
import CardArticle from './card';
import { filters } from './const';


type CardsListProps = {
    cards: CardProps[] & {rating: number}[];
    sortType: string;
}

function CardsList({cards, sortType}: CardsListProps): JSX.Element {
  let sortedCards: CardProps[];
  switch (sortType) {
    case filters.LOW_TO_HIGH:
      sortedCards = [...cards].sort((a, b) => a.price - b.price);
      break;
    case filters.HIGH_TO_LOW:
      sortedCards = [...cards].sort((a, b) => b.price - a.price);
      break;
    case filters.TOP_RATED:
      sortedCards = [...cards].sort((a, b) => b.rating - a.rating);
      break;
    default:
      sortedCards = cards;
  }
  return (
    <>
      {sortedCards.map((item) => (
        <CardArticle key={item.id} id={item.id} price={item.price} isInBookmarks={item.isInBookmarks} roomName={item.roomName} roomType={item.roomType} onListItemHover={item.onListItemHover} />
      ))}
    </>
  );
}

export default CardsList;
