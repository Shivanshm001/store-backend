#!/bin/bash
function get_confirmation() {
    echo -ne "$1"
    read input
    # Convert input to lowercase
    input=$(echo "$input" | tr '[:upper:]' '[:lower:]')
    if [[ "$input" == "n" ]]; then
        exit
    fi
}

echo "Current working directory : "
pwd

get_confirmation "\nContinue? (y/n)? : "


git status

get_confirmation "\nAdd changes? (y/n)? : "
sleep 1
echo -e "\nAdding changes...\n"
git add .


get_confirmation "\nCommit changes? (y/n) : "
echo -ne "\nEnter commit message : "
read message
echo -ne "\nCommitting changes... "
sleep 1
git commit -m "$message"


get_confirmation "\nPush to current active branch? (y/n)? : "
git push -u origin
