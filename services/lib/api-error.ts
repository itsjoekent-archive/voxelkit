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

export default class ApiError extends Error {
  public readonly httpCode: NonNullable<ApiErrorContext['httpCode']>;
  private readonly publicErrorMessage: ErrorMessage;

  constructor(
    message: ErrorMessage,
    _context?: ApiErrorContext | ApiErrorContext['httpCode']
  ) {
    const baseMessage =
      typeof message === 'function' ? message('en-us') : message;
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
    // TODO: add request tracing id
    return `${this.name}: ${this.message}`;
  }
}
