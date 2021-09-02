#!/bin/bash

echo "Artillery load test initiated..."
echo "Artillery requires node (>=12) to run load test"

npm run build
$(npm bin)/forever start build/index.js
$(npm bin)/artillery run ride-load-test.yml
$(npm bin)/forever stop 0
