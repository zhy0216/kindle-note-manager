import { clipboard } from 'electron';
import * as React from 'react';
import * as Radium from 'radium';
import {
  Card,
  Classes,
  Colors,
  ContextMenuTarget, Elevation,
  Menu,
  MenuItem, Text,
  TextArea
} from '@blueprintjs/core';
import { connect } from 'react-redux';
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {addSelectTitle, selectTitle, unselectTitle, deleteBookClip} from "../../actions/clipActions";

@ContextMenuTarget
class _BookComponent extends React.Component<{dispatch: ThunkDispatch<{}, {}, AnyAction>} & {book: {title: string, count: number}, selected: boolean}, {edit: boolean, value: string}> {

  public renderContextMenu() {
    const {dispatch, book} = this.props;

    return (
        <Menu>
            <MenuItem text="Delete" onClick={() => dispatch(deleteBookClip(book.title))}/>
        </Menu>
    );
  }

  public onContextMenuClose() {
        // Optional method called once the context menu is closed.
  }


  render () {
    const {dispatch, selected, book} = this.props;

    return (
      <Card
        elevation={Elevation.TWO}
        className={`no-border no-select ${selected? "book-selected": ""}`}
        style={style.card}
        onClick={() => {
          if (selected){
            dispatch(unselectTitle(book.title))
          } else {
            dispatch(addSelectTitle(book.title))
          }
        }}
        onDoubleClick={() => dispatch(selectTitle(book.title))}
      >
        <div style={{display: "flex", alignItems: "center", justifyContent: "space-between",}}>
          <Text ellipsize>{book.title}</Text>
          <div className={`bp3-text-small bp3-text-muted`}>{book.count}</div>
        </div>
      </Card>
    )
  }
}

const borderStyle = `1px solid ${Colors.LIGHT_GRAY3}`;

const style = {
  card: {
    borderBottom: borderStyle,
    borderRadius: 0,
    cursor: "pointer",
  },
};

export const BookComponent = Radium.default(connect()(_BookComponent));
