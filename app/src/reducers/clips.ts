import { Action, Reducer } from 'redux';

import { ADD_CLIP } from '../actions/clipActions';
import {Clip} from "../types/clip";


export interface ClipState {
  readonly clips: Clip[];
}

const defaultState: ClipState = {
  clips: []
};

export const clipReducer: Reducer<ClipState> = (
    state = defaultState,
    action: Action
) => {
  switch (action.type) {
  case ADD_CLIP:
    const addClipAction = (action as any);
    const existClips = new Set(state.clips.map(clip => clip.content));


    return {
      ...state,
      clips: [...state.clips, ...(addClipAction.clips.filter(clip => !existClips.has(clip.content)))]
    };
  default:
    return state;
  }
};
