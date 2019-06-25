let GitVersion;
try {
  GitVersion = require('./git-version.json')['version'];
  console.log(GitVersion);
} catch (e) {
  GitVersion = () => "[unknown version]";
}



export default GitVersion;
