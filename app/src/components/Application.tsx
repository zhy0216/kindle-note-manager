import * as React from 'react';
import { LeftBar } from './leftbar/LeftBar';
import {ClipList} from './ClipList';


const Application = () => (
  <div style={{height: "100%", display: "flex"}}>
    <LeftBar />
    <div style={{display: "flex", flex: 1, flexDirection: "column"}}>
      <ClipList
        messages={[1,2,3,4,5,5,6,7]}
      />
    </div>
  </div>
);

export default Application;
