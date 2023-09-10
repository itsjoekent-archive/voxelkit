# @voxelkit/translations

Developer tooling and Typescript library for providing translated strings.

## Adding New Translations

Add translations to the `translations/collections` folder. Create collection files (`${name}.json`) to group similar groups of copy. Translation keys should be `PascalCase`.

Translations can be in one of two formats,

```ts
// Simple
{
  "KeyName": "Hello, world!",
}

// Advanced
{
  "KeyName": {
    "phrase": "Hello, {{var}}!",
    // The args order is specific, and replaces each {{var}} in order.
    "args": [
      {
        "name": "firstName",
        "type": "string", // Should be 'string' | 'number'
        "required": true,
      }
    ]
  }
}
```

You can also include conditionally plural translation phrases using the `{{plural}}` syntax in your phrase,

```ts
{
  "CookieCount": {
    "phrase": "You have {{var}} cookie{{plural}}",
    "args": [
      {
        "name": "count",
        "type": "number",
        "required": true,
        "pluralizer": true
      }
    ]
  }
}

cookieCount({ count: 1 }) // You have 1 cookie
cookieCount({ count: 10 }) // You have 10 cookie's
```

All changes to files within the `collections` directory should trigger an automatic rebuild.

## Usage

This library is in the npm workspace, and can be used within any npm project under the root directory.

```ts
import { translationFunction } from '@voxelkit/translations';

console.log(translationFunction());
```

### Supported Languages

- `en-us` (default)
- `es-mx`

To specify the language,

```ts
import { exampleTranslationFunction } from '@voxelkit/translations';

console.log(exampleTranslationFunction('es-mx'));
```

You can also use the `LanguageCode` type and `languages` list to enforce what language strings are accepted,

`import { LanguageCode, languages } from '@voxelkit/translations`

### Translation Function References

It can be helpful to invoke a translation function without having to pass the language all the way down from a caller that would have access to that request data.

To achieve this, add `Ref` to your translation function import,

```ts
import { exampleTranslationFunctionRef } from '@voxelkit/translations';

throw new CustomError(exampleTranslationFunctionRef({ some: argument }));
```

This ref function returns a new function that forwards your string replacement tokens to the original translation function and accepts a language argument. You can then build custom wrapper code to intercept these ref's and supply the language code to get the final cooy.

```ts
return typeof this.errorMessage === 'function'
  ? this.publicErrorMessage(language)
  : this.publicErrorMessage;
```

Checkout `services/lib/ApiError` for an example of this in practice.
