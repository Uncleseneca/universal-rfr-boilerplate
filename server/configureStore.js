import createHistory from 'history/createMemoryHistory';
import queryString from 'query-string';
import { NOT_FOUND } from 'redux-first-router';
import { isEmpty } from 'lodash';
import configureStore from '../src/configureStore';

export default async (req, res) => {
  const path =
    req.path +
    (isEmpty(req.query) ? '' : `?${queryString.stringify(req.query)}`);
  const history = createHistory({ initialEntries: [path] });
  const { store, thunk } = configureStore(history);

  await thunk(store); // THE PAYOFF BABY!

  const location = store.getState().location;
  if (doesRedirect(location, res)) return false;

  const status = location.type === NOT_FOUND ? 404 : 200;
  res.status(status);
  return store;
};

const doesRedirect = ({ kind, pathname }, res) => {
  if (kind === 'redirect') {
    res.redirect(302, pathname);
    return true;
  }
};
