import { ObjectId } from 'mongodb';
import { Scopes, Token } from '@/schema/token';
import { defaultScopes } from '@/api/token-auth';

const defaultExpiresIn = 60 * 1000;

export default function tokenFactory(
  accountId?: ObjectId,
  scopes: Scopes[] = defaultScopes,
  expiresIn: number = defaultExpiresIn
): Token {
  return {
    accountId: accountId || new ObjectId(),
    expiresAt: new Date(Date.now() + expiresIn),
    scopes,
  };
}
