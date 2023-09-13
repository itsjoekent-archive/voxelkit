ARG NODE_VERSION

FROM node:${NODE_VERSION}-bookworm as base

WORKDIR /usr/voxelkit

COPY ./ /usr/voxelkit

RUN npm ci --ignore-scripts
RUN cd bin && npm ci --ignore-scripts
RUN cd services && npm ci --ignore-scripts
RUN cd translations && npm ci --ignore-scripts

FROM node:${NODE_VERSION}-bookworm as local-development

ENV CLOUDSDK_INSTALL_DIR /usr/local/gcloud/

RUN curl -sSL https://sdk.cloud.google.com | bash

ENV PATH $PATH:/usr/local/gcloud/google-cloud-sdk/bin

WORKDIR /usr/voxelkit
COPY --from=base /usr/voxelkit .
