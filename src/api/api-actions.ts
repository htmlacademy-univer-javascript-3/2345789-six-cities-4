import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { Offer, FullOffer, Comment } from '../types/offers';
import { updateOffers, setOffersDataLoadingStatus, updateCurrentOffer, updateCurrentComments } from '../store/action';
import { APIRoutes } from './const';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Offer[]>(APIRoutes.Offers);
    dispatch(setOffersDataLoadingStatus(true));
    dispatch(updateOffers(data));
    dispatch(setOffersDataLoadingStatus(false));
  },
);

export const fetchSingleOfferAction = createAsyncThunk<void, { id: string | undefined}, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
  'data/fetchSingleOffer',
  async ({ id }, {dispatch, extra: api}) => {
    const {data} = await api.get<FullOffer>(APIRoutes.Offers.concat(`/${id}`));
    dispatch(setOffersDataLoadingStatus(true));
    dispatch(updateCurrentOffer(data));
    dispatch(setOffersDataLoadingStatus(false));
  },
);

export const fetchСommentsAction = createAsyncThunk<void, { id: string | undefined}, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
  'data/fetchComments',
  async ({ id }, {dispatch, extra: api}) => {
    const {data} = await api.get<Comment[]>(APIRoutes.Comments.concat(`/${id}`));
    dispatch(setOffersDataLoadingStatus(true));
    dispatch(updateCurrentComments(data));
    dispatch(setOffersDataLoadingStatus(false));
  },
);
