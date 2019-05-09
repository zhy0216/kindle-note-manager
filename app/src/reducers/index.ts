import { Reducer, combineReducers } from 'redux';
import { filesMetaReducer, FilesmetaState } from './filesmeta';
import { ADD_FILES_META } from '../actions/fileActions';

export interface RootState {
  filesMeta: FilesmetaState;
}

export const rootReducer = combineReducers<RootState | undefined>({
  filesMeta: filesMetaReducer,
});
