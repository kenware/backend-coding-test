#!/bin/bash 

CMD="npm test" # Command that runs your tests
protected_branch='master'

# Check if we actually have commits to push
commits=`git log @{u}..`
if [ -z "$commits" ]; then
    exit 0
fi

$CMD
RESULT=$?
if [ $RESULT -ne 0 ]; then 
    echo "failed $CMD"
    exit 1
fi

exit 0