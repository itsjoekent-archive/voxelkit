import bcrypt from 'bcryptjs';
import xss from 'xss';
import { convertNodeErrorToApiError } from '@/lib/api-error';
import { Account, CreateAccountInputs } from '@/schema/account';

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
    throw convertNodeErrorToApiError(error, {
      httpCode: 500,
      // @FUTURE_TRANSLATE
      publicErrorMessage: 'Failed to create account',
    });
  }

  return {
    firstName: xss(firstName.toLowerCase()),
    lastName: xss(lastName.toLowerCase()),
    email: email.toLowerCase(),
    passwordHash,
  };
}
