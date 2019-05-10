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
  PanelStack, Classes
} from '@blueprintjs/core';
import { RootState } from '../../reducers';
import { AnyAction, Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';



class _BookPanel extends React.Component<IPanelProps & {dispatch: ThunkDispatch<{}, {}, AnyAction>}, {}> {

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


  renderFolder() {
    const {dispatch} = this.props;
    const skeletonClass = true? Classes.SKELETON: ""

    return (
      <Card
        elevation={Elevation.TWO}
        // key={providerFolder.id}
        className={"no-border"}
        style={style.card}
        onClick={() => {
          console.log("click")
        }}
      >
        <div style={{display: "flex", alignItems: "center"}}>
          <div className={skeletonClass} style={{flex: "1", color: Colors.BLUE3, fontsize: "1.1em"}}>{}</div>
          <div className={`bp3-text-small bp3-text-muted ${skeletonClass}`}>3/18/2019</div>
        </div>
        <div className={`bp3-text-small ${skeletonClass}`} style={style.preview}>
          react. Contribute to kingofthestack/react-chat-window development by creating an account on GitHub.
        </div>
      </Card>
    )
  }

  renderFolderList() {
    return (
      <div style={{height: "500px"}}>
        {/*{providerFolders.map(providerFolder => {*/}
        {/*  if (providerFolder.valid === false) return this.renderInvalidFolder(providerFolder);*/}
        {/*  else return this.renderFolder(providerFolder);*/}
        {/*})}*/}
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderToolbar()}
        {this.renderFolderList()}
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
  const {} = state;
  return {
  }
})(_BookPanel);
