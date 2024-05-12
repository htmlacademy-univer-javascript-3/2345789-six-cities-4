import Header from './header.tsx';
import CardsList from './cardsList.tsx';
import Map from './map.tsx';
import { useState } from 'react';
import { Point } from './types/map.ts';
import { useAppDispatch } from './hooks/index.ts';
import { updateCity } from './store/action.ts';
import { store } from './store/index.ts';
import { filters } from './const.ts';
import Filters from './filters.tsx';


function MainScreen(): JSX.Element {
  const [currentState, setCurrentState] = useState(store.getState());
  const handleCurrentState = () => {
    setCurrentState(store.getState());
  };
  const points = currentState.cityOffers.map((item) => ({
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
  const dispatch = useAppDispatch();
  return (
    <div className="page page--gray page--main">

      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              <li className="locations__item">
                <a className={currentState.city === 'Paris' ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item'} onClick={() => {
                  dispatch(updateCity('Paris'));
                  handleCurrentState();
                }}
                >
                  <span>Paris</span>
                </a>
              </li>
              <li className="locations__item">
                <a className={currentState.city === 'Cologne' ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item'} href="#" onClick={() => {
                  dispatch(updateCity('Cologne'));
                  handleCurrentState();
                }}
                >
                  <span>Cologne</span>
                </a>
              </li>
              <li className="locations__item">
                <a className={currentState.city === 'Brussels' ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item'} href="#" onClick={() => {
                  dispatch(updateCity('Brussels'));
                  handleCurrentState();
                }}
                >
                  <span>Brussels</span>
                </a>
              </li>
              <li className="locations__item">
                <a className={currentState.city === 'Amsterdam' ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item'} onClick={() => {
                  dispatch(updateCity('Amsterdam'));
                  handleCurrentState();
                }}
                >
                  <span>Amsterdam</span>
                </a>
              </li>
              <li className="locations__item">
                <a className={currentState.city === 'Hamburg' ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item'} href="#" onClick={() => {
                  dispatch(updateCity('Hamburg'));
                  handleCurrentState();
                }}
                >
                  <span>Hamburg</span>
                </a>
              </li>
              <li className="locations__item">
                <a className={currentState.city === 'Dusseldorf' ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item'} href="#" onClick={() => {
                  dispatch(updateCity('Dusseldorf'));
                  handleCurrentState();
                }}
                >
                  <span>Dusseldorf</span>
                </a>
              </li>
            </ul>
          </section>
        </div>

        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{currentState.cityOffers.length.toString()} places to stay in {currentState.city}</b>
              <Filters handleSort={handleSort} />
              <div className="cities__places-list places__list tabs__content">
                <CardsList cards={currentState.cityOffers.map((item) => ({id: item.id, price: item.price, rating: item.rating, roomName: item.title, roomType: item.type, image: item.previewImage, onListItemHover: handleListItemHover}))} sortType={sortType}/>
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map city={currentState.cityOffers[0].city} points={points} selectedPoint={selectedPoint} height='800px' width='515px' />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
