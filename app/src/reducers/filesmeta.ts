import { Action, Reducer } from 'redux';

import { FileMeta, Folder, Provider, ProviderFolder } from '../types/folder';
import { ADD_FILES_META } from '../actions/fileActions';


export interface FilesmetaState {
  readonly filesMeta: FileMeta[];
}

const defaultState: FilesmetaState = {
  filesMeta: []
};

export const filesMetaReducer: Reducer<FilesmetaState> = (
    state = defaultState,
    action: Action
) => {
  console.log(action)
  switch (action.type) {
  case ADD_FILES_META:
    const addFilesMetaAction = (action as any);
    const set = new Set([...state.filesMeta, ...addFilesMetaAction.filesMeta]);

    return {
      ...state,
      filesMeta: Array.from(set).sort()
    };
  default:
    return state;
  }
};
