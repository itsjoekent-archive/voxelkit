#!/bin/bash

MONGO_VERSION="$(cat infrastructure/requirements/mongodb)"
NODE_VERSION="$(cat .nvmrc | sed 's/v//')"

export MONGO_VERSION="$MONGO_VERSION"

docker build -t voxelkit-core \
  -f infrastructure/images/Dockerfile.core \
  --build-arg NODE_VERSION="$NODE_VERSION" .

docker compose -f infrastructure/images/docker-compose.local.yml build
docker compose -f infrastructure/images/docker-compose.local.yml up --remove-orphans
