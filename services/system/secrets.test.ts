import { getValueAndFailIfMissing, stringToBoolean } from '@/system/secrets';

describe('services/system/secrets/getValueAndFailIfMissing', () => {
  it('should throw an error', () => {
    expect(() =>
      getValueAndFailIfMissing('TEST_DOES_NOT_EXIST')
    ).toThrowError();
  });

  it('should return the value', () => {
    expect(getValueAndFailIfMissing('IS_CI')).toBe('true');
  });
});

describe('services/system/secrets/stringToBoolean', () => {
  it('should convert a string to a boolean', () => {
    expect(stringToBoolean('true')).toBe(true);
    expect(stringToBoolean('TRUe')).toBe(true);
    expect(stringToBoolean('FALSE')).toBe(false);
    expect(() => stringToBoolean(' true ')).toThrowError();
    expect(stringToBoolean(' true ', false)).toBe(false);
  });
});
