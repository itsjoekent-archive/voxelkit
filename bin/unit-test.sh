#!/bin/bash

node_version="$(cat .nvmrc | sed 's/v//')"

docker build -t voxelkit \
  --build-arg NODE_VERSION="$node_version" \
  --target testing \
  .

docker run --rm voxelkit bin/testing/unit-test.mjs
