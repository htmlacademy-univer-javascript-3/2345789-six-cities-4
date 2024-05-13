import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app.tsx';
import { Provider } from 'react-redux';
import { store } from './store/index.ts';
import { fetchOffersAction, checkAuthAction, fetchFavorites } from './api/api-actions.ts';

store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction());
store.dispatch(fetchFavorites());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store = {store} >
      <App />
    </Provider>
  </React.StrictMode>
);
