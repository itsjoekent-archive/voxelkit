import bcrypt from 'bcryptjs';
import xss from 'xss';
import { convertJsErrorToApiError } from '@/lib/api-error';
import { Account, CreateAccountInputs } from '@/schema/account';
import { failedToCreateAccountRef } from '@/translations/generated/accounts';

type FormattedCreateAccountInputs = Omit<CreateAccountInputs, 'password'> &
  Pick<Account, 'passwordHash'>;

export async function formatCreateAccountInputData(
  createAccountInput: CreateAccountInputs
): Promise<FormattedCreateAccountInputs> {
  const { firstName, lastName, email, password } = createAccountInput;
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
    firstName: xss(firstName.toLowerCase().trim()),
    lastName: xss(lastName.toLowerCase().trim()),
    email: email.toLowerCase().trim(),
    passwordHash,
  };
}
