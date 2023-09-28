import { hasScope } from '@/api/token-auth';
import tokenFactory from '@/test/factory/token';

describe('services/api/token-auth/hasScope', () => {
  it('should check for valid scopes', () => {
    expect(hasScope('test', tokenFactory())).toBe(false);
    expect(hasScope('account:read', tokenFactory())).toBe(true);
    expect(hasScope('account:*', tokenFactory())).toBe(true);
    expect(hasScope('admin:*', tokenFactory())).toBe(false);
    expect(
      hasScope('account:*', tokenFactory(undefined, ['account:read']))
    ).toBe(false);
  });
});
