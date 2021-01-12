#!/bin/bash

"==> Checking for Nodejs 12 and install..."
node --version || exit 0
nvm use 12 || exit 0

echo "==> Installing..."
yarn install 

echo "==> Running Simulations..."
yarn run sim1
yarn run sim2
yarn run sim3
yarn run sim
