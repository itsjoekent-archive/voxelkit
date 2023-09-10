export type LanguageCode = 'en-us' | 'es-mx';

export const languages: LanguageCode[] = ['en-us', 'es-mx'];

export function translateCopy<ArgsType extends Record<string, any>>(
  dictionary: Record<string, string>,
  language: LanguageCode,
  args?: ArgsType,
  argsOrder?: string[],
  pluralizer?: string
): string {
  const isPlural =
    !!pluralizer &&
    typeof args?.[pluralizer] === 'number' &&
    (args[pluralizer] as number) > 1;

  let dictionaryKey = isPlural ? `${language}-plural` : language;
  if (!dictionary[dictionaryKey]) {
    dictionaryKey = isPlural ? `en-us-plural` : 'en-us';
  }

  let copy = dictionary[dictionaryKey];
  if (!args || !argsOrder) return copy;

  argsOrder.forEach((argName) => {
    const argValue = args[argName];
    copy = copy.replace(`{{var}}`, argValue.toString());
  });

  return copy;
}
