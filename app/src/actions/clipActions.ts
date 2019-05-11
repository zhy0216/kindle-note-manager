import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AnyAction, Dispatch } from 'redux';

import { Clip } from '../types/clip';
import {parse} from './parse';

export const ADD_CLIP = 'ADD_CLIP';
export const SELECT_TITLE = 'SELECT_TITLE';


export interface AddClipAction {
  clips: Clip[];
  type: 'ADD_CLIP';
}

export const parseFile = (filePath: string): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    const clips = await parse(filePath);
    console.log(clips.slice(0, 4));
    dispatch({type: 'ADD_CLIP', clips});

  };

export const selectTitle = (title: string) => ({type: SELECT_TITLE, title});
