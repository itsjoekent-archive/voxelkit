# voxelkit

Create voxel games ✨ 🎮

## Setup

First, install the necessary software.

1. [Install gcloud CLI and authenticate with Google Cloud](https://cloud.google.com/sdk/docs/install).
2. [Install Docker Desktop](https://docs.docker.com/desktop/install/mac-install/).
3. [Install Node Version Manager](https://github.com/nvm-sh/nvm) (`brew install nvm`).

Next, setup the repository and run.

```sh
# Authenticate with Google Cloud
$ gcloud auth login
$ gcloud auth application-default login

# Clone the repository
$ git clone https://github.com/itsjoekent/voxelkit.git
$ cd voxelkit

# Setup the correct Node version locally to ensure package-lock.json
# consistency when you're installing packages & npm workspaces is
# working as intended.
$ nvm install && nvm use

# Run the start script to launch everything via Docker Compose.
# Going forward, this is the only command you need to run.
$ ./bin/start.sh
```
