const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const spawn = require('await-spawn');

const DEV_PROJECT_ID = '976770207038';

(async function start() {
  try {
    const rootDirectory = process.cwd().endsWith('bin')
      ? path.join(process.cwd(), '../')
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

    let gcpLocalSecretList = [];

    try {
      gcpSecretsListCommandJson = await spawn('gcloud', [
        'secrets',
        'list',
        '--format',
        'json',
        '--project',
        DEV_PROJECT_ID,
        '--page-size',
        'unlimited',
      ]);
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
      const gcpSecretValue = await spawn('gcloud', [
        'secrets',
        'versions',
        'access',
        'latest',
        '--secret',
        gcpSecretName,
        '--project',
        DEV_PROJECT_ID,
      ]);
      gcpLocalSecrets[gcpSecretName] = gcpSecretValue.toString().trim();
    }

    const secrets = {
      ...gcpLocalSecrets,
      ...localDefaults,
      ...localOverrides,
    };

    console.log(secrets);

    // TODO: build and run docker compose, injecting merged secrets
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
