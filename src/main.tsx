import Header from './header.tsx';
import { Offer } from './types/offers.ts';
import CardsList from './cardsList.tsx';
import Map from './map.tsx';
import { amsterdam } from './mocks/city.ts';
import { useState } from 'react';
import { Point } from './types/map.ts';

type MainProps = {
    placesToStay: string;
    offers: Offer[];
}

function MainScreen({placesToStay, offers}: MainProps): JSX.Element {
  const points = offers.map((item) => ({
    title: item.name,
    lat: item.coordinates[0],
    lng: item.coordinates[1]
  }));
  const [selectedPoint, setSelectedPoint] = useState<Point | undefined>(points[0]);
  const handleListItemHover = (listItemName: string) => {
    const currentPoint = points.find((point) => point.title === listItemName);
    setSelectedPoint(currentPoint);
  };
  return (
    <div className="page page--gray page--main">

      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locationslist tabslist">
              <li className="locations__item">
                <a className="locationsitem-link tabsitem" href="#">
                  <span>Paris</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locationsitem-link tabsitem" href="#">
                  <span>Cologne</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locationsitem-link tabsitem" href="#">
                  <span>Brussels</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locationsitem-link tabsitem tabs__item--active">
                  <span>Amsterdam</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locationsitem-link tabsitem" href="#">
                  <span>Hamburg</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locationsitem-link tabsitem" href="#">
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
              <b className="places__found">{placesToStay} places to stay in Amsterdam</b>
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
                <CardsList cards={offers.map((item) => ({id: item.id, price: item.price, isInBookmarks: item.isInBookmarks, roomName: item.name, roomType: item.features[0], onListItemHover: handleListItemHover}))}/>
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map city={amsterdam} points={points} selectedPoint={selectedPoint} height='800px' width='515px' />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
