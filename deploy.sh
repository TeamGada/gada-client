#!/bin/bash

echo "install yarn"

node -e "console.log('Running Node.js ' + process.version)"

cd home/ec2-user/deploy/front

npm install -g yarn

yarn --version

echo "yarn"

yarn

echo "build"

yarn build
