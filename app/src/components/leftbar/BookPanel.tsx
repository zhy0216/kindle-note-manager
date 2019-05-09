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
import { Provider, ProviderFolder } from '../../types/folder';
import { RootState } from '../../reducers';
import { AnyAction, Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';



class _BookPanel extends React.Component<IPanelProps & {providerFolders: ProviderFolder[], dispatch: ThunkDispatch<{}, {}, AnyAction>}, {}> {

  renderToolbar() {
    return (
      <div>
        <div id="setting-list-container">
          <ButtonGroup minimal={true}>
            <Button icon="help" />
            <Button icon="plus" onClick={() => {}} />
          </ButtonGroup>
        </div>
      </div>
    )
  }

  renderInvalidFolder(providerFolder: ProviderFolder) {
    const {dispatch} = this.props;
    console.log("renderInvalidFolder:", providerFolder)

    return (
      <Card
        elevation={Elevation.TWO}
        key={providerFolder.id}
        className={`no-border`}
        style={style.card}
        onClick={() => {
          dispatch({id: providerFolder.id, type: 'REMOVE_FOLDER'});
        }}
      >
        <div style={{display: "flex", alignItems: "center"}}>
          <div style={{flex: "1", color: Colors.BLUE3, fontsize: "1.1em"}}>{providerFolder.folder.name}</div>
        </div>
        <div className={"bp3-text-small"} style={style.preview}>
          Invalid provider info, please click to edit
        </div>
      </Card>
    );
  }

  renderFolder(providerFolder: ProviderFolder) {
    const {dispatch} = this.props;
    const skeletonClass = providerFolder.valid == null? Classes.SKELETON: ""

    return (
      <Card
        elevation={Elevation.TWO}
        key={providerFolder.id}
        className={"no-border"}
        style={style.card}
        onClick={() => {
          console.log("click")
        }}
      >
        <div style={{display: "flex", alignItems: "center"}}>
          <div className={skeletonClass} style={{flex: "1", color: Colors.BLUE3, fontsize: "1.1em"}}>{providerFolder.folder.name}</div>
          <div className={`bp3-text-small bp3-text-muted ${skeletonClass}`}>3/18/2019</div>
        </div>
        <div className={`bp3-text-small ${skeletonClass}`} style={style.preview}>
          react. Contribute to kingofthestack/react-chat-window development by creating an account on GitHub.
        </div>
      </Card>
    )
  }

  renderFolderList() {
    const {providerFolders} = this.props;
    console.log("providerFolders:", providerFolders)
    return (
      <div style={{height: "500px"}}>
        {providerFolders.map(providerFolder => {
          if (providerFolder.valid === false) return this.renderInvalidFolder(providerFolder);
          else return this.renderFolder(providerFolder);
        })}
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
