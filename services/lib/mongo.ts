import { MongoClient } from 'mongodb';
import { getMongoDbUri } from '@services/lib/secrets';

const client = new MongoClient(getMongoDbUri());
export const db = client.db();

export default client;
