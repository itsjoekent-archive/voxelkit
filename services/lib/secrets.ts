import ApiError from '@/lib/api-error';

export function getValueAndFailIfMissing(key: string): string | never {
  const value = process.env[key];
  if (!value) {
    throw new ApiError(`Missing env var ${key}`, 500);
  }

  return value;
}

export function getEnvironment() {
  return getValueAndFailIfMissing('ENVIRONMENT');
}

export function getServicesMongoDbUri() {
  return getValueAndFailIfMissing('SERVICES_MONGODB_URI');
}
