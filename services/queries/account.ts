import { formatEmail } from '@/formatters/account';
import getDb from '@/system/mongo';
import { Account, AccountWithInternalId } from '@/schema/account';

export async function getAccountForEmail(
  email: string
): Promise<AccountWithInternalId | null> {
  const db = await getDb();
  const account = await db
    .collection<AccountWithInternalId>('accounts')
    .findOne({ email: formatEmail(email) });

  return account;
}

type InsertAccountFields = Omit<Account, 'updatedAt' | 'createdAt'>;
export async function insertAccount(
  account: InsertAccountFields
): Promise<AccountWithInternalId> {
  const db = await getDb();
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
