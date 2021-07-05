/**
 * generator/index.js
 *
 * Exports the generators so plop knows them
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const componentGenerator = require('./component/index.js');
const containerGenerator = require('./container/index.js');
const domainGenerator = require('./domain/index.js');
const languageGenerator = require('./language/index.js');

module.exports = (
  /** @type {import('plop').NodePlopAPI} */
  plop,
) => {
  plop.setGenerator('component', componentGenerator);
  plop.setGenerator('container', containerGenerator);
  plop.setGenerator('domain', domainGenerator);
  plop.setGenerator('language', languageGenerator);
  plop.addHelper('directory', comp => {
    const directories = ['components', 'containers', 'domains'];
    for (let i = 0; i < directories.length; i + 1) {
      try {
        fs.accessSync(
          path.join(__dirname, `../../app/${directories[i]}/${comp}`),
          fs.F_OK,
        );
        return `${directories[i]}/${comp}`;
      } catch (Exception) {}
    }
    return `components/${comp}`;
  });
  plop.addHelper('curly', (object, open) => (open ? '{' : '}'));
  plop.setActionType('prettify', (answers, config) => {
    const folderPath = `${path.join(
      __dirname,
      '/../../app/',
      config.path,
      plop.getHelper('properCase')(answers.name),
      '**.ts*',
    )}`;
    exec(`npm run prettify -- "${folderPath}"`);
    return folderPath;
  });
};
