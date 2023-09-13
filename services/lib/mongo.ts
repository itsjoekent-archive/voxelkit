import { MongoClient } from 'mongodb';
import { getServicesMongoDbUri } from '@/lib/secrets';

const client = new MongoClient(getServicesMongoDbUri());
export const db = client.db();

export default client;
