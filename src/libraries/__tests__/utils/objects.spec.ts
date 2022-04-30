// Function to test
import { isObject } from '../../utils/objects';

describe('Libraries :: Utils :: objects', () => {
  it('should return true as the given value is an object.', () => {
    const object = isObject({ a: 1, b: 2 });

    expect(object).toBeTruthy();
  });

  it('should return false as the given value is a string.', () => {
    const object = isObject('foo');

    expect(object).toBeFalsy();
  });
});
