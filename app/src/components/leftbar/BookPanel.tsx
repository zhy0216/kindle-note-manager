import * as React from 'react';
import * as Radium from 'radium';
import { connect } from 'react-redux';
import {
  Button,
  ButtonGroup,
  Card,
  Colors,
  Elevation,
  FormGroup,
  InputGroup,
  HTMLSelect,
  IPanelProps,
  Text,
  PanelStack, Classes
} from '@blueprintjs/core';
import { RootState } from '../../reducers';
import { AnyAction, Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import {BookCollection, Clip} from '../../types/clip';
import {selectTitle} from '../../actions/clipActions';
import {number} from "prop-types";


class _BookPanel extends React.Component<IPanelProps & {dispatch: ThunkDispatch<{}, {}, AnyAction>} & {clipsByTitle: BookCollection}, {}> {

  constructor(props) {
    super(props);


  }

  renderToolbar() {
    return (
      <div>
        <div id="setting-list-container">
          <ButtonGroup minimal={true}>
            <Button icon="help" />
          </ButtonGroup>
        </div>
      </div>
    )
  }

  renderBook(book: {title: string, count: number}, index: number) {
    const {dispatch} = this.props;
    const skeletonClass = false? Classes.SKELETON: ""

    return (
      <Card
        elevation={Elevation.TWO}
        // key={providerFolder.id}
        className={"no-border"}
        style={style.card}
        key={index}
        onClick={() => {
          console.log("click me")
          dispatch(selectTitle(book.title))
        }}
      >
        <div style={{display: "flex", alignItems: "center"}}>
          <Text className={skeletonClass} ellipsize>{book.title}</Text>
          <div className={`bp3-text-small bp3-text-muted ${skeletonClass}`}>{book.count}</div>
        </div>
      </Card>
    )
  }

  renderBookList(bookCollection: BookCollection) {
    return (
      <div style={{height: "500px"}}>
        {Object.keys(bookCollection).sort().map((title, i) => this.renderBook({title, count: bookCollection[title].length }, i))}
      </div>
    )
  }

  render() {
    const {clipsByTitle} = this.props;

    return (
      <div>
        {this.renderToolbar()}
        {this.renderBookList(clipsByTitle)}
      </div>
    )
  }



}

const borderStyle = `1px solid ${Colors.LIGHT_GRAY3}`;

const style = {
  container: {
    width: 300,
    borderRight: borderStyle,
    height: "100%",
  },
  card: {
    borderBottom: borderStyle,
    borderRadius: 0,
    cursor: "pointer",
  },
  cardActive: {
    backgroundColor: Colors.BLUE1,
  },
  preview: {
    height: "2.5em",
    overflow: "hidden",
  },
  addButton: {
  },
  addButtonContainer: {
    position: "fixed",

  }

};

export const BookPanel = connect((state: RootState) => {
  const {clip} = state;

  return {
    clipsByTitle: clip.clipsByTitle
  }
})(_BookPanel);
