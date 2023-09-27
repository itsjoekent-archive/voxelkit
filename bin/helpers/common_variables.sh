#!/bin/bash

DEBIAN_RELEASE_NAME=$(cat infrastructure/requirements/debian | cut -d "." -f 2)
MONGODB_VERSION="$(cat infrastructure/requirements/mongodb)"
NODE_VERSION="$(cat .nvmrc | sed 's/v//')"

GCLOUD_CONFIG_DIR=$(gcloud info --format='value(config.paths.global_config_dir)')
GCLOUD_ADC=$(cat $GCLOUD_CONFIG_DIR/application_default_credentials.json)
