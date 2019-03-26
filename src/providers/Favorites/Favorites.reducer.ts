import { State, Action, ActionTypes, FavoritesRecord } from './Favorites.types';

const getInitialFavorites = (): FavoritesRecord => {
  const storedFavorites = JSON.parse(window.localStorage.getItem('favorites') || '{}') as FavoritesRecord;
  return storedFavorites;
};

export const initialState: State = getInitialFavorites();

export const reducer = (state: State, { type, payload }: Action) => {
  switch (type) {
    case ActionTypes.TOGGLE_FAVORITE: {
      const newState = { ...state };

      if (typeof state[payload.id] !== 'undefined') {
        delete newState[payload.id];
      } else {
        newState[payload.id] = payload;
      }

      return newState;
    }

    default: {
      return state;
    }
  }
};
