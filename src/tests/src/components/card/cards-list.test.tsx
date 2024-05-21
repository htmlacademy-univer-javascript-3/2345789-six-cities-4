import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CardsList from '../../../../components/card/cards-list';
import { filters } from '../../../../const';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createAPI } from '../../../../api/api';
import { AppThunkDispatch } from '../../../utils';
import thunk from 'redux-thunk';
import { Action } from '@reduxjs/toolkit';
import { State } from '../../../../types/state';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AuthorizationStatus } from '../../../../const';
import { sampleCards } from '../../../mock-data';


describe('CardsList component', () => {
  const axios = createAPI();
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  const store = mockStoreCreator({
    offers: {
      city: 'Paris',
    },
    user: {
      authorizationStatus: AuthorizationStatus.Unknown
    },
    favorite: {
      favoritesCounter: 0
    }
  });

  it('should render without crashing', () => {
    render(
      <Provider store={ store } >
        <MemoryRouter initialEntries={['/']}>
          <CardsList cards={sampleCards} />
        </MemoryRouter>
      </Provider>
    );

    sampleCards.forEach((card) => {
      expect(screen.getByText(card.roomName)).toBeInTheDocument();
    });
  });

  it('should sort cards by price low to high when sortType is LOW_TO_HIGH', () => {
    render(
      <Provider store={ store } >
        <MemoryRouter initialEntries={['/']}>
          <CardsList cards={sampleCards} sortType={filters.LOW_TO_HIGH} />
        </MemoryRouter>
      </Provider>
    );

    const sortedCards = sampleCards.sort((a, b) => a.price - b.price);
    sortedCards.forEach((card) => {
      expect(screen.getByText(card.roomName)).toBeInTheDocument();
    });

    const renderedCards = screen.getAllByText(/Room|Suite/);
    sortedCards.forEach((card, index) => {
      expect(renderedCards[index]).toHaveTextContent(card.roomName);
    });
  });

  it('should sort cards by price high to low when sortType is HIGH_TO_LOW', () => {
    render(
      <Provider store={ store } >
        <MemoryRouter initialEntries={['/']}>
          <CardsList cards={sampleCards} sortType={filters.HIGH_TO_LOW} />
        </MemoryRouter>
      </Provider>
    );

    const sortedCards = sampleCards.sort((a, b) => b.price - a.price);
    sortedCards.forEach((card) => {
      expect(screen.getByText(card.roomName)).toBeInTheDocument();
    });

    const renderedCards = screen.getAllByText(/Room|Suite/);
    sortedCards.forEach((card, index) => {
      expect(renderedCards[index]).toHaveTextContent(card.roomName);
    });
  });

  it('should sort cards by rating top rated first when sortType is TOP_RATED', () => {
    render(
      <Provider store={ store } >
        <MemoryRouter initialEntries={['/']}>
          <CardsList cards={sampleCards} sortType={filters.TOP_RATED} />
        </MemoryRouter>
      </Provider>
    );

    const sortedCards = sampleCards.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    sortedCards.forEach((card) => {
      expect(screen.getByText(card.roomName)).toBeInTheDocument();
    });

    const renderedCards = screen.getAllByText(/Room|Suite/);
    sortedCards.forEach((card, index) => {
      expect(renderedCards[index]).toHaveTextContent(card.roomName);
    });
  });
});
