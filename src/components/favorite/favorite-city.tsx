import { Offer } from '../../types/offers';
import FavoriteCardsList from './favorite-cards-list';

type FavoritesCityProps = {
  city: string;
  offers: Offer[];
}

function FavoritesCity({city, offers}: FavoritesCityProps): JSX.Element {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link">
            <span>{city}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places" >
        <FavoriteCardsList cards={offers.map((item) => ({id: item.id, price: item.price, isFavorite: item.isFavorite, roomName: item.title, roomType: item.type, image: item.previewImage}))} />
      </div>
    </li>
  );
}

export default FavoritesCity;
