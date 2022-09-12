#!/bin/bash

echo "yarn"

cd home/ec2-user/deploy/front

yarn

echo "build"

yarn build
