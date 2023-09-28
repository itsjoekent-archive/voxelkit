import ApiError from '@/system/api-error';

export function getValueAndFailIfMissing(key: string): string | never {
  const value = process.env[key];
  if (!value) {
    throw new ApiError(`Missing env var ${key}`, 500);
  }

  return value;
}

export function stringToBoolean(
  value: string,
  throwIfInvalid: boolean = true
): boolean {
  if (throwIfInvalid && !['true', 'false'].includes(value.toLowerCase())) {
    throw new ApiError(`Invalid boolean string '${value}'`, 500);
  }

  return value.toLowerCase() === 'true';
}

export function getEnvironment() {
  return getValueAndFailIfMissing('ENVIRONMENT');
}

export function getServicesMongoDbUri() {
  return getValueAndFailIfMissing('SERVICES_MONGODB_URI');
}

export function getServicesMongoDbName() {
  return getValueAndFailIfMissing('SERVICES_MONGODB_DBNAME');
}
