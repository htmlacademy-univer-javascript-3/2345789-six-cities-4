import Header from './header.tsx';
import { useState } from 'react';
import { useAppDispatch } from './hooks/index.ts';
import { updateCity } from './store/action.ts';
import { store } from './store/index.ts';
import Places from './places.tsx';


function MainScreen(): JSX.Element {
  const [currentState, setCurrentState] = useState(store.getState().offers);
  const handleCurrentState = () => {
    setCurrentState(store.getState().offers);
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
          <Places city={currentState.city} cityOffers={currentState.cityOffers} />
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
