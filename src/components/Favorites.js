import React from 'react';
import { connect } from 'react-redux';
import GifGallery from './GifGallery';
import { useFavoritesContext } from '../providers/Favorites/Favorites.provider';
import { getQuery } from '../selectors/search';

export const Favorites = ({ query }) => {
  const { favorites } = useFavoritesContext();

  const fileteredFavorites = favorites.filter(favorite => {
    return query.length === 0 || favorite.title.includes(query);
  });

  const anyFavorite = favorites.length > 0;

  if (!anyFavorite) {
    return 'No favorites have been selected so far 😿';
  }

  if (fileteredFavorites.length < 1) {
    return 'No favorites matches the search 🔍';
  }

  return (
    <GifGallery gifs={fileteredFavorites} />
  );
}

const mapStateToProps = state => ({
  query: getQuery(state)
});

export default connect(mapStateToProps)(Favorites);
