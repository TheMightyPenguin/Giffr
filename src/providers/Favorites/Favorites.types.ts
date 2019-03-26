import { Reducer } from 'react';

export interface Favorites {
  id: string;
}

export type FavoritesRecord = Record<string, Favorites>;

export interface Context {
  toggleFavorite(id: string): void;
  isFavorited(gif: any): boolean;
  favorites: Favorites[];
}

export interface Props {
  children(ctx: Context): JSX.Element;
}

export type State = FavoritesRecord;

export enum ActionTypes {
  TOGGLE_FAVORITE
}

export interface Action {
  type: ActionTypes;
  payload: any;
}

export type ReducerType = Reducer<State, Action>;

