#!/bin/bash

DEBIAN_RELEASE_NAME=$(ecat infrastructure/requirements/debian | cut -d "." -f 2)
MONGODB_VERSION="$(cat infrastructure/requirements/mongodb)"
NODE_VERSION="$(cat .nvmrc | sed 's/v//')"

export MONGODB_VERSION="$MONGODB_VERSION"

docker build -t voxelkit-core \
  -f infrastructure/images/Dockerfile.core \
  --build-arg DEBIAN_VERSION="$DEBIAN_RELEASE_NAME" \
  --build-arg NODE_VERSION="$NODE_VERSION" .

docker compose -f infrastructure/images/docker-compose.local.yml build
docker compose -f infrastructure/images/docker-compose.local.yml up --remove-orphans
