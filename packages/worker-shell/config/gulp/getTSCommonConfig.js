'use strict';

const fs = require('fs');
const assign = require('object-assign');
const { getProjectPath } = require('./utils/projectHelper');
// require('../../components/package.json')

module.exports = function () {
  let my = {};
  console.log(getProjectPath('./components/tsconfig.json'),`getProjectPath('tsconfig.json')`)
  if (fs.existsSync(getProjectPath('tsconfig.json'))) {
    my = require(getProjectPath('tsconfig.json'));
  }
  return assign(
    {
      noUnusedParameters: true,
      noUnusedLocals: true,
      strictNullChecks: true,
      target: 'es6',
      jsx: 'preserve',
      moduleResolution: 'node',
      declaration: true,
      allowSyntheticDefaultImports: true,
    },
    my.compilerOptions
  );
};
