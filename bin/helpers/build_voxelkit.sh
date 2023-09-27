#!/bin/bash

source ./bin/helpers/common_variables.sh

mkdir -p ./tmp
echo $GCLOUD_ADC > './tmp/gcloud-adc'

docker build -t voxelkit-core \
  -f infrastructure/images/Dockerfile.core \
  --secret id=GCLOUD_ADC,src=./tmp/gcloud-adc \
  --build-arg DEBIAN_RELEASE_NAME="$DEBIAN_RELEASE_NAME" \
  --build-arg NODE_VERSION="$NODE_VERSION" .
