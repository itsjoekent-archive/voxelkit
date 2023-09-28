import { faker } from '@faker-js/faker';
import { insertAccount } from '@/queries/account';
import { Account, AccountWithInternalId } from '@/schema/account';

export default async function accountFactory(
  count: number = 1,
  overrides: Partial<Account> = {}
) {
  const insertedAccounts: AccountWithInternalId[] = [];

  for (let index = 0; index < count; index++) {
    const account: Account = {
      avatarUrl: faker.image.url(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      language: 'en-US',
      passwordHash: 'password',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      ...overrides,
    };

    const insertedAccount = await insertAccount(account);
    insertedAccounts.push(insertedAccount);
  }

  return insertedAccounts;
}
