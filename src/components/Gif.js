import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectedGifChange } from '../actions/selected';
import { useFavoritesContext } from '../providers/Favorites/Favorites.provider';

const FAVORITE_ICON = '⭐';

export const StyledGif = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

export const StyledFavoritedIcon = styled.a`
  cursor: pointer;
  transition: filter .15s ease;
  content: '${FAVORITE_ICON}';
  position: absolute;
  bottom: 10px;
  right: 10px;
  ${({ active }) => active ? '' : `filter: grayscale(100%);`}

  &:hover: {
    text-shadow: -1px 0px 4px rgba(20, 20, 20, 1);
  }
`;

export const Gif = ({ big, gif, selectedGifChange }) => {
  const src = !big
    ? gif.images.fixed_width_downsampled.url
    : gif.images.original.url;

  const { isFavorited, toggleFavorite } = useFavoritesContext();

  return (
    <React.Fragment>
      <StyledFavoritedIcon
        onClick={() => {
          toggleFavorite(gif);
        }}
        active={isFavorited(gif)}
      >
        {FAVORITE_ICON}
      </StyledFavoritedIcon>
      <Link to={`?gifId=${gif.id}`}>
        <StyledGif src={src} onClick={() => selectedGifChange(gif)} />
      </Link>
    </React.Fragment>
  );
};

const mapDispatchToProps = {
  selectedGifChange
};

export default connect(null, mapDispatchToProps)(Gif);
