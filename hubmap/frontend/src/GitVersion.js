let GitVersion;
try {
  GitVersion = require('./git-version.json').version;
} catch (e) {
  GitVersion = () => '[unknown version]';
}


export default GitVersion;
