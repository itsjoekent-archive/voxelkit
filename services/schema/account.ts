import { WithExternalId, WithInternalId } from '@/schema/helpers';

export type Account = {
  avatarUrl: string;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
};

export type AccountWithInternalId = WithInternalId<Account>;
export type AccountWithExternalId = WithExternalId<Account>;

export type CreateAccountInputs = Omit<
  Account,
  'avatarUrl' | 'createdAt' | 'updatedAt' | 'passwordHash'
> & { password: string };
