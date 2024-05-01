import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { Offer } from '../types/offers';
import { updateOffers, setOffersDataLoadingStatus } from '../store/action';
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

