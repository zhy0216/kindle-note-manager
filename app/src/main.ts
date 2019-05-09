import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';
const join = require('path').join;
const fs = require('fs');

const homedir = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];

export const expandHomeDir = (path: string) => {
  if (!path) return path;
  if (path === '~') return homedir;
  if (path.slice(0, 2) !== '~/') return path;
  return join(homedir || "", path.slice(2));
};

export const createFolder = (path: string) => {
  const expendedPath = expandHomeDir(path);
  // process.stdout.write("#########################################################################")
  // process.stdout.write(expendedPath)
  if (!fs.existsSync(expendedPath)) fs.mkdir(expendedPath, err => {});
};


let win: BrowserWindow | null;

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
        extensions.map(name => installer.default(installer[name], forceDownload))
    ).catch(console.log);
};

const createWindow = async () => {
  if (process.env.NODE_ENV !== 'production') {
    await installExtensions();
  }

  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nativeWindowOpen: true
    },
  });
  if (process.env.NODE_ENV !== 'production') {
    win.loadURL(`http://localhost:2003`);
  } else {
    win.loadURL(
            url.format({
              pathname: path.join(__dirname, 'index.html'),
              protocol: 'file:',
              slashes: true
            })
        );
  }

  if (process.env.NODE_ENV !== 'production') {
        // Open DevTools
    win.webContents.openDevTools();
  }

  win.on('closed', () => {
    win = null;
  });

};

app.on('ready', () => {
  createWindow();
  createFolder('~/.strongbox');
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
