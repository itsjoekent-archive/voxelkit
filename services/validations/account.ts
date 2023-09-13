import ApiError from '@/lib/api-error';
import { getAccountForEmail } from '@/queries/account';
import { isObject } from '@/validations/helpers';
import {
  emailInUseRef,
  failedToCreateAccountRef,
  invalidEmailRef,
  invalidNameRef,
  nameMaxLengthRef,
  nameMinLengthRef,
  passwordMaxLengthRef,
  passwordMinLengthRef,
  passwordTooCommonRef,
} from '@voxelkit/translations';

export function isValidName(name: any): boolean {
  if (typeof name !== 'string') {
    throw new ApiError(invalidNameRef(), 400);
  }

  if (name.length <= 0) {
    throw new ApiError(nameMinLengthRef(), 400);
  }

  if (name.length > 50) {
    throw new ApiError(nameMaxLengthRef(), 400);
  }

  return true;
}

export async function isValidEmail(email: any): Promise<boolean> {
  if (typeof email !== 'string') {
    throw new ApiError(invalidEmailRef(), 400);
  }

  // Referenced from here:
  // https://stackoverflow.com/a/9204568
  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    throw new ApiError(invalidEmailRef(), 400);
  }

  if (email.length > 1024) {
    throw new ApiError(invalidEmailRef(), 400);
  }

  const matchingAccount = await getAccountForEmail(email);
  if (matchingAccount) {
    throw new ApiError(emailInUseRef({ email }), 400);
  }

  return true;
}

export function isValidPassword(password: any): boolean {
  if (typeof password !== 'string') {
    throw new ApiError(passwordMinLengthRef(), 400);
  }

  if (password.length < 8) {
    throw new ApiError(passwordMinLengthRef(), 400);
  }

  if (password.length > 2056) {
    throw new ApiError(passwordMaxLengthRef(), 400);
  }

  const commonPasswords = [
    '11111111',
    '12345678',
    '123456789',
    'password',
    'password1',
    'password!',
  ];

  if (commonPasswords.includes(password)) {
    throw new ApiError(passwordTooCommonRef(), 400);
  }

  return true;
}

export async function isValidCreateAccountInput(
  createAccountInput: any
): Promise<boolean> {
  if (!isObject(createAccountInput)) {
    throw new ApiError(failedToCreateAccountRef(), 400);
  }

  const { firstName, lastName, email, password } = createAccountInput;

  const isValidEmailResult = await isValidEmail(email);

  return (
    isValidName(firstName) &&
    isValidName(lastName) &&
    isValidPassword(password) &&
    isValidEmailResult
  );
}
