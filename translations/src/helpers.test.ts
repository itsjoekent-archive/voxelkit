import { translateCopy } from './helpers';

describe('translateCopy', () => {
  it('should return a string to a different language', () => {
    const dictionary = {
      'en-us': 'Hello!',
      'es-mx': '¡Hola!',
    };

    const result = translateCopy(dictionary, 'es-mx');
    expect(result).toEqual('¡Hola!');
  });

  it('should return a string to a different language plural', () => {
    const dictionary = {
      'en-us': 'en-us singular',
      'en-us-plural': 'en-us plural',
      'es-mx': 'es-mx singular',
      'es-mx-plural': 'es-mx plural',
    };

    const result = translateCopy(
      dictionary,
      'es-mx',
      { condition: 2 },
      ['condition'],
      'condition'
    );
    expect(result).toEqual('es-mx plural');
  });

  it('should return the fallback language', () => {
    const dictionary = {
      'en-us': 'Hello!',
    };

    const result = translateCopy(dictionary, 'es-mx');
    expect(result).toEqual('Hello!');
  });

  it('should return the fallback language plural', () => {
    const dictionary = {
      'en-us': 'singular',
      'en-us-plural': 'plural',
    };

    const result = translateCopy(
      dictionary,
      'es-mx',
      { condition: 2 },
      ['condition'],
      'condition'
    );
    expect(result).toEqual('plural');
  });

  it('should replace variables', () => {
    const dictionary = {
      'en-us': 'Hello {{var}} {{var}}!',
      'es-mx': '¡Hola {{var}} {{var}}!',
    };

    const result = translateCopy(
      dictionary,
      'es-mx',
      { firstName: 'Test', lastName: 'User' },
      ['firstName', 'lastName']
    );
    expect(result).toEqual('¡Hola Test User!');
  });
});
