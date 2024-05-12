import { createAction } from '@reduxjs/toolkit';
import { Offer, FullOffer, Comment } from '../types/offers';
import {AuthorizationStatus} from '../const';

export const updateOffers = createAction('updateOffers',
  (value: Offer[]) => ({
    payload: value
  })
);

export const updateCity = createAction<string>('updateCity');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

export const setUserDataLoadingStatus = createAction<boolean>('data/setUserDataLoadingStatus');

export const updateCurrentOffer = createAction<FullOffer>('data/updateCurrentOffer');

export const updateCurrentComments = createAction<Comment[]>('data/updateCurrentComments');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const updateUserLogin = createAction<string | null>('user/updateUserLogin');
