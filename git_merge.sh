#!/usr/bin/env bash
#!/usr/bin/env bash
echo "This git upload script for HuBMAP web portal repository. Execute this script to upload to your-branch."
echo "First check OS..."
osname="$(uname -s)"
case "${osname}" in
    Linux*)     machine=Linux;;
    Darwin*)    machine=Mac;;
    CYGWIN*)    machine=Cygwin;;
    MINGW*)     machine=MinGw;;
    *)          machine="UNKNOWN:${osname}"
esac
echo ${machine}
bash
if [[ $machine -eq "Linux" || $machine -eq "Mac" ]]; then
    echo "Your system is ready to execute bash scripts."
elif [[ $machine -eq "\'uname\'' is not recognized as an internal or external command, operable program or batch file." ]]; then
    bash
    echo "Ubuntu Bash has been activated on your Windows system."
fi
echo "Enter the branch name you want to merge FROM:"
read from_branch
echo "Your branch name to merge from: $from_branch"
echo "Your current branch is...Exiting the script."
current_branch=$(git branch)
if [[ $current_branch -eq "master" ]];
    then
    echo "Press any key to continue with merge..."
    read
else
    echo "Error: You are on same branch you want to merge. git checkout master"
    git checkout master
fi
echo "Check your current branch for uncommitted changes are: "
git status
echo "If there are any uncommitted changes: exit this script by typing CTRL+Z and execute git_upload.sh."
read
echo "Type y if you want to merge your branch and type n to not merge. Exiting the script."
read your_response
echo " You chose: $your_response"
if [[ ${your_response,,} -eq "y" ]];
    then
    git fetch
    git pull origin $branch_name
    echo "Check if any merge conflicts exists. Type yes to check merge conflicts."
    read continue
    if [[ ${continue,,} -eq "y" ]]; then
        git push origin $branch_name
        echo "Your changes are pushed. Please check if your changes exist in git log as follows:"
        git log .
    else
        echo "You selected $continue. So you need to check and fix your merge conflicts and push your changes manually. Exiting the script."
        exit
    fi
else
    echo "You chose not to push your changes. Exiting the script."
    exit
fi
echo "Press any key to exit..."
read
