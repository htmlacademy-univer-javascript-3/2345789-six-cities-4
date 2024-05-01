import { createAction } from '@reduxjs/toolkit';
import { Offer, FullOffer, Comment } from '../types/offers';

export const updateOffers = createAction('updateOffers',
  (value: Offer[]) => ({
    payload: value
  })
);

export const updateCity = createAction<string>('updateCity');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

export const updateCurrentOffer = createAction<FullOffer>('data/updateCurrentOffer');

export const updateCurrentComments = createAction<Comment[]>('data/updateCurrentComments');
