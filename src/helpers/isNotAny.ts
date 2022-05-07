type IsAny<T> = unknown extends T ? (T extends object ? T : never) : never;

type NotAny<T> = T extends IsAny<T> ? never : T;

/**
 * Does nothing at runtime, but pre-compile errors should occur if an 'any' typed argument is provided.
 * This is used for tests to help ensure typings don't get lost or break over time.
 * @param x
 */
export function isNotAny<T>(x: NotAny<T>) {
  return x;
}
