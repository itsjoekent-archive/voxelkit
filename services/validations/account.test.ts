import {
  invalidEmail,
  invalidName,
  nameMinLength,
  passwordTooCommon,
} from '@voxelkit/translations';
import {
  isValidName,
  isValidEmail,
  isValidPassword,
  isValidCreateAccountInput,
} from '@/validations/account';
import accountFactory from '@/test/factory/account';
import { setupTestDb } from '@/test/helpers/mongo';

describe('isValidName', () => {
  it('should return true if name is valid', () => {
    expect(isValidName('John')).toBe(true);
    expect(isValidName("D'Wayne")).toBe(true);
  });

  it('should return false if name is not valid', () => {
    expect(() => isValidName('')).toThrowError();
    expect(() =>
      isValidName(
        '1111111111111111111111111111111111111111111111111111111111111111111111'
      )
    ).toThrowError();
    expect(() => isValidName(1)).toThrowError();
    expect(() => isValidName(undefined)).toThrowError();
  });
});

describe('isValidEmail', () => {
  setupTestDb('isValidCreateAccountInput');

  it('should return true if email is valid', async () => {
    expect(isValidEmail('test@test.com')).resolves.toBe(true);
    expect(isValidEmail('HEY@GMAIL.COM')).resolves.toBe(true);
    expect(isValidEmail('HEY+2@GMAIL.COM')).resolves.toBe(true);
  });

  it('should return false if email is not valid', async () => {
    expect(() => isValidEmail('test')).rejects.toThrowError();
    expect(() => isValidEmail('test@t')).rejects.toThrowError();
    expect(() => isValidEmail('test@t.')).rejects.toThrowError();
    expect(() => isValidEmail('test@gmail com')).rejects.toThrowError();
    expect(() => isValidEmail('@gmail.com')).rejects.toThrowError();
  });

  it('should return false if the email is already taken', async () => {
    await accountFactory(1, { email: 'test@gmail.com' });
    expect(() => isValidEmail('test@gmail.com')).rejects.toThrowError();
  });
});

describe('isValidPassword', () => {
  it('should return true if password is valid', () => {
    expect(isValidPassword('o-!mRbuVcPvfUR6yFneh7LW.oYjtVnPZ')).toBe(true);
  });

  it('should return false if password is not valid', () => {
    expect(() => isValidPassword('')).toThrowError();
    expect(() => isValidPassword('1234567')).toThrowError();
    expect(() => isValidPassword('password')).toThrowError();
  });
});

describe('isValidCreateAccountInput', () => {
  setupTestDb('isValidCreateAccountInput');

  it('should return true if input is valid', async () => {
    await expect(
      isValidCreateAccountInput({
        firstName: 'John',
        lastName: 'Doe',
        email: 'test@gmail.com',
        password: 'aV7jNk47quZk!6eHWjon!2dkgtJTYs8T',
      })
    ).resolves.toBe(true);
  });

  it('should throw an error if the input is not valid', async () => {
    await expect(
      isValidCreateAccountInput({
        firstName: '',
        lastName: 'Doe',
        email: 'test@gmail.com',
        password: 'aV7jNk47quZk!6eHWjon!2dkgtJTYs8T',
      })
    ).rejects.toThrowError(nameMinLength());

    await expect(
      isValidCreateAccountInput({
        firstName: 'John',
        email: 'test@gmail.com',
        password: 'aV7jNk47quZk!6eHWjon!2dkgtJTYs8T',
      })
    ).rejects.toThrowError(invalidName());

    await expect(
      isValidCreateAccountInput({
        firstName: 'John',
        lastName: 'Doe',
        email: 'test@g',
        password: 'aV7jNk47quZk!6eHWjon!2dkgtJTYs8T',
      })
    ).rejects.toThrowError(invalidEmail());

    await expect(
      isValidCreateAccountInput({
        firstName: 'John',
        lastName: 'Doe',
        email: 'test@gmail.com',
        password: 'password1',
      })
    ).rejects.toThrowError(passwordTooCommon());
  });
});
