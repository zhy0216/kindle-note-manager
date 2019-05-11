import { Action, Reducer } from 'redux';

import {
  ADD_CLIP,
  ADD_SELECT_TITLE,
  DELETE_CLIP,
  SELECT_TITLE,
  UNSELECT_TITLE,
  UPDATE_CLIP_CONTENT
} from '../actions/clipActions';
import {BookCollection, Clip, bookColletionToClips, clipsToBookCollections} from "../types/clip";


export interface ClipState {
  readonly clipsByTitle: BookCollection,
  readonly selectedTitles: string[],
  readonly _deleted: Clip[];
}

const defaultState: ClipState = {
  clipsByTitle: {

  },
  selectedTitles: [],
  _deleted: [],
};

export const clipReducer: Reducer<ClipState> = (
    state = defaultState,
    action: Action
) => {
  switch (action.type) {

  case ADD_CLIP:
    const addClipAction = (action as any);
    const clips = bookColletionToClips(state.clipsByTitle);

    const existClips = new Set((clips.concat(state["_deleted"])).map(clip => clip.content));
    const newClips: Clip[] = [...clips, ...(addClipAction.clips.filter(clip => !existClips.has(clip.content)))];
    const r = clipsToBookCollections(newClips.sort((c1, c2) => c1.time - c2.time));

    return {
      ...state,
      clipsByTitle: {
        ...r
      }
    };

  case ADD_SELECT_TITLE:
    const addSelectTitleAction = (action as any);

    return {
      ...state,
      selectedTitles: [...state.selectedTitles.filter(title => title !== addSelectTitleAction.title), addSelectTitleAction.title]
    };

  case SELECT_TITLE:
    const selectTitleAction = (action as any);

    return {
      ...state,
      selectedTitles: [selectTitleAction.title]
    };

  case UNSELECT_TITLE:
    const unselectTitleAction = (action as any);

    return {
      ...state,
      selectedTitles: [...state.selectedTitles.filter(title => title !== unselectTitleAction.title)]
    };

  case UPDATE_CLIP_CONTENT:
    const updateClipContentAction = (action as any);
    const data = updateClipContentAction.data;

    return {
      ...state,
      clipsByTitle: {
        ...state.clipsByTitle,
        [data.title]: state.clipsByTitle[data.title].map(clip =>
          clip.id === data.id? {...clip, editedContent: data.content}: clip
        )
      }
    };

  case DELETE_CLIP:
    const deleteClipAction = (action as any);
    const deleteData = deleteClipAction.data;
    const deletedClip = state.clipsByTitle[deleteData.title].filter(clip => clip.id === deleteData.id)[0];

    return {
      ...state,
      clipsByTitle: {
        ...state.clipsByTitle,
        [deleteData.title]: state.clipsByTitle[deleteData.title].filter(clip => clip.id !== deleteData.id),
      },
      _deleted: [...state["_deleted"].filter(clip => clip.content != deletedClip.content), deletedClip]
    };

  default:
    return state;
  }
};
