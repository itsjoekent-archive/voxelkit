#!/bin/bash

node_version="$(cat .nvmrc | sed 's/v//')"
NODE_VERSION="$node_version" docker-compose build && docker-compose up --remove-orphans
