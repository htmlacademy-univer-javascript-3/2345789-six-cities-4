import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MainScreen from './main.tsx';
import LoginScreen from './login.tsx';
import FavoutiteScreen from './favourites.tsx';
import OfferScreen from './offer.tsx';
import Error404 from './404.tsx';
import PrivateRoute from './private-route.tsx';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<MainScreen placesToStay='69'/>} />
          <Route path="login" element={<LoginScreen />} />
          <Route path="favorites" element={
            <PrivateRoute>
              <FavoutiteScreen />
            </PrivateRoute>
          }
          />
          <Route path="offer/">
            <Route path=":id" element={<OfferScreen offers={['offer1', 'offer2']} />} />
          </Route>
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
