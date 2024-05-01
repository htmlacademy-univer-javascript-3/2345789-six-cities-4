import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offers';

export const updateOffers = createAction('updateOffers',
  (value: Offer[]) => ({
    payload: value
  })
);

export const updateCity = createAction('updateCity',
  (value: string) => ({
    payload: value
  })
);

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');
