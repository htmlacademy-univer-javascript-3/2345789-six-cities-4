import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MainScreen from './main.tsx';
import LoginScreen from './login.tsx';
import FavoutiteScreen from './favourites.tsx';
import OfferScreen from './offer.tsx';
import Error404 from './404.tsx';
import PrivateRoute from './private-route.tsx';
import { useAppSelector } from './hooks/index.ts';
import LoadingScreen from './loading-screen.tsx';


function App(): JSX.Element {
  const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);
  const offers = useAppSelector((state) => state.offers);
  const cityOffers = useAppSelector((state) => state.cityOffers);
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
              <FavoutiteScreen offers={offers} />
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
