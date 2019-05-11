import * as React from 'react';
import * as Radium from 'radium';
import { connect } from 'react-redux';
import { RootState } from '../reducers';
import {BookCollection, bookColletionToClips, Clip} from "../types/clip";
import {ClipComponent} from './Clip';
import {Divider, H3, H4, H5} from '@blueprintjs/core';

interface Props{
  clipsByTitle: BookCollection,
  selectedTitles: string[],
}

class _ClipList extends React.Component<Props> {

  constructor(props) {
    super(props);

    this.state = {

    }
  }

  renderImage() {
    return (<div className="non-clip-image" />)
  }

  render () {
    const {clipsByTitle, selectedTitles} = this.props;
    const selectedTitleSet = new Set(selectedTitles);

    if (Object.keys(clipsByTitle).length === 0) return this.renderImage();

    return (
      <div
        style={style.messageList}
      >
        {Object.keys(clipsByTitle)
          .filter(title => selectedTitles.length === 0 || selectedTitleSet.has(title))
          .map((title, i) => (
          <div key={i}>
            <H5 className="clumped-clip-header">{title}</H5>
            {clipsByTitle[title].map(clip => <ClipComponent
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
    clipsByTitle: clip.clipsByTitle,
    selectedTitles: clip.selectedTitles
  }
})(_ClipList));
