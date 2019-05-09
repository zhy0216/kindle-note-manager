import * as React from 'react';
import * as Radium from 'radium';
import { connect } from 'react-redux';
import { RootState } from '../reducers';
import { FileMeta } from '../types/folder';

interface Props{
  filesMeta: FileMeta[],

}


class _ClipList extends React.Component<Props> {
  scrollList?: {scrollTop, scrollHeight};

  componentDidUpdate(prevProps, prevState) {
    this.scrollList!.scrollTop = this.scrollList!.scrollHeight;
  }

  render () {
    const {filesMeta} = this.props;

    return (
      <div
        style={style.messageList}
        ref={el => (this.scrollList as any) = el}
      >
        {/*{filesMeta.map((message, i) => {}}*/}
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


export const ClipList = Radium.default(connect(({filesMeta}: RootState) => {

  return {
    ...filesMeta,
  }
})(_ClipList));
