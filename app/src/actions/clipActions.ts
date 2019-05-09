import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux';

import { Clip } from '../types/clip';

export const ADD_CLIP = 'ADD_CLIP';


export interface AddClipAction {
  filePath: string;
  type: 'ADD_CLIP';
}

export const parseFile = (filePath: string): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {


  };
