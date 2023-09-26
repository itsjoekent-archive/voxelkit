import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { execa } from 'execa';
import { MongoClient } from 'mongodb';

// TODO: Check if watch mode or not

(async function start() {
  try {
    const rootDirectory = process.cwd().endsWith('bin')
      ? path.join(process.cwd(), '../../')
      : process.cwd();

    const localDefaults = dotenv.parse(
      fs.readFileSync(path.join(rootDirectory, '.env.local'))
    );

    const testEnv = dotenv.parse(
      fs.readFileSync(path.join(rootDirectory, '.env.test'))
    );

    const env = {
      ...localDefaults,
      ...testEnv,
    };

    console.log('Waiting for MongoDB to start...');

    const client = new MongoClient(env.SERVICES_MONGODB_URI, {
      connectTimeoutMS: 10000,
      serverSelectionTimeoutMS: 10000,
    });

    const waitUntilMongoDbIsReady = new Promise((resolve, reject) => {
      try {
        client.connect().then(resolve);
      } catch (error) {
        reject(error);
      }
    });

    await waitUntilMongoDbIsReady;

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

    console.log('Building voxelkit libraries...');

    await runCommandInSubfolder('packages/translations', 'ls', ['-la']);

    console.log('Running voxelkit tests...');

    await Promise.all([
      runCommandInSubfolder('packages/translations', 'npm', ['test']),
      runCommandInSubfolder('services', 'npm', ['test']),
    ]);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
