#!/bin/bash

source ./bin/helpers/build_voxelkit.sh

docker run -it -v ./:/usr/voxelkit voxelkit-core bash
