export const URL_MARKER_DEFAULT =
   'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT =
'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

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
