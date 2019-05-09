import { Reducer, combineReducers } from 'redux';
import {ClipState, clipReducer} from './clips';

export interface RootState {
  clip: ClipState;
}

export const rootReducer = combineReducers<RootState>({
  clip: clipReducer,
});
