import { clipboard } from 'electron';
import * as React from 'react';
import * as Radium from 'radium';
import {
  Colors,
  ContextMenuTarget,
  Menu,
  MenuItem,
  TextArea
} from '@blueprintjs/core';
import { connect } from 'react-redux';
import {Clip} from "../types/clip";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {updateClipContent, deleteClip} from '../actions/clipActions';

@ContextMenuTarget
class _ClipComponent extends React.Component<{dispatch: ThunkDispatch<{}, {}, AnyAction>} & {clip: Clip}, {edit: boolean, value: string}> {

  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      value: props.clip.editedContent || props.clip.content,
    }
  }

  componentDidUpdate(prevProps, prevState) {
  }

  public renderContextMenu() {
    const {dispatch, clip} = this.props;
    const content = clip.editedContent || clip.content;

    return (
        <Menu>
            <MenuItem text="Copy" onClick={() => this.onCopy(content)}/>
            <MenuItem text="Edit" onClick={() => this.setState({edit: true})}/>
            <MenuItem text="Delete" onClick={() => dispatch(deleteClip(clip.id, clip.title))}/>
        </Menu>
    );
  }

  public onContextMenuClose() {
        // Optional method called once the context menu is closed.
  }

  onCopy(text) {
    clipboard.writeText(text)
  }

  onTextBlur() {
    const {dispatch, clip} = this.props;
    const {value} = this.state;

    this.setState({edit: false});
    dispatch(updateClipContent(clip.id, clip.title, value));
  }


  render () {
    const {clip} = this.props;
    const {edit, value} = this.state;
    const content = clip.editedContent || clip.content;

    return (
      <div className="clip"
           style={style.container}
           onClick={() => (this.onCopy(content))}
           onDoubleClick={() => this.setState({edit: true})}
      >
        <div className="divide-line" />
        {edit? <TextArea
          fill
          value={value}
          onChange={(e) => this.setState({value: e.target.value})}
          onBlur={() => this.onTextBlur()}
        />
        : <div className="no-select" style={style.content}>{content}</div>
        }
        <div
          style={{display: "flex", flexDirection: "column"}}
        >
        </div>
      </div>)
  }
}

const style = {
  container: {
    display: "flex",
    padding: "10px 0 0",
  },
  datetime: {
    borderBottom: `3px solid ${Colors.BLUE3}`,
    paddingBottom: "3px",
  },
  content: {
    flex: 1,
    cursor: "default",
    lineHeight: "1.66em",
  },
};


export const ClipComponent = Radium.default(connect()(_ClipComponent));
