import { MongoClient } from 'mongodb';
import { convertJsErrorToApiError } from '@/lib/api-error';
import { getServicesMongoDbName, getServicesMongoDbUri } from '@/lib/secrets';

async function getDb() {
  try {
    const client = new MongoClient(getServicesMongoDbUri(), {
      connectTimeoutMS: 2000,
      serverSelectionTimeoutMS: 2000,
    });

    client.on('error', (error) => {
      console.error(convertJsErrorToApiError(error));
    });

    client.on('connectionClosed', () => {
      console.log('MongoDB connection closed');
    });

    client.on('connectionReady', () => {
      console.log('MongoDB connection ready');
    });

    // no-op if already connected,
    // https://github.com/mongodb/node-mongodb-native/blob/4.0/docs/CHANGES_4.0.0.md#removed-deprecations
    await client.connect();

    const db = client.db(getServicesMongoDbName());
    return db;
  } catch (error) {
    throw convertJsErrorToApiError(error);
  }
}

export default getDb;
