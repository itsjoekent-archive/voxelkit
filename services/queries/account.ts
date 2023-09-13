import { formatEmail } from '@/formatters/account';
import { db } from '@/lib/mongo';
import {
  Account,
  AccountWithInternalId,
  CreateAccountInputs,
} from '@/schema/account';

export async function getAccountForEmail(
  email: string
): Promise<AccountWithInternalId | null> {
  const account = await db
    .collection<AccountWithInternalId>('accounts')
    .findOne({ email: formatEmail(email) });

  return account;
}

type InsertAccountFields = Omit<Account, 'updatedAt' | 'createdAt'>;
export async function insertAccount(
  account: InsertAccountFields
): Promise<AccountWithInternalId> {
  const document = {
    ...account,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  const { insertedId } = await db
    .collection<Account>('accounts')
    .insertOne(document);

  const insertedAccount = { ...document, _id: insertedId };
  return insertedAccount;
}
