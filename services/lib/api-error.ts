type ApiErrorContext = {
  httpCode?: number;
  publicErrorMessage?: string;
};

export const ApiErrorName = 'ApiError';

export function convertNodeErrorToApiError(
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
  public readonly publicErrorMessage: NonNullable<
    ApiErrorContext['publicErrorMessage']
  >;
  constructor(
    message: string,
    _context?: ApiErrorContext | ApiErrorContext['httpCode']
  ) {
    super(message);
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
      message ||
      // @FUTURE_TRANSLATE
      'Unexpected server error, sorry about that! Some highly qualified VoxelKit engineers have been dispatched.';
  }

  toString() {
    // TODO: Strip out any sensitive info from 'message'
    return `${this.name}: ${this.message}`;
  }

  logFormat() {
    // TODO: Strip out any sensitive info from 'message'
    return {
      name: this.name,
      stack: this.stack?.toString(),
      message: this.message,
      httpCode: this.httpCode,
    };
  }
}
