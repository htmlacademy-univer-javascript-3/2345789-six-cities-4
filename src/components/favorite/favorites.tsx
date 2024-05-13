import Header from '../header';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFavorites } from '../../api/api-actions';
import LoadingScreen from '../loading-screen';
import FavoritesCity from './favorite-city';
import { CITIES } from '../../const';
import { Offer } from '../../types/offers';


function FavoriteScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorite.favorites);
  const favoritesCounter = useAppSelector((state) => state.favorite.favoritesCounter);
  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch, favoritesCounter]);
  if (!favorites) {
    return <LoadingScreen />;
  }
  const favoriteCities: {city: string; offers: Offer[]}[] = [];
  CITIES.forEach((city) => favoriteCities.push({city: city, offers: favorites.filter((f) => f.city.name === city)}));
  const citiesWithOffers = favoriteCities.filter((city) => city.offers.length > 0);
  if (citiesWithOffers.length === 0) {
    return (
      <div className="page">
        <Header />
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Nothing yet saved</h1>
            </section>
          </div>
        </main>
      </div>
    );
  }
  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {citiesWithOffers.map((item) => (<FavoritesCity key={item.city} city={item.city} offers={item.offers} />))}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"></img>
        </a>
      </footer>
    </div>
  );
}

export default FavoriteScreen;
