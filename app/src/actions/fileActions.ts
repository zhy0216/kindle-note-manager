import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux';
import {Minio} from 'minio';

import { FileMeta, Folder, Provider, ProviderFolder } from '../types/folder';

export const ADD_FILES_META = 'ADD_FILES_META';


export interface AddFilesMetaAction {
  FilesMeta: FileMeta[];
  type: 'ADD_FILES_META';
}

