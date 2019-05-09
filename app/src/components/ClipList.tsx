import * as React from 'react';
import * as Radium from 'radium';
import { connect } from 'react-redux';
import { RootState } from '../reducers';
import {Clip} from "../types/clip";

interface Props{
  clips: Clip[],

}


class _ClipList extends React.Component<Props> {
  scrollList?: {scrollTop, scrollHeight};

  componentDidUpdate(prevProps, prevState) {
    this.scrollList!.scrollTop = this.scrollList!.scrollHeight;
  }

  render () {
    const {clips} = this.props;

    return (
      <div
        style={style.messageList}
        ref={el => (this.scrollList as any) = el}
      >
        {clips.map((clip, i) => <div>{clip.content}</div>)}
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
