import crypto from 'crypto';
import { MongoClient } from 'mongodb';
import { beforeEach } from 'vitest';
import { getServicesMongoDbUri } from '@/lib/secrets';

// TODO: Argument to run migrations
export function setupTestDb(testName: string) {
  const testNameHash = crypto
    .createHash('sha256')
    .update(testName)
    .digest('hex')
    .substring(0, 32);

  beforeEach(async () => {
    const dbName = `${testNameHash}-${Date.now()}`;
    process.env['SERVICES_MONGODB_DBNAME'] = dbName;

    return async () => {
      const client = new MongoClient(getServicesMongoDbUri());
      await client.connect();

      const db = client.db(dbName);
      await db.dropDatabase();
    };
  });
}
