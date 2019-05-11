import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux';
import {parse} from './parse';
import {v4String} from "uuid/interfaces";

export const ADD_CLIP = 'ADD_CLIP';
export const ADD_SELECT_TITLE = 'ADD_SELECT_TITLE';
export const SELECT_TITLE = 'SELECT_TITLE';
export const UNSELECT_TITLE = 'UNSELECT_TITLE';
export const UPDATE_CLIP_CONTENT = "UPDATE_CLIP_CONTENT";
export const DELETE_CLIP = "DELETE_CLIP";
export const RESTORE_CLIP = "RESTORE_CLIP";
export const DELETE_BOOK_CLIP = "DELETE_BOOK_CLIP";

export const parseFile = (filePath: string): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    const clips = await parse(filePath);
    dispatch({type: 'ADD_CLIP', clips});

  };

export const addSelectTitle = (title: string) => ({type: ADD_SELECT_TITLE, title});

export const selectTitle = (title: string) => ({type: SELECT_TITLE, title});

export const unselectTitle = (title: string) => ({type: UNSELECT_TITLE, title});

export const updateClipContent = (id: v4String, title: string, content: string) => ({type: UPDATE_CLIP_CONTENT, data: {title, id, content}});

export const deleteClip = (id: v4String, title: string) => ({type: DELETE_CLIP, data: {id, title}});

export const deleteBookClip = (title: string) => ({type: DELETE_BOOK_CLIP, title});
