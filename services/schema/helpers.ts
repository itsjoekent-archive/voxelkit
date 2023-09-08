import type { ObjectId } from 'mongodb';

export type WithInternalId<Schema> = Schema & { _id: ObjectId };
export type WithExternalId<Schema> = Schema & { id: string };
