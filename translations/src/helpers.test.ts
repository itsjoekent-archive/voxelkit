import { translateCopy } from './helpers';

describe('translateCopy', () => {
  it('should return a string to a different language', () => {
    const dictionary = {
      'en-US': 'Hello!',
      'es-MX': '¡Hola!',
    };

    const result = translateCopy(dictionary, 'es-MX');
    expect(result).toEqual('¡Hola!');
  });

  it('should return a string to a different language plural', () => {
    const dictionary = {
      'en-US': 'en-US singular',
      'en-US-plural': 'en-US plural',
      'es-MX': 'es-MX singular',
      'es-MX-plural': 'es-MX plural',
    };

    const result = translateCopy(
      dictionary,
      'es-MX',
      { condition: 2 },
      ['condition'],
      'condition'
    );
    expect(result).toEqual('es-MX plural');
  });

  it('should return the fallback language', () => {
    const dictionary = {
      'en-US': 'Hello!',
    };

    const result = translateCopy(dictionary, 'es-MX');
    expect(result).toEqual('Hello!');
  });

  it('should return the fallback language plural', () => {
    const dictionary = {
      'en-US': 'singular',
      'en-US-plural': 'plural',
    };

    const result = translateCopy(
      dictionary,
      'es-MX',
      { condition: 2 },
      ['condition'],
      'condition'
    );
    expect(result).toEqual('plural');
  });

  it('should replace variables', () => {
    const dictionary = {
      'en-US': 'Hello {{var}} {{var}}!',
      'es-MX': '¡Hola {{var}} {{var}}!',
    };

    const result = translateCopy(
      dictionary,
      'es-MX',
      { firstName: 'Test', lastName: 'User' },
      ['firstName', 'lastName']
    );
    expect(result).toEqual('¡Hola Test User!');
  });
});
