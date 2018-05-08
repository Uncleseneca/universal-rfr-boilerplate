import { overEvery } from 'lodash';
import { gte as maxWidth, lt as minWidth } from 'lodash/fp';
import { createSelector, createStructuredSelector } from 'reselect';
import {
  getHeightWidth,
  getWindowWidth,
  sizeIdSelector,
} from 'redux-windowsize';

export const merge = (object, ...sources) =>
  Object.assign({}, object, ...sources);

export const sizeId = sizeIdSelector('megaWide', [
  [400, 'tiny'],
  [550, 'skinny'],
  [700, 'average'],
  [900, 'babyGrand'],
  [1100, 'grand'],
  [1300, 'wide'],
  [1500, 'wider'],
]);
export const isNarrow = maxWidth(500);
export const isMedium = overEvery(minWidth(500), maxWidth(1200));
export const isWide = minWidth(1200);

export const mediaSizes = createSelector(getWindowWidth);

export const mediaXY = createSelector(getHeightWidth, mediaSizes, merge);
