export function isObject(inputs: any): boolean {
  if (typeof inputs !== 'object' || Array.isArray(inputs) || inputs === null) {
    return false;
  }

  return true;
}