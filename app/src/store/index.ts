import { combineReducers, compose, applyMiddleware, createStore, Store } from 'redux';
import * as thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { rootReducer, RootState } from '../reducers';

const configureStore = (initialState?: RootState): Store<RootState | undefined> => {
  const middlewares: any[] = [thunk.default];
  const enhancer = composeWithDevTools(applyMiddleware(...middlewares));
  return createStore(
    rootReducer,
    initialState,
    enhancer
  );
};

const store = configureStore();

if (typeof module.hot !== 'undefined') {
  module.hot.accept('../reducers', () =>
    store.replaceReducer(require('../reducers').rootReducer)
  );
}

export default store;
