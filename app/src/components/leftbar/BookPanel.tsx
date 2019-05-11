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
  OL,
  PanelStack, Classes
} from '@blueprintjs/core';
import { RootState } from '../../reducers';
import { AnyAction, Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import {BookCollection, Clip} from '../../types/clip';
import {selectTitle, unselectTitle, addSelectTitle} from '../../actions/clipActions';
import {number} from "prop-types";


class _BookPanel extends React.Component<IPanelProps & {dispatch: ThunkDispatch<{}, {}, AnyAction>} & {clipsByTitle: BookCollection, selectedTitles: string[]}, {help: boolean}> {
  constructor(props) {
    super(props);
    this.state = {
      help: Object.keys(props.clipsByTitle).length === 0
    }
  }

  renderToolbar() {
    return (
      <div>
        <div id="setting-list-container">
          <ButtonGroup minimal={true}>
            <Button
              icon="help"
              onClick={() => this.setState(prevState => ({help: !prevState.help}))}
            />
          </ButtonGroup>
        </div>
      </div>
    )
  }

  renderHelp() {
    return (
      <div style={{marginTop: "200px"}}>
        <OL>
          <li className="">把你的 kindle 连接你的电脑</li>
          <li>在 Documents 找到 My Clippings.txt</li>
          <li>把文件拖至本程序</li>
        </OL>
      </div>
    )
  }

  renderBook(book: {title: string, count: number}, index: number) {
    const {dispatch, selectedTitles} = this.props;
    const skeletonClass = false? Classes.SKELETON: ""
    const selectedTitleSet = new Set(selectedTitles);
    const selected = selectedTitleSet.has(book.title);

    return (
      <Card
        elevation={Elevation.TWO}
        className={`no-border ${selected? "book-selected": ""}`}
        style={style.card}
        key={index}
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
    const {help} = this.state;

    return (
      <div>
        {this.renderToolbar()}
        {help || Object.keys(clipsByTitle).length === 0? this.renderHelp(): this.renderBookList(clipsByTitle)}
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
    clipsByTitle: clip.clipsByTitle,
    selectedTitles: clip.selectedTitles,
  }
})(_BookPanel);
