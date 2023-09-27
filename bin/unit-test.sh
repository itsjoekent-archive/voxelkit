#!/bin/bash

source ./bin/helpers/build_voxelkit.sh
export MONGODB_VERSION="$MONGODB_VERSION"

docker compose -f infrastructure/images/docker-compose.ci.yml build --no-cache
docker compose -f infrastructure/images/docker-compose.ci.yml up --remove-orphans
# TODO: add '--abort-on-container-exit' if running in GitHub actions
