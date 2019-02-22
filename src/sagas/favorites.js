import { takeLatest, call, select } from 'redux-saga/effects';
import { TOGGLE_FAVORITE } from '../actions/favorites';
import { getFavorites } from '../selectors/favorites';

export const saveFavorites = (favorites) => window.localStorage.setItem('favorites', JSON.stringify(favorites));

export const addToCache = async (imageUrls) => {
  const myCache = await window.caches.open('favorites-cache');
  console.log('Adding to cache!');
  await myCache.addAll(imageUrls);
};

export function* storeFavoriteSaga({ payload: gif }) {
  const favorites = yield select(getFavorites);
  yield call(saveFavorites, favorites);

  if (gif) {
    const { images } = gif;
    yield call(addToCache, [
      images.fixed_width_downsampled.url
    ]);
  }
}

export function* watchStoreFavoriteSaga() {
  yield takeLatest(TOGGLE_FAVORITE, storeFavoriteSaga);
}
