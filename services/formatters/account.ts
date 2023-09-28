import bcrypt from 'bcryptjs';
import xss from 'xss';
import { convertJsErrorToApiError } from '@/system/api-error';
import { Account, CreateAccountInputs } from '@/schema/account';
import { failedToCreateAccountRef } from '@voxelkit/translations';

export function formatEmail(email: string): string {
  return email.toLowerCase().trim();
}

type FormattedCreateAccountInputs = Omit<CreateAccountInputs, 'password'> &
  Pick<Account, 'passwordHash'>;

export async function formatCreateAccountInputData(
  createAccountInput: CreateAccountInputs
): Promise<FormattedCreateAccountInputs> {
  const { firstName, lastName, email, password, language } = createAccountInput;
  let passwordHash: Account['passwordHash'];

  try {
    const salt = await bcrypt.genSalt(12);
    passwordHash = await bcrypt.hash(password, salt);
  } catch (error) {
    throw convertJsErrorToApiError(error, {
      httpCode: 500,
      publicErrorMessage: failedToCreateAccountRef(),
    });
  }

  return {
    firstName: xss(firstName.trim()),
    lastName: xss(lastName.trim()),
    email: formatEmail(email),
    passwordHash,
    language,
  };
}
