#!/bin/bash

DEBIAN_RELEASE_NAME=$(cat infrastructure/requirements/debian | cut -d "." -f 2)
MONGODB_VERSION="$(cat infrastructure/requirements/mongodb)"
NODE_VERSION="$(cat .nvmrc | sed 's/v//')"

export MONGODB_VERSION="$MONGODB_VERSION"

docker build -t voxelkit-core \
  -f infrastructure/images/Dockerfile.core \
  --build-arg DEBIAN_RELEASE_NAME="$DEBIAN_RELEASE_NAME" \
  --build-arg NODE_VERSION="$NODE_VERSION" .

docker compose -f infrastructure/images/docker-compose.ci.yml build
docker compose -f infrastructure/images/docker-compose.ci.yml up --remove-orphans
# TODO: add '--abort-on-container-exit' if running in GitHub actions
