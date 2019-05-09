import * as React from 'react';
import * as Radium from 'radium';
import { connect } from 'react-redux';
import {
    Colors,
    PanelStack
} from '@blueprintjs/core';
import { BookPanel } from './BookPanel';


class _LeftBar extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id="left-bar" style={style.container}>
        <PanelStack
          initialPanel={{ component: BookPanel}}
        />
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
  addButton: {
  },
  addButtonContainer: {
    position: "fixed",

  }

};

// @ts-ignore
export const LeftBar = Radium.default(connect()(_LeftBar));

