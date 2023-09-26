import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { $, execa } from 'execa';

const DEV_PROJECT_ID = '976770207038';

(async function start() {
  try {
    console.log('Starting voxelkit...');

    const rootDirectory = process.cwd().endsWith('bin')
      ? path.join(process.cwd(), '../../')
      : process.cwd();

    const localDefaults = dotenv.parse(
      fs.readFileSync(path.join(rootDirectory, '.env.local'))
    );
    let localOverrides = {};

    try {
      localOverrides = dotenv.parse(
        fs.readFileSync(path.join(rootDirectory, '.env'))
      );
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error;
      }
    }

    await $`gcloud config set project ${DEV_PROJECT_ID}`;

    let gcpLocalSecretList = [];

    try {
      const { stdout: gcpSecretsListCommandJson } =
        await $`gcloud secrets list --format json --project ${DEV_PROJECT_ID} --page-size unlimited`;
      gcpLocalSecretList = JSON.parse(gcpSecretsListCommandJson.toString());
    } catch (error) {
      console.error(
        'Failed to fetch secrets from GCP, double check you are logged in "gcloud auth list" and have the correct permissions to access the dev project in GCP.'
      );
      console.error(error);
      process.exit(1);
    }

    const gcpLocalSecrets = {};

    for (const gcpSecret of gcpLocalSecretList) {
      const gcpSecretName = gcpSecret.name.split('/').pop();
      const { stdout: gcpSecretValue } =
        await $`gcloud secrets versions access latest --secret ${gcpSecretName} --project ${DEV_PROJECT_ID}`;
      gcpLocalSecrets[gcpSecretName] = gcpSecretValue.toString().trim();
    }

    const env = {
      ...gcpLocalSecrets,
      ...localDefaults,
      ...localOverrides,
    };

    const processConfig = {
      all: true,
      cwd: rootDirectory,
      env,
    };

    function runCommandInSubfolder(subfolder, command, commandArguments) {
      return execa(command, commandArguments, {
        ...processConfig,
        cwd: path.join(rootDirectory, subfolder),
      }).pipeAll(process.stdout);
    }

    // Compile libraries before launching dependents
    await Promise.all([
      runCommandInSubfolder('packages/translations', 'npm', ['run', 'build']),
    ]);

    // Launch long-running processes
    await Promise.all([
      runCommandInSubfolder('packages/translations', 'npm', [
        'run',
        'build:watch',
      ]),
    ]);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
