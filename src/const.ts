export const filters = {
  POPULAR: 'Popular',
  LOW_TO_HIGH: 'Price: low to high',
  HIGH_TO_LOW: 'Price: high to low',
  TOP_RATED: 'Top rated first'
};

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export type UserData = {
  id: number;
  email: string;
  token: string;
};

export type AuthData = {
  login: string;
  password: string;
};

export type CommentData = {
  id: string;
  comment: string;
  rating: number;
};

export enum FavoritesStatus {
  ADD = 1,
  DELETE = 0
}

export type FavoritesData = {
  id: string | undefined;
  status: FavoritesStatus;
};

export const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
