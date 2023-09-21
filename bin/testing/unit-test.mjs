import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { $, execa } from 'execa';
import { MongoMemoryServer } from 'mongodb-memory-server';

// TODO: Check if watch mode

(async function start() {
  try {
    console.log('Running voxelkit tests...');

    const rootDirectory = process.cwd().endsWith('bin')
      ? path.join(process.cwd(), '../../')
      : process.cwd();

    const localDefaults = dotenv.parse(
      fs.readFileSync(path.join(rootDirectory, '.env.local'))
    );

    const testEnv = dotenv.parse(
      fs.readFileSync(path.join(rootDirectory, '.env.test'))
    );

    const servicesMongod = await MongoMemoryServer.create();
    const servicesMongoUri = servicesMongod.getUri();

    const env = {
      ...localDefaults,
      ...testEnv,
      SERVICES_MONGO_URI: servicesMongoUri,
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

    await Promise.all([
      runCommandInSubfolder('translations', 'npm', ['test']),
      runCommandInSubfolder('services', 'npm', ['test']),
    ]);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
