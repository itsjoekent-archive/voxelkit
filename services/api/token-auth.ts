import { Scopes, Token } from '@/schema/token';

export const defaultScopes: Scopes[] = ['account:*'];

export function hasScope(check: string, token: Token): boolean {
  const hasExactScope = (token.scopes as string[]).includes(check);
  if (check.endsWith(':*') || !check.includes(':')) {
    return hasExactScope;
  }

  const wildcardCheck = `${check.split(':')[0]}:*` as Scopes;
  return hasExactScope || token.scopes.includes(wildcardCheck);
}
