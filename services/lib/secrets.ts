import ApiError from '@services/lib/api-error';

function getValueAndFailIfMissing(key: string): string | never {
  const value = process.env[key];
  if (!value) {
    throw new ApiError(`Missing env var ${key}`, 500);
  }

  return value;
}

export function getMongoDbUri() {
  return getValueAndFailIfMissing('MONGODB_URI');
}
