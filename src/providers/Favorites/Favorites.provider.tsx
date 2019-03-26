import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { reducer, initialState } from './Favorites.reducer';
import { ReducerType, Context, Props, ActionTypes } from './Favorites.types';

const FavoritesContext = createContext<Context | null>(null);

export const useFavoritesContext = () => useContext<Context>(
  FavoritesContext as React.Context<Context>
);

export const addToCache = async (assetUrls: string[], cacheName: string = 'favorites-cache') => {
  const cache = await window.caches.open(cacheName);
  await cache.addAll(assetUrls);
};

export const FavoritesProvider: React.FunctionComponent<Props> = ({ children }) => {
  const [state, dispatch] = useReducer<ReducerType>(reducer, initialState);
  const favorites = Object.values(state);

  const value: Context = {
    favorites,

    toggleFavorite: async (gif: any) => {
      const { images } = gif;
      addToCache([
        images.fixed_width_downsampled.url,
        images.original.url
      ]);
      dispatch({
        type: ActionTypes.TOGGLE_FAVORITE,
        payload: gif
      });
    },

    isFavorited: (gif: any) => {
      return typeof state[gif.id] !== 'undefined';
    }
  };

  /**
   * STEP 2: Save favorites data for offline usage
   */
  // hey react, everytime a favorite is added or removed,
  // please update the localStorage with the data ❤️
  useEffect(() => {
    window.localStorage.setItem('favorites', JSON.stringify(state));
  }, [favorites.length]);

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
