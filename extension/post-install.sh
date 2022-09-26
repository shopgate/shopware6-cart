#!/bin/bash

LOCAL_DIR=$PWD
cd ./node_modules/@apite/shopware6-utility/src/locale || exit

# Copy locale files into local directory
# Until we find a better way to load translations from utility package
for node in *
do
  cp -R "$node" "$LOCAL_DIR/src/locale/$node"
done
