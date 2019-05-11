import { Action, Reducer } from 'redux';

import { ADD_CLIP } from '../actions/clipActions';
import {BookCollection, Clip, bookColletionToClips, clipsToBookCollections} from "../types/clip";


export interface ClipState {
  // readonly clips: Clip[];
  readonly clipsByTitle: BookCollection,
  readonly selectedTitle?: string,
}

const defaultState: ClipState = {
  // clips: [],
  clipsByTitle: {

  },
  selectedTitle: undefined
};

export const clipReducer: Reducer<ClipState> = (
    state = defaultState,
    action: Action
) => {
  switch (action.type) {
  case ADD_CLIP:
    const addClipAction = (action as any);
    const clips = bookColletionToClips(state.clipsByTitle);

    const existClips = new Set(clips.map(clip => clip.content));
    const newClips: Clip[] = [...clips, ...(addClipAction.clips.filter(clip => !existClips.has(clip.content)))];
    const r = clipsToBookCollections(newClips.sort((c1, c2) => c1.time - c2.time));

    return {
      clipsByTitle: {
        ...r
      }
    };
  default:
    return state;
  }
};
