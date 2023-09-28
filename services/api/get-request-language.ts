import acceptLanguage from 'accept-language';
import type { Request } from 'express';
import {
  LanguageCode,
  languages,
  defaultLanguage,
} from '@voxelkit/translations';

const languagesWithoutDefault = languages.filter(
  (language) => language !== defaultLanguage
);

acceptLanguage.languages([defaultLanguage, ...languagesWithoutDefault]);

export default function getRequestLanguage(request: Request): LanguageCode {
  const languageHeader = request.headers['accept-language'];

  return acceptLanguage.get(languageHeader) as LanguageCode;
}
