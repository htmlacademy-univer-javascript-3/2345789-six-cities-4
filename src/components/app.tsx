import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MainScreen from './main/main.tsx';
import LoginScreen from './login.tsx';
import FavoriteScreen from './favorite/favorites.tsx';
import OfferScreen from './offer/offer.tsx';
import Error404 from '../404.tsx';
import PrivateRoute from './private-route.tsx';
import { useAppSelector } from '../hooks/index.ts';
import LoadingScreen from './loading-screen.tsx';


function App(): JSX.Element {
  const isOffersDataLoading = useAppSelector((state) => state.offers.isOffersDataLoading);
  // const offers = useAppSelector((state) => state.offers);
  const cityOffers = useAppSelector((state) => state.offers.cityOffers);
  if (isOffersDataLoading) {
    return (
      <LoadingScreen />
    );
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<MainScreen />} />
          <Route path="login" element={<LoginScreen />} />
          <Route path="favorites" element={
            <PrivateRoute>
              <FavoriteScreen />
            </PrivateRoute>
          }
          />
          <Route path="offer/">
            <Route path=":id" element={<OfferScreen offers={ cityOffers } />} />
          </Route>
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
