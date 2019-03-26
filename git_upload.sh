#!/usr/bin/env bash
echo "This git upload script for HuBMAP web portal repository. Execute this script to upload to your-branch."
echo "First check OS..."
unameOut="$(uname -s)"
case "${unameOut}" in
    Linux*)     machine=Linux;;
    Darwin*)    machine=Mac;;
    CYGWIN*)    machine=Cygwin;;
    MINGW*)     machine=MinGw;;
    *)          machine="UNKNOWN:${unameOut}"
esac
echo ${machine}
if [[ $machine -eq "Linux" ]]; then
    echo
fi
if [[ $machine -eq "\'uname\'' is not recognized as an internal or external command, operable program or batch file." ]]; then
    bash
    echo "Ubuntu Bash has been activated on your Windows system."
fi
echo "Enter your branch name:"
read branch_name
echo "Your branch name: $branch_name"
echo "Your current branch is..."
current_branch=$(git branch)
if [[ $current_branch -eq $branch_name ]];
    then
    echo "Press any key..."
    read
    fi
if $current_branch -neq $branch_name; then
    git checkout $branch_name
    echo "Press Ctrl+Z to cancel the script"
fi
echo "Your current uncommitted changes are: "
git status
echo "Now adding the changes for tracking"
git add .
echo "Now enter the comment you would like for your commit"
read comment
echo "commiting to git with your comment: $comment"
git commit -m $comment
echo "Type y if you want to push your changes or type n to not push your changes to git."
read your_response
echo " You chose: $your_response"
if [[ $your_response -eq "y" ]];
    then
    git push origin $branch_name
    echo "Your changes are pushed. Please check if your changes exist in git log as follows:"
    git log .
fi

if [[ $your_response -eq "n" ]];
    then
    echo "You chose not to push your changes. Exiting the script. Press any key to to exit..."
    read
fi
echo "Press any key to exit..."
read
