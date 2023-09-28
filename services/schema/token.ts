import type { ObjectId } from 'mongodb';

export type Scopes =
  | 'account:*'
  | 'account:read'
  | 'account:write'
  | 'account:delete'
  | 'admin:view-account'
  | 'admin:*';

export type Token = {
  accountId: ObjectId;
  expiresAt: Date;
  scopes: Scopes[];
};
