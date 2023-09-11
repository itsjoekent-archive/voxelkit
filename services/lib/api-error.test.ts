import ApiError, { convertJsErrorToApiError } from '@/lib/api-error';

describe('convertJsErrorToApiError', () => {
  it('should return an ApiError', () => {
    const error = new Error('Test error');
    const apiError = convertJsErrorToApiError(error);
    expect(apiError).toBeInstanceOf(Error);
    expect(apiError).toBeInstanceOf(ApiError);
    expect(apiError).toHaveProperty('httpCode', 500);
    expect(apiError).toHaveProperty('publicErrorMessage');
    expect(apiError.getPublicErrorMessage('en-US')).not.toEqual('Test error');
  });
});

describe('ApiError', () => {
  it('should create an ApiError', () => {
    const apiError = new ApiError('Test error');
    expect(apiError).toBeInstanceOf(Error);
    expect(apiError).toBeInstanceOf(ApiError);
    expect(apiError.httpCode).toBe(500);
    expect(apiError.getPublicErrorMessage('en-US')).not.toEqual('Test error');
  });

  it('should create an ApiError with a translation ref function in the constructor', () => {
    const apiError = new ApiError((language) => `test ${language}`, 400);
    expect(apiError).toBeInstanceOf(Error);
    expect(apiError).toBeInstanceOf(ApiError);
    expect(apiError.httpCode).toBe(400);
    expect(apiError.getPublicErrorMessage('en-US')).toEqual('test en-US');
  });

  it('should create an ApiError with a status code', () => {
    const apiError = new ApiError('Test error', 400);
    expect(apiError).toBeInstanceOf(Error);
    expect(apiError).toBeInstanceOf(ApiError);
    expect(apiError.httpCode).toBe(400);
    expect(apiError.getPublicErrorMessage('en-US')).toEqual('Test error');
  });

  it('should create an ApiError with a status code and custom public message', () => {
    const apiError = new ApiError('Test error', {
      httpCode: 400,
      publicErrorMessage: 'Public',
    });
    expect(apiError.httpCode).toBe(400);
    expect(apiError.getPublicErrorMessage('en-US')).toEqual('Public');
  });

  it('should create an ApiError that invokes a translation ref function', () => {
    const apiError = new ApiError('Test error', {
      httpCode: 400,
      publicErrorMessage: (language) => `test ${language}`,
    });
    expect(apiError.httpCode).toBe(400);
    expect(apiError.getPublicErrorMessage('en-US')).toEqual('test en-US');
  });
});
