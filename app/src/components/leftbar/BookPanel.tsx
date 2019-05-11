import * as React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  ButtonGroup,
  IPanelProps,
  OL,
} from '@blueprintjs/core';
import { RootState } from '../../reducers';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import {BookCollection,} from '../../types/clip';
import {BookComponent} from "./Book";

type Props = {
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  clipsByTitle: BookCollection,
  selectedTitles: string[]
} & IPanelProps


class _BookPanel extends React.Component<Props, {help: boolean}> {
  constructor(props) {
    super(props);
    this.state = {
      help: Object.keys(props.clipsByTitle).length === 0
    }
  }

  componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
    if (this.state.help) {
      this.setState({help : Object.keys(nextProps.clipsByTitle).length === 0})
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
          <li>把你的 kindle 连接你的电脑</li>
          <li>在 Documents 找到 My Clippings.txt</li>
          <li>把文件拖至本程序</li>
        </OL>
      </div>
    )
  }

  renderBookList(bookCollection: BookCollection) {
    const {selectedTitles} = this.props;

    return (
      <div style={{height: "500px"}}>
        {Object.keys(bookCollection).sort().map((title, i) => <BookComponent
          key={i}
          book={{title: title, count: bookCollection[title].length}}
          selected={selectedTitles.indexOf(title) > -1}
        />)}
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

export const BookPanel = connect((state: RootState) => {
  const {clip} = state;
  console.log(clip)
  return {
    clipsByTitle: clip.clipsByTitle,
    selectedTitles: clip.selectedTitles,
  }
})(_BookPanel);
