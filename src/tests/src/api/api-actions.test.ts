import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../../../api/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { AppThunkDispatch, extractActionsTypes } from '../../utils';
import { State } from '../../../types/state';
import { fetchOffersAction, fetchSingleOfferAction, fetchСommentsAction, postCommentAction,
  checkAuthAction, loginAction, logoutAction, fetchFavorites, updateFavorite } from '../../../api/api-actions';
import { APIRoutes } from '../../../api/const';
import { AuthData, CommentData, FavoritesData, FavoritesStatus } from '../../../const';
import * as tokenStorage from '../../../token';
import { setUserDataLoadingStatus, requireAuthorization, updateUserLogin, setOffersDataLoadingStatus,
  updateOffers, updateCurrentComments, updateCurrentOffer, setFavoritesDataLoadingStatus, updateFavorites } from '../../../store/action';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({});
  });

  describe('checkAuthAction', () => {
    it('should dispatch "checkAuthAction.pending", "setUserDataLoadingStatus", "requireAuthorization", "setUserDataLoadingStatus", "checkAuthAction.fulfilled"', async () => {
      mockAxiosAdapter.onGet(APIRoutes.UserLogin).reply(200);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        setUserDataLoadingStatus.type,
        requireAuthorization.type,
        setUserDataLoadingStatus.type,
        checkAuthAction.fulfilled.type,
      ]);
    });

    it('should dispatch "checkAuthAction.pending" , setUserDataLoadingStatus, requireAuthorization, setUserDataLoadingStatus, checkAuth.fulfilled when server response 400', async() => {
      mockAxiosAdapter.onGet(APIRoutes.UserLogin).reply(400);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        setUserDataLoadingStatus.type,
        requireAuthorization.type,
        setUserDataLoadingStatus.type,
        checkAuthAction.fulfilled.type
      ]);
    });
  });

  describe('loginAction', () => {
    it('should call loginAction.pending, setUserDataLoadingStatus, updateUserLogin, requireAuthorization, setUserDataLoadingStatus, loginAction.fullfiled', async () => {
      const fakeUser: AuthData = { login: 'test@test.ru', password: 'passwd1' };
      const fakeServerReplay = { token: 'secret' };
      mockAxiosAdapter.onPost(APIRoutes.UserLogin).reply(200, fakeServerReplay);

      await store.dispatch(loginAction(fakeUser));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        setUserDataLoadingStatus.type,
        updateUserLogin.type,
        requireAuthorization.type,
        setUserDataLoadingStatus.type,
        loginAction.fulfilled.type,
      ]);
    });

    it('should call "saveToken" once with the received token', async () => {
      const fakeUser: AuthData = { login: 'test@test.ru', password: 'passwd1' };
      const fakeServerReplay = { token: 'secret' };
      mockAxiosAdapter.onPost(APIRoutes.UserLogin).reply(200, fakeServerReplay);
      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      await store.dispatch(loginAction(fakeUser));

      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveToken).toBeCalledWith(fakeServerReplay.token);
    });
  });

  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending", "logoutAction.fulfilled" when server response 204', async() => {
      mockAxiosAdapter.onDelete(APIRoutes.UserLogout).reply(204);

      await store.dispatch(logoutAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        setUserDataLoadingStatus.type,
        requireAuthorization.type,
        setUserDataLoadingStatus.type,
        logoutAction.fulfilled.type,
      ]);
    });

    it('should one call "dropToken" with "logoutAction"', async () => {
      mockAxiosAdapter.onDelete(APIRoutes.UserLogout).reply(204);
      const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');

      await store.dispatch(logoutAction());

      expect(mockDropToken).toBeCalledTimes(1);
    });
  });

  describe('fetchOffersAction', () => {
    it('should dispatch fetchOffersAction.pending, setOffersDataLoadingStatus, updateOffers, setOffersDataLoadingStatus, fetchOffersAction.fullfiled', async() => {
      const fakeServerReplay = [{city: 'Paris'}];
      mockAxiosAdapter.onGet(APIRoutes.Offers).reply(200, fakeServerReplay);

      await store.dispatch(fetchOffersAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffersAction.pending.type,
        setOffersDataLoadingStatus.type,
        updateOffers.type,
        setOffersDataLoadingStatus.type,
        fetchOffersAction.fulfilled.type,
      ]);
    });
  });

  describe('fetchSingleOfferAction', () => {
    it('should dispatch fetchOffersAction.pending, setOffersDataLoadingStatus, updateCurrentOffer, setOffersDataLoadingStatus, fetchOffersAction.fullfiled', async() => {
      const fakeServerReplay = {city: 'Paris'};
      mockAxiosAdapter.onGet(APIRoutes.Offers.concat('/aaa')).reply(200, fakeServerReplay);

      await store.dispatch(fetchSingleOfferAction({id: 'aaa'}));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchSingleOfferAction.pending.type,
        setOffersDataLoadingStatus.type,
        updateCurrentOffer.type,
        setOffersDataLoadingStatus.type,
        fetchSingleOfferAction.fulfilled.type,
      ]);
    });
  });

  describe('fetchСommentsAction', () => {
    it('should dispatch fetchСommentsAction.pending, setOffersDataLoadingStatus, updateCurrentComments, setOffersDataLoadingStatus, fetchСommentsAction.fulfilled', async() => {
      const fakeServerReplay = [{comment: 'review'}];
      mockAxiosAdapter.onGet(APIRoutes.Comments.concat('/1')).reply(200, fakeServerReplay);

      await store.dispatch(fetchСommentsAction({id: '1'}));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchСommentsAction.pending.type,
        setOffersDataLoadingStatus.type,
        updateCurrentComments.type,
        setOffersDataLoadingStatus.type,
        fetchСommentsAction.fulfilled.type,
      ]);
    });
  });

  describe('postCommentAction', () => {
    it('should call loginAction.pending, setUserDataLoadingStatus, setUserDataLoadingStatus, loginAction.fullfiled', async () => {
      const fakeData: CommentData = { id: 'aaa', comment: 'comment', rating: 5 };
      mockAxiosAdapter.onPost(APIRoutes.Comments.concat('/aaa')).reply(200);

      await store.dispatch(postCommentAction(fakeData));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        postCommentAction.pending.type,
        setUserDataLoadingStatus.type,
        setUserDataLoadingStatus.type,
        postCommentAction.fulfilled.type,
      ]);
    });
  });


  describe('fetchOffersAction', () => {
    it('should dispatch setFavoritesDataLoadingStatus.pending, setFavoritesDataLoadingStatus, updateFavorites, setFavoritesDataLoadingStatus, setFavoritesDataLoadingStatus.fullfiled', async() => {
      const fakeServerReplay = [{city: 'Paris'}];
      mockAxiosAdapter.onGet(APIRoutes.Favourite).reply(200, fakeServerReplay);

      await store.dispatch(fetchFavorites());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFavorites.pending.type,
        setFavoritesDataLoadingStatus.type,
        updateFavorites.type,
        setFavoritesDataLoadingStatus.type,
        fetchFavorites.fulfilled.type,
      ]);
    });
  });

  describe('updateFavorite', () => {
    it('should call updateFavorite.pending, setFavoritesDataLoadingStatus, setFavoritesDataLoadingStatus, updateFavorite.fullfiled', async () => {
      const fakeData: FavoritesData = { id: 'aaa', status: FavoritesStatus.ADD };
      mockAxiosAdapter.onPost(APIRoutes.Favourite.concat('/aaa/1')).reply(200);

      await store.dispatch(updateFavorite(fakeData));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        updateFavorite.pending.type,
        setFavoritesDataLoadingStatus.type,
        setFavoritesDataLoadingStatus.type,
        updateFavorite.fulfilled.type,
      ]);
    });
  });
});

