#!/bin/bash
cp /githooks/pre-push /.git/hooks/pre-push
npm run build && concurrently -kr 'tsc --watch' 'nodemon --inspect --delay 1000ms'
