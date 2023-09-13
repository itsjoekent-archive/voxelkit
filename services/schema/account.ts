import { WithExternalId, WithInternalId } from '@/schema/helpers';
import { LanguageCode } from '@voxelkit/translations';

export type Account = {
  avatarUrl: string;
  firstName: string;
  lastName: string;
  email: string;
  language: LanguageCode;
  passwordHash: string;
  createdAt: number;
  updatedAt: number;
};

export type AccountWithInternalId = WithInternalId<Account>;
export type AccountWithExternalId = WithExternalId<Account>;

export type CreateAccountInputs = Omit<
  Account,
  'avatarUrl' | 'createdAt' | 'updatedAt' | 'passwordHash'
> & { password: string };
