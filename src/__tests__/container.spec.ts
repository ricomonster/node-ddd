// Function to test
import { container } from './../container';

describe('container', () => {
  it('should load up everything we need.', () => {
    const modules = container.registrations;

    expect(Object.keys(modules).length > 0).toBeTruthy();
  });
});
