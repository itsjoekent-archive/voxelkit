import type { Request, Response } from 'express';
import { formatCreateAccountInputData } from '@/formatters/account';
import { isValidCreateAccountInput } from '@/validations/account';
import { CreateAccountInputs } from '@/schema/account';
import getRequestLanguage from '@/lib/get-request-language';

export default async function createAccount(
  request: Request,
  response: Response
) {
  await isValidCreateAccountInput(request.body);

  const language = getRequestLanguage(request);
  const createAccountInputs: CreateAccountInputs = {
    ...(request.body as Omit<CreateAccountInputs, 'language'>),
    language,
  };

  const createAccountInputsFormatted =
    await formatCreateAccountInputData(createAccountInputs);

  // TODO: Write to database
  // TODO: Format database object to response

  response.status(200).json({
    success: true,
  });
}
