import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../../../../api/api';
import { State } from '../../../../types/state';
import { Action } from '@reduxjs/toolkit';
import { AppThunkDispatch } from '../../../utils';
import { Provider } from 'react-redux';
import MainScreen from '../../../../components/main/main';
import { AuthorizationStatus } from '../../../../const';

describe('Component: Main', () => {
  const axios = createAPI();
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  const store = mockStoreCreator({
    offers: {
      city: 'Paris',
      cityOffers: []
    },
    user: {
      authorizationStatus: AuthorizationStatus.Unknown
    },
    favorite: {
      favoritesCounter: 0
    }
  });

  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <MainScreen/>
      </Provider>
    );

    expect(screen.getByText('Paris').closest('a')).toHaveClass('tabs__item--active');
    expect(screen.getByText('Cologne').closest('a')).not.toHaveClass('tabs__item--active');
    expect(screen.getByText('Brussels').closest('a')).not.toHaveClass('tabs__item--active');
    expect(screen.getByText('Amsterdam').closest('a')).not.toHaveClass('tabs__item--active');
    expect(screen.getByText('Hamburg').closest('a')).not.toHaveClass('tabs__item--active');
    expect(screen.getByText('Dusseldorf').closest('a')).not.toHaveClass('tabs__item--active');
  });
});
