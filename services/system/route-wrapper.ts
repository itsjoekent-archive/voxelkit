import type { Request, Response, Router } from 'express';
import { LanguageCode } from '@voxelkit/translations';
import ApiError, { convertJsErrorToApiError } from '@/system/api-error';
import getRequestLanguage from '@/system/get-request-language';

export default async function routeWrapper(
  router: Router,
  path: string,
  method: 'get' | 'post' | 'put' | 'delete' | 'patch',
  handler: (request: Request, response: Response) => Promise<void> | void
) {
  router[method](path, async (request, response) => {
    let language: LanguageCode = 'en-US';

    try {
      language = getRequestLanguage(request);
      await handler(request, response);
    } catch (error) {
      let apiError: ApiError;

      if (error instanceof ApiError) {
        apiError = error;
      } else {
        if (error instanceof Error) {
          apiError = convertJsErrorToApiError(error);
        } else {
          apiError = new ApiError('Unknown error in routeWrapper', 500);
        }
      }

      console.error(`${apiError.toString()}\n${apiError.stack}`);

      const publicErrorMessage = apiError.getPublicErrorMessage(language);
      if (request.get('accept') === 'application/json') {
        response.status(apiError.httpCode).json({
          error: publicErrorMessage,
        });
      } else {
        response.status(apiError.httpCode).send(publicErrorMessage);
      }
    }
  });
}
