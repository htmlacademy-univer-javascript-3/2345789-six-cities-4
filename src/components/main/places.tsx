import Filters from './filters';
import Map from '../map/map';
import CardsList from '../card/cardsList';
import { Offer } from '../../types/offers';
import { useState } from 'react';
import { filters } from '../../const';
import { Point } from '../../types/map';

type PlacesProps = {
    city: string;
    cityOffers: Offer[];
}

function Places({city, cityOffers}: PlacesProps): JSX.Element {
  const points = cityOffers.map((item) => ({
    id: item.id,
    title: item.title,
    lat: item.location.latitude,
    lng: item.location.longitude
  }));
  const [selectedPoint, setSelectedPoint] = useState<Point | undefined>(points[0]);
  const handleListItemHover = (listItemName: string) => {
    const currentPoint = points.find((point) => point.id === listItemName);
    setSelectedPoint(currentPoint);
  };
  const [sortType, setSortType] = useState(filters.POPULAR);
  const handleSort = (newSortType: string) => {
    setSortType(newSortType);
  };

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{cityOffers.length.toString()} places to stay in {city}</b>
        <Filters handleSort={handleSort} />
        <div className="cities__places-list places__list tabs__content">
          <CardsList cards={cityOffers.map((item) => ({id: item.id, price: item.price, rating: item.rating, isFavorite: item.isFavorite, roomName: item.title, roomType: item.type, image: item.previewImage, onListItemHover: handleListItemHover}))} sortType={sortType}/>
        </div>
      </section>
      <div className="cities__right-section">
        <section className="cities__map map">
          <Map city={cityOffers[0].city} points={points} selectedPoint={selectedPoint} height='800px' width='515px' />
        </section>
      </div>
    </div>
  );
}

export default Places;
