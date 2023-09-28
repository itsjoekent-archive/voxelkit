import serializeAccount, {
  SerializedAccountFull,
  SerializedAccountPublic,
} from '@/serializers/account';
import accountFactory from '@/test/factory/account';
import tokenFactory from '@/test/factory/token';
import { setupTestDb } from '@/test/helpers/mongo';

describe('services/serializers/account/serializeAccount', () => {
  setupTestDb('services/serializers/account/serializeAccount');

  it('should serialize an account', async () => {
    const [account] = await accountFactory(1);

    const serializedAccount = serializeAccount(
      account,
      tokenFactory(account._id)
    ) as SerializedAccountFull;

    expect(serializedAccount.id).toEqual(account._id.toString());
    expect(serializedAccount.avatarUrl).toEqual(account.avatarUrl);
    expect(serializedAccount.firstName).toEqual(account.firstName);
    expect(serializedAccount.lastName).toEqual(account.lastName);
    expect(serializedAccount.language).toEqual(account.language);
    expect(serializedAccount.createdAt).toEqual(account.createdAt);
    expect(serializedAccount.email).toEqual(account.email);
    expect(serializedAccount.updatedAt).toEqual(account.updatedAt);
    expect(serializedAccount).not.toHaveProperty('passwordHash');
  });

  it('should serialize an account for a different account', async () => {
    const [toSerialize, tokenHolder] = await accountFactory(2);

    const serializedAccount = serializeAccount(
      toSerialize,
      tokenFactory(tokenHolder._id)
    ) as SerializedAccountPublic;

    expect(serializedAccount.id).toEqual(toSerialize._id.toString());
    expect(serializedAccount).not.toHaveProperty('email');
    expect(serializedAccount).not.toHaveProperty('updatedAt');
  });

  it('should serialize an account for itself without read scope', async () => {
    const [account] = await accountFactory(1);

    const serializedAccount = serializeAccount(
      account,
      tokenFactory(account._id, [])
    ) as SerializedAccountPublic;

    expect(serializedAccount.id).toEqual(account._id.toString());
    expect(serializedAccount).not.toHaveProperty('email');
    expect(serializedAccount).not.toHaveProperty('updatedAt');
  });

  it('should serialize an account for an admin', async () => {
    const [toSerialize, tokenHolder] = await accountFactory(2);

    const serializedAccount = serializeAccount(
      toSerialize,
      tokenFactory(tokenHolder._id, ['admin:*'])
    ) as SerializedAccountFull;

    expect(serializedAccount.id).toEqual(toSerialize._id.toString());
    expect(serializedAccount.email).toEqual(toSerialize.email);
    expect(serializedAccount.updatedAt).toEqual(toSerialize.updatedAt);
  });
});
