import {
  isValidName,
  isValidEmail,
  isValidPassword,
  isValidCreateAccountInput,
} from '@/validations/account';

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
  it('should return true if email is valid', () => {
    expect(isValidEmail('test@test.com')).toBe(true);
    expect(isValidEmail('HEY@GMAIL.COM')).toBe(true);
    expect(isValidEmail('HEY+2@GMAIL.COM')).toBe(true);
  });

  it('should return false if email is not valid', () => {
    expect(() => isValidEmail('test')).toThrowError();
    expect(() => isValidEmail('test@t')).toThrowError();
    expect(() => isValidEmail('test@t.')).toThrowError();
    expect(() => isValidEmail('test@gmail com')).toThrowError();
    expect(() => isValidEmail('@gmail.com')).toThrowError();
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
  it('should return true if input is valid', () => {
    expect(
      isValidCreateAccountInput({
        firstName: 'John',
        lastName: 'Doe',
        email: 'test@gmail.com',
        password: 'aV7jNk47quZk!6eHWjon!2dkgtJTYs8T',
      })
    ).toBe(true);
  });

  it('should return false if input is not valid', () => {
    expect(() =>
      isValidCreateAccountInput({
        firstName: '',
        lastName: 'Doe',
        email: 'test@gmail.com',
        password: 'aV7jNk47quZk!6eHWjon!2dkgtJTYs8T',
      })
    ).toThrowError();

    expect(() =>
      isValidCreateAccountInput({
        firstName: 'John',
        email: 'test@gmail.com',
        password: 'aV7jNk47quZk!6eHWjon!2dkgtJTYs8T',
      })
    ).toThrowError();

    expect(() =>
      isValidCreateAccountInput({
        firstName: '',
        lastName: 'Doe',
        email: 'test@g',
        password: 'aV7jNk47quZk!6eHWjon!2dkgtJTYs8T',
      })
    ).toThrowError();

    expect(() =>
      isValidCreateAccountInput({
        firstName: '',
        lastName: 'Doe',
        email: 'test@gmail.com',
        password: 'password1',
      })
    ).toThrowError();
  });
});
