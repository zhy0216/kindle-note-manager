import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import Application from './components/Application';
import store from './store';
import {parseFile, RESTORE_CLIP} from './actions/clipActions';

require('./app.scss');

// Create main element
const mainElement = document.createElement('div');
mainElement.setAttribute("id", "root");
document.body.appendChild(mainElement);

mainElement.ondrop = (event) => {
  event.preventDefault();

  // @ts-ignore
  for (let f of event.dataTransfer.files) {
    // @ts-ignore
    store.dispatch(parseFile(f.path));
  }

  return false;
};

mainElement.ondragover = () => {
    return false;
};

mainElement.ondragleave = () => {
    return false;
};

mainElement.ondragend = () => {
    return false;
};
// Render components
const render = (Component: () => JSX.Element) => {
  ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Component />
            </Provider>
        </AppContainer>,
        mainElement
    );
};
localStorage.clip && store.dispatch({type: RESTORE_CLIP, data: JSON.parse(localStorage.clip)});
render(Application);

// Hot Module Replacement API
if (typeof module.hot !== 'undefined') {
  module.hot.accept('./components/Application', () => {
    import('./components/Application').then(World => {
      render(World.default);
    });
  });
}

require('electron').remote.getCurrentWindow().on('close', () => {
  const state = store.getState();
  localStorage.clip = JSON.stringify(state && state.clip);
});

