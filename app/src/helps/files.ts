// const join = require('path').join;
// const fs = require('fs');

// const homedir = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];


export const expandHomeDir = (path: string) => {
  // if (!path) return path;
  // if (path === '~') return homedir;
  // if (path.slice(0, 2) !== '~/') return path;
  // return join(homedir || "", path.slice(2));
};

export const createFolder = (path: string) => {
  // const expendedPath = expandHomeDir(path);
  // if (!fs.existsSync(expendedPath)) fs.mkdir(expendedPath, err => {});
};
