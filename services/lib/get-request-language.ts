import acceptLanguage from 'accept-language';
import type { Request } from 'express';
import { LanguageCode, languages } from '@voxelkit/translations';

const languagesWithoutDefault = languages.filter(
  (language) => language !== 'en-US'
);

acceptLanguage.languages(['en-US', ...languagesWithoutDefault]);

export default function getRequestLanguage(request: Request): LanguageCode {
  const languageHeader = request.headers['accept-language'];

  return acceptLanguage.get(languageHeader) as LanguageCode;
}
