import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { Offer, FullOffer, Comment } from '../types/offers';
import { updateOffers, setOffersDataLoadingStatus, updateCurrentOffer, updateCurrentComments, requireAuthorization, updateUserLogin,
  setUserDataLoadingStatus, setFavoritesDataLoadingStatus, updateFavorites } from '../store/action';
import { APIRoutes } from './const';
import { AuthorizationStatus, UserData, AuthData, CommentData, FavoritesData } from '../const';
import { saveToken, dropToken } from '../token';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Offer[]>(APIRoutes.Offers);
      dispatch(setOffersDataLoadingStatus(true));
      dispatch(updateOffers(data));
    } catch {
      dispatch(updateOffers([]));
    } finally {
      dispatch(setOffersDataLoadingStatus(false));
    }
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
    dispatch(setOffersDataLoadingStatus(true));
    const {data} = await api.get<Comment[]>(APIRoutes.Comments.concat(`/${id}`));
    dispatch(updateCurrentComments(data));
    dispatch(setOffersDataLoadingStatus(false));
  },
);

export const postCommentAction = createAsyncThunk<void, CommentData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/postCommentAction',
  async ({id, comment, rating}, {dispatch, extra: api}) => {
    dispatch(setUserDataLoadingStatus(true));
    await api.post<UserData>(APIRoutes.Comments.concat(`/${id}`), {comment, rating});
    dispatch(setUserDataLoadingStatus(false));
  },
);


export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      dispatch(setUserDataLoadingStatus(true));
      const {data: {email}} = await api.get<UserData>(APIRoutes.UserLogin);
      dispatch(updateUserLogin(email));
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    } finally {
      dispatch(setUserDataLoadingStatus(false));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login, password}, {dispatch, extra: api}) => {
    try {
      dispatch(setUserDataLoadingStatus(true));
      const {data: {token, email}} = await api.post<UserData>(APIRoutes.UserLogin, {email: login, password});
      dispatch(updateUserLogin(email));
      saveToken(token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(setUserDataLoadingStatus(false));
    } finally {
      dispatch(setUserDataLoadingStatus(false));
    }
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setUserDataLoadingStatus(true));
    await api.delete(APIRoutes.UserLogout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    dispatch(setUserDataLoadingStatus(false));
  },
);

export const fetchFavorites = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'favorites/fetchFavorites',
  async (_arg, {dispatch, extra: api}) => {
    try {
      dispatch(setFavoritesDataLoadingStatus(true));
      const { data } = await api.get<Offer[]>(APIRoutes.Favourite);
      dispatch(updateFavorites(data));
    } catch {
      dispatch(updateFavorites([]));
    } finally {
      dispatch(setFavoritesDataLoadingStatus(false));
    }
  },
);

export const updateFavorite = createAsyncThunk<void, FavoritesData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'favorites/updateFavorite',
  async ({id, status}, {dispatch, extra: api}) => {
    dispatch(setFavoritesDataLoadingStatus(true));
    await api.post<UserData>(APIRoutes.Favourite.concat(`/${id}/${status}`));
    dispatch(setFavoritesDataLoadingStatus(false));
  },
);
