// THIS FILE IS AUTOMATICALLY GENERATED BY TRANSLATIONS/GENERATOR.TS
// DO NOT EDIT THIS FILE DIRECTLY.

import { LanguageCode, translateCopy } from '@services/translations/helpers';

export function defaultApiError(language: LanguageCode): string {
  return translateCopy(
    {
      'en-us':
        'Unexpected server error, sorry about that! Some highly qualified VoxelKit engineers have been dispatched.',
    },
    language
  );
}

export function defaultApiErrorRef() {
  return defaultApiError;
}
