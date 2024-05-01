import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app.tsx';
import { offers } from './mocks/offers.ts';
import { Provider } from 'react-redux';
import { store } from './store/index.ts';
import { fetchOffersAction } from './api/api-actions.ts';

store.dispatch(fetchOffersAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store = {store} >
      <App offers={ offers }/>
    </Provider>
  </React.StrictMode>
);
