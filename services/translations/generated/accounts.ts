// THIS FILE IS AUTOMATICALLY GENERATED BY TRANSLATIONS/GENERATOR.TS
// DO NOT EDIT THIS FILE DIRECTLY.

import { LanguageCode, translateCopy } from '@services/translations/helpers';

export function failedToCreateAccount(language: LanguageCode): string {
  return translateCopy({ 'en-us': 'Failed to create account' }, language);
}

export function failedToCreateAccountRef() {
  return failedToCreateAccount;
}

export function invalidName(language: LanguageCode): string {
  return translateCopy({ 'en-us': 'Invalid name' }, language);
}

export function invalidNameRef() {
  return invalidName;
}

export function nameMinLength(language: LanguageCode): string {
  return translateCopy(
    { 'en-us': 'Name must be at least 1 character long' },
    language
  );
}

export function nameMinLengthRef() {
  return nameMinLength;
}

export function nameMaxLength(language: LanguageCode): string {
  return translateCopy(
    { 'en-us': 'Name must be at most 50 characters long' },
    language
  );
}

export function nameMaxLengthRef() {
  return nameMaxLength;
}

export function invalidEmail(language: LanguageCode): string {
  return translateCopy(
    { 'en-us': 'Email must be a valid email address' },
    language
  );
}

export function invalidEmailRef() {
  return invalidEmail;
}

export function passwordMinLength(language: LanguageCode): string {
  return translateCopy(
    { 'en-us': 'Password must be at least 8 characters long' },
    language
  );
}

export function passwordMinLengthRef() {
  return passwordMinLength;
}

export function passwordMaxLength(language: LanguageCode): string {
  return translateCopy(
    { 'en-us': 'Password must be at most 2056 characters long' },
    language
  );
}

export function passwordMaxLengthRef() {
  return passwordMaxLength;
}

export function passwordTooCommon(language: LanguageCode): string {
  return translateCopy({ 'en-us': 'Password is too common' }, language);
}

export function passwordTooCommonRef() {
  return passwordTooCommon;
}
