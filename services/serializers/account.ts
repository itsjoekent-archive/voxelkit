import { AccountWithInternalId, AccountWithExternalId } from '@/schema/account';
import { Token } from '@/schema/token';
import { hasScope } from '@/api/token-auth';

export type SerializedAccountFull = Omit<AccountWithExternalId, 'passwordHash'>;
export type SerializedAccountPublic = Omit<
  SerializedAccountFull,
  'email' | 'updatedAt'
>;

export type ReturnTypes = SerializedAccountFull | SerializedAccountPublic;

export default function serializeAccount(
  account: AccountWithInternalId,
  requester: Token
): ReturnTypes {
  const id = account._id.toString();

  const returnValue: ReturnTypes = {
    id,
    avatarUrl: account.avatarUrl,
    firstName: account.firstName,
    lastName: account.lastName,
    language: account.language,
    createdAt: account.createdAt,
  };

  const isTokenThisAccount = requester.accountId.toString() === id;
  const tokenHasReadScope = hasScope('account:read', requester);

  if (
    (isTokenThisAccount && tokenHasReadScope) ||
    hasScope('admin:view-account', requester)
  ) {
    return {
      ...returnValue,
      email: account.email,
      updatedAt: account.updatedAt,
    };
  }

  return returnValue;
}
