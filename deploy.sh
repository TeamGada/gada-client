#!/bin/bash

echo "install yarn"

cd home/ec2-user/deploy/front

npm install -g yarn

yarn --version

echo "yarn"

yarn

echo "build"

yarn build
