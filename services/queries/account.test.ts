import { ObjectId } from 'mongodb';
import { getAccountForEmail, insertAccount } from '@/queries//account';
import accountFactory from '@/test/factory/account';
import { setupTestDb } from '@/test/helpers/mongo';

describe('getAccountForEmail', () => {
  setupTestDb('getAccountForEmail');

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
