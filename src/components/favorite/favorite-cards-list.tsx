import { CardProps } from '../../types/cardProps';
import { filters } from '../../const';
import FavoriteCardArticle from './favorite-card';


type CardsListProps = {
    cards: CardProps[];
    sortType?: string;
}

function FavoriteCardsList({cards, sortType}: CardsListProps): JSX.Element {
  let sortedCards = cards;
  if (sortType) {
    switch (sortType) {
      case filters.LOW_TO_HIGH:
        sortedCards = [...cards].sort((a, b) => a.price - b.price);
        break;
      case filters.HIGH_TO_LOW:
        sortedCards = [...cards].sort((a, b) => b.price - a.price);
        break;
      case filters.TOP_RATED:
        sortedCards = [...cards].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
    }
  }
  return (
    <>
      {sortedCards.map((item) => (
        <FavoriteCardArticle key={item.id} id={item.id} price={item.price} rating={item.rating} isFavorite={item.isFavorite} roomName={item.roomName} roomType={item.roomType} image={item.image} onListItemHover={item.onListItemHover} />
      ))}
    </>
  );
}

export default FavoriteCardsList;
