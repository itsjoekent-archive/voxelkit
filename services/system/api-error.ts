import { LanguageCode, defaultApiErrorRef } from '@voxelkit/translations';

type ErrorMessage = string | ((language: LanguageCode) => string);

type ApiErrorContext = {
  httpCode?: number;
  publicErrorMessage?: ErrorMessage;
};

export const ApiErrorName = 'ApiError';

export function convertJsErrorToApiError(
  error: any,
  context?: ApiErrorContext | ApiErrorContext['httpCode']
) {
  const apiError = new ApiError(error?.message, context);
  if (error.stack) {
    apiError.stack = error.stack;
  }

  return apiError;
}

/**
 * ApiError Behaviors:
 * - If httpCode is not passed, then it will default to 500
 * - 500 >= errors have a default publicErrorMessage for unexpected errors
 * - If httpCode >= 500, then publicErrorMessage will not ever inherit the message passed in the constructor
 * - If the httpCode < 500, then publicErrorMessage will inherit the message passed in the constructor if no publicErrorMessage is passed as well
 * - If a message needs to be returned to the user, then it should be passed as the ${translationFunctionName}Ref() function
 * - The `toString()` call will attempt to remove sensitive information from message before it logs to the console, but be careful...
 */

// TODO: Add a way to pass in a request tracing id
// TODO: Add a way to pass custom error json

export default class ApiError extends Error {
  public readonly httpCode: NonNullable<ApiErrorContext['httpCode']>;
  private readonly publicErrorMessage: ErrorMessage;

  constructor(
    message: ErrorMessage,
    _context?: ApiErrorContext | ApiErrorContext['httpCode']
  ) {
    const baseMessage =
      typeof message === 'function' ? message('en-US') : message;
    super(baseMessage);
    Object.setPrototypeOf(this, ApiError.prototype);

    this.name = ApiErrorName;
    this.stack = new Error().stack;

    const isContextJustStatusCode = typeof _context === 'number';
    const context = isContextJustStatusCode ? undefined : _context;

    this.httpCode = isContextJustStatusCode
      ? _context
      : context?.httpCode || 500;

    this.publicErrorMessage =
      context?.publicErrorMessage ||
      (this.httpCode < 500 ? message : null) ||
      defaultApiErrorRef();
  }

  getPublicErrorMessage(language: LanguageCode) {
    return typeof this.publicErrorMessage === 'function'
      ? this.publicErrorMessage(language)
      : this.publicErrorMessage;
  }

  toString() {
    // TODO: Strip out any sensitive info from 'message'
    // - any sensitive environment variables
    // - json regex match account.password and other sensitive fields
    // - add prefixes to strings containing sensitive data to make it easier to find (eg: pw_, tk_, etc)
    // TODO: add request tracing id
    return `${this.name}: ${this.message}`;
  }
}
