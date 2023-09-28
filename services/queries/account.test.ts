import { ObjectId } from 'mongodb';
import { LanguageCode } from '@voxelkit/translations';
import { getAccountForEmail, insertAccount } from '@/queries//account';
import { Account } from '@/schema/account';
import accountFactory from '@/test/factory/account';
import { setupTestDb } from '@/test/helpers/mongo';

describe('services/queries/account/getAccountForEmail', () => {
  setupTestDb('services/queries/account/getAccountForEmail');

  it('should return null if no account is found', async () => {
    const account = await getAccountForEmail('test@gmail.com');
    expect(account).toBe(null);
  });

  it('should return a matching account', async () => {
    it('should return null if no account is found', async () => {
      const [factoryAccount] = await accountFactory(10);
      const account = await getAccountForEmail(factoryAccount.email);

      expect(account).not.toBe(null);
      expect(account!.email).toEqual(factoryAccount.email);
      expect(account!._id).toBeInstanceOf(ObjectId);
    });
  });
});

describe('services/queries/account/insertAccount', () => {
  setupTestDb('services/queries/account/insertAccount');

  it('should insert an account', async () => {
    const account = {
      avatarUrl: 'avatar.jpg',
      firstName: 'test',
      lastName: 'test',
      email: 'test@test.com',
      language: 'en-US' as LanguageCode,
      passwordHash: 'password',
    };

    const insertedAccount = await insertAccount(account);
    expect(insertedAccount._id).toBeInstanceOf(ObjectId);
    expect(insertedAccount.createdAt).not.toBeNaN();
    expect(insertedAccount.createdAt).toEqual(insertedAccount.updatedAt);
  });
});
