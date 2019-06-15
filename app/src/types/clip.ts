import * as moment from 'moment';
import { v4String } from 'uuid/interfaces';

export type Clip = {
  id: v4String;
  title: string;
  time: number;
  content: string;
  editedContent?: string;
};

export type BookCollection = {
  [id: string]: Clip[];
};

export function bookColletionToClips(bookCollection: BookCollection): Clip[] {
  return Object.values(bookCollection).reduce((acc, arr) => acc.concat(arr), []);
}

export function clipsToBookCollections(clips: Clip[]): BookCollection {
  const r = {};
  clips.map((clip: Clip) => {
      if (!(clip.title in r)) {
          r[clip.title] = [];
        }

      r[clip.title].push(clip);
    });
  return r;
}
