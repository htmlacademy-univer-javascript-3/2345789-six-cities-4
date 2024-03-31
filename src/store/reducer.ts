import { createReducer } from '@reduxjs/toolkit';
import { updateOffers } from './action';
import { offers } from '../mocks/offers';

const initialState = {
  city: 'Amsterdam', // в тех задании сказано, что дефолтный город должен быть Париж, но тестовые данные были сделаны для Амстердама, поэтому пока так
  offers: offers
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(updateOffers, (state, action) => {
      state.city = action.payload;
      state.offers = offers; // тут будет функция получения новых оферов от АПИ, пока мок
    });
});

export default reducer;
