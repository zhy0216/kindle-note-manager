import * as React from 'react';
import * as Radium from 'radium';
import { Button, Tooltip, Position, Colors, ContextMenuTarget, Menu, MenuItem, Intent } from '@blueprintjs/core';
import { connect } from 'react-redux';
import { RootState } from '../reducers';
import {Clip} from "../types/clip";




@ContextMenuTarget
class _ClipComponent extends React.Component<{clip: Clip}> {

  componentDidUpdate(prevProps, prevState) {
  }

  public renderContextMenu() {
        // return a single element, or nothing to use default browser behavior
    return (
        <Menu>
            <MenuItem text="Edit" />
            <MenuItem text="Delete" />
        </Menu>
    );
  }

  public onContextMenuClose() {
        // Optional method called once the context menu is closed.
  }

  render () {
    const {clip} = this.props;

    return (
      <div className="clip" style={style.container}>
        <div className="divide-line" />
        <div style={style.content}>{clip.editedContent || clip.content}</div>
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
    // cursor: "pointer",
    // "userSelect": "none",
    lineHeight: "1.66em",
  },
};

style.content["userSelect"] = "none"; // void type error

export const ClipComponent = Radium.default(_ClipComponent);
