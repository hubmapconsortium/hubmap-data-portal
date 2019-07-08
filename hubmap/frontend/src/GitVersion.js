let GitVersion;
try {
  if(new File('./git-version.json').exists())
  {
    console.log("not found");
    GitVersion = require('./git-version.json')['version'];
    console.log(GitVersion);
  }
  else{
    GitVersion = "default";
  }

} catch (e) {
  GitVersion = () => "[unknown version]";
}



export default GitVersion;
