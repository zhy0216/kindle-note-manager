import * as React from 'react';
import * as Radium from 'radium';
import {
  Button,
  Tooltip,
  Position,
  Colors,
  ContextMenuTarget,
  Menu,
  MenuItem,
  Intent,
  EditableText, TextArea
} from '@blueprintjs/core';
import { connect } from 'react-redux';
import { RootState } from '../reducers';
import {Clip} from "../types/clip";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
const { clipboard } = require('electron');




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
    const {clip} = this.props;
    const content = clip.editedContent || clip.content;

    return (
        <Menu>
            <MenuItem text="Copy" onClick={() => this.onCopy(content)}/>
            <MenuItem text="Edit" onClick={() => this.setState({edit: true})}/>
            <MenuItem text="Delete" onClick={e => console.log(e.currentTarget)}/>
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
    const {dispatch} = this.props;
    const {value} = this.state;

    this.setState({edit: false})

  }


  render () {
    const {clip} = this.props;
    const {edit, value} = this.state;
    const content = clip.editedContent || clip.content;

    return (
      <div className="clip" style={style.container} onClick={() => (this.onCopy(content))}>
        <div className="divide-line" />
        {edit? <TextArea
          fill
          value={value}
          onChange={(e) => this.setState({value: e.target.value})}
          onBlur={() => this.onTextBlur()}
        />
        : <div style={style.content}>{content}</div>
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
    // "userSelect": "none",
    lineHeight: "1.66em",
  },
};

style.content["userSelect"] = "none"; // void type error

export const ClipComponent = Radium.default(connect()(_ClipComponent));
