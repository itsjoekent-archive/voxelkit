import ApiError from '@/lib/api-error';
import { isObject } from '@/validations/helpers';

export function isValidName(name: any): boolean {
  if (typeof name !== 'string') {
    // @FUTURE_TRANSLATE
    throw new ApiError('Name must be a string', 400);
  }

  if (name.length <= 0) {
    // @FUTURE_TRANSLATE
    throw new ApiError('Name must be at least one character', 400);
  }

  if (name.length > 50) {
    // @FUTURE_TRANSLATE
    throw new ApiError('Name must be less than 50 characters', 400);
  }

  return true;
}

export function isValidEmail(email: any): boolean {
  if (typeof email !== 'string') {
    // @FUTURE_TRANSLATE
    throw new ApiError('Email must be a string', 400);
  }

  // Referenced from here:
  // https://stackoverflow.com/a/9204568
  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    // @FUTURE_TRANSLATE
    throw new ApiError('Email must be a valid email address', 400);
  }

  return true;
}

export function isValidPassword(password: any): boolean {
  if (typeof password !== 'string') {
    // @FUTURE_TRANSLATE
    throw new ApiError('Password must be a string', 400);
  }

  if (password.length < 8) {
    // @FUTURE_TRANSLATE
    throw new ApiError('Password must be at least eight characters', 400);
  }

  if (password.length > 2056) {
    // @FUTURE_TRANSLATE
    throw new ApiError('Password must be less than 2056 characters', 400);
  }
  
  return true;
}

export function isValidCreateAccountInput(createAccountInput: any): boolean {
  if (!isObject(createAccountInput)) {
    // @FUTURE_TRANSLATE
    throw new ApiError('Missing account data', 400);
  }

  const { firstName, lastName, email, password } = createAccountInput;

  return isValidName(firstName) 
    && isValidName(lastName)
    && isValidEmail(email)
    && isValidPassword(password);
}
