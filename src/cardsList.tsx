import CardProps from './types/cardProps';
import CardArticle from './card';

type CardsListProps = {
    cards: CardProps[];
}

function CardsList({cards}: CardsListProps): JSX.Element {
  return (
    <>
      {cards.map((item) => (
        <CardArticle key={item.id} id={item.id} price={item.price} isInBookmarks={item.isInBookmarks} roomName={item.roomName} roomType={item.roomType} />
      ))}
    </>
  );
}

export default CardsList;
