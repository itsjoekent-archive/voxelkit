# voxelkit

Create voxel games ✨ 🎮

## Setup

First, install the necessary software.

1. [Install gcloud CLI and authenticate with Google Cloud](https://cloud.google.com/sdk/docs/install).
2. [Install Docker Desktop](https://docs.docker.com/desktop/install/mac-install/).
3. Optionally, [install Node Version Manager](https://github.com/nvm-sh/nvm) (`brew install nvm`).

Next, setup the repository and run.

```sh
# Authenticate with Google Cloud
$ gcloud auth login
$ gcloud auth application-default login

# Clone the repository
$ git clone https://github.com/itsjoekent/voxelkit.git
$ cd voxelkit

# (Optional) Setup the correct Node version locally, this is not
# necessary but can be helpful when debugging on your host machine.
$ nvm install && nvm use

# Run the start script to launch everything via Docker Compose.
# Going forward, this is the only command you need to run.
$ ./bin/start.sh

# To launch tests, run the following command,
$ ./bin/unit-test.sh

# To install packages, install from the Linux container as some
# packages have OS specific dependencies and installing from
# a Mac will put the wrong packages in the package-lock file.
$ ./bin/shell.sh
$ npm i somepackage --workspace=@voxelkit/...
```
