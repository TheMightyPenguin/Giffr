import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import store from './store';
import theme from './constants/themeConfig';
import { FavoritesProvider } from './providers/Favorites/Favorites.provider';

const AppWrapper = ({ children }) => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <FavoritesProvider>
        {children}
      </FavoritesProvider>
    </ThemeProvider>
  </Provider>
);

export default AppWrapper;
