import Header from './header.tsx';
import CardsList from './cardsList.tsx';
import Map from './map.tsx';
import { amsterdam } from './mocks/city.ts';
import { useState } from 'react';
import { Point } from './types/map.ts';
import { useAppDispatch } from './hooks/index.ts';
import { updateOffers } from './store/action.ts';
import { store } from './store/index.ts';


function MainScreen(): JSX.Element {
  const [currentState, setCurrentState] = useState(store.getState());
  const handleCurrentState = () => {
    setCurrentState(store.getState());
  };
  const points = currentState.offers.map((item) => ({
    title: item.name,
    lat: item.coordinates[0],
    lng: item.coordinates[1]
  }));
  const [selectedPoint, setSelectedPoint] = useState<Point | undefined>(points[0]);
  const handleListItemHover = (listItemName: string) => {
    const currentPoint = points.find((point) => point.title === listItemName);
    setSelectedPoint(currentPoint);
  };
  const dispatch = useAppDispatch();
  return (
    <div className="page page--gray page--main">

      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locationslist tabslist">
              <li className="locations__item">
                <a className={currentState.city === 'Paris' ? 'locationsitem-link tabsitem tabs__item--active' : 'locationsitem-link tabsitem'} href="#" onClick={() => {
                  dispatch(updateOffers('Paris'));
                  handleCurrentState();
                }}
                >
                  <span>Paris</span>
                </a>
              </li>
              <li className="locations__item">
                <a className={currentState.city === 'Cologne' ? 'locationsitem-link tabsitem tabs__item--active' : 'locationsitem-link tabsitem'} href="#" onClick={() => {
                  dispatch(updateOffers('Cologne'));
                  handleCurrentState();
                }}
                >
                  <span>Cologne</span>
                </a>
              </li>
              <li className="locations__item">
                <a className={currentState.city === 'Brussels' ? 'locationsitem-link tabsitem tabs__item--active' : 'locationsitem-link tabsitem'} href="#" onClick={() => {
                  dispatch(updateOffers('Brussels'));
                  handleCurrentState();
                }}
                >
                  <span>Brussels</span>
                </a>
              </li>
              <li className="locations__item">
                <a className={currentState.city === 'Amsterdam' ? 'locationsitem-link tabsitem tabs__item--active' : 'locationsitem-link tabsitem'} onClick={() => {
                  dispatch(updateOffers('Amsterdam'));
                  handleCurrentState();
                }}
                >
                  <span>Amsterdam</span>
                </a>
              </li>
              <li className="locations__item">
                <a className={currentState.city === 'Hamburg' ? 'locationsitem-link tabsitem tabs__item--active' : 'locationsitem-link tabsitem'} href="#" onClick={() => {
                  dispatch(updateOffers('Hamburg'));
                  handleCurrentState();
                }}
                >
                  <span>Hamburg</span>
                </a>
              </li>
              <li className="locations__item">
                <a className={currentState.city === 'Dusseldorf' ? 'locationsitem-link tabsitem tabs__item--active' : 'locationsitem-link tabsitem'} href="#" onClick={() => {
                  dispatch(updateOffers('Dusseldorf'));
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
              <b className="places__found">{currentState.offers.length.toString()} places to stay in {currentState.city}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                                Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use href="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="placesoptions placesoptions--custom places__options--opened">
                  <li className="placesoption placesoption--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <div className="cities__places-list places__list tabs__content">
                <CardsList cards={currentState.offers.map((item) => ({id: item.id, price: item.price, isInBookmarks: item.isInBookmarks, roomName: item.name, roomType: item.features[0], onListItemHover: handleListItemHover}))}/>
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map city={amsterdam} points={points} selectedPoint={selectedPoint} height='800px' width='515px' /> # пока захардкожено
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
