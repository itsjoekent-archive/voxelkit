import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { $, execa } from 'execa';

// TODO: Check if watch mode or not

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

    const env = {
      ...localDefaults,
      ...testEnv,
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

    await runCommandInSubfolder('translations', 'ls', ['-la']);

    await Promise.all([
      runCommandInSubfolder('translations', 'npm', ['test']),
      runCommandInSubfolder('services', 'npm', ['test']),
    ]);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
