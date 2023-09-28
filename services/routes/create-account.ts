import type { Request, Response } from 'express';
import { formatCreateAccountInputData } from '@/formatters/account';
import getRequestLanguage from '@/api/get-request-language';
import { insertAccount } from '@/queries/account';
import { CreateAccountInputs } from '@/schema/account';
import { isValidCreateAccountInput } from '@/validations/account';

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

  const account = await insertAccount({
    avatarUrl: '',
    ...createAccountInputsFormatted,
  });

  // TODO: Format database object to response

  response.status(200).json({
    success: true,
  });
}
