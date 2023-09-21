ARG NODE_VERSION

# ------------------------------------------------------
# Base image
# ------------------------------------------------------

FROM node:${NODE_VERSION}-bullseye as base

WORKDIR /usr/voxelkit

COPY ./ /usr/voxelkit

RUN npm ci --ignore-scripts
RUN cd services && npm ci --ignore-scripts
RUN cd translations && npm ci --ignore-scripts

# ------------------------------------------------------
# Testing stage
# ------------------------------------------------------

FROM node:${NODE_VERSION}-bullseye as testing

ENV MONGOMS_DOWNLOAD_URL=https://fastdl.mongodb.org/linux/mongodb-linux-aarch64-ubuntu2004-7.0.0.tgz

WORKDIR /usr/voxelkit
COPY --from=base /usr/voxelkit .

RUN cd bin/testing && npm ci --ignore-scripts

# ------------------------------------------------------
# Local development stage
# ------------------------------------------------------

FROM node:${NODE_VERSION}-bullseye as local-development

ENV CLOUDSDK_INSTALL_DIR /usr/local/gcloud/

RUN curl -sSL https://sdk.cloud.google.com | bash

ENV PATH $PATH:/usr/local/gcloud/google-cloud-sdk/bin

WORKDIR /usr/voxelkit
COPY --from=base /usr/voxelkit .

RUN cd bin/local && npm ci --ignore-scripts
