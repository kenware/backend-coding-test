#!/bin/bash

echo "Artillery load test initiated..."
echo "Artillery requires node (>=12) to run load test"
echo "This project supports node (>8.6 and <= 10) and may not be able to run artillery test"

npm run build
$(npm bin)/forever build/index.js
$(npm bin)/artillery run ride-load-test.yml
$(npm bin)/forever stop 0
