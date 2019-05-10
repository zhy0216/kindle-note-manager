import * as React from 'react';
import * as Radium from 'radium';
import { connect } from 'react-redux';
import { RootState } from '../reducers';
import {Clip} from "../types/clip";
import {ClipComponent} from './Clip';
import {Divider, H3, H4, H5} from '@blueprintjs/core';

interface Props{
  clips: Clip[],

}

function clumpClips(clips: Clip[]): {title: string, clips: Clip[]}[] {
  const r: Clip[][] = [];

  for (let clip of clips) {
    if (r.length === 0 || r[r.length - 1][0].title !== clip.title) {
      r.push([clip])
    } else {
        r[r.length - 1].push(clip)
    }
  }

  return r.map(clips => ({
    title: clips[0].title,
    clips
  }))
}

class _ClipList extends React.Component<Props> {

  componentDidUpdate(prevProps, prevState) {
  }

  render () {
    const {clips} = this.props;

    return (
      <div
        style={style.messageList}
      >
        {clumpClips(clips).map(clumpedClips => (
          <div>
            <H5 className="clumped-clip-header">{clumpedClips.title}</H5>
            {clumpedClips.clips.map(clip => <ClipComponent
              clip={clip}
              key={clip.id}
            />)}
            <Divider style={{marginTop: "25px", marginBottom: "25px"}} />
          </div>
        ))}
      </div>)
  }
}

const style = {
  messageList: {
    "overflow-y": "auto",
    backgroundColor: "white",
    backgroundSize: "100%",
    padding: "20px 30px",
    flex: 1
  }
};


export const ClipList = Radium.default(connect(({clip}: RootState) => {

  return {
    clips: clip.clips,
  }
})(_ClipList));
