// TODO!
/* eslint-disable global-require */
/* eslint-disable import/no-mutable-exports */

let GitVersion;
try {
  GitVersion = require('./git-version.json').version; // eslint-disable-line import/no-unresolved
} catch (e) {
  GitVersion = () => '[unknown version]';
}


export default GitVersion;
