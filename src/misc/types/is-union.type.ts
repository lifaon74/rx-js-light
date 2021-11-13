// https://stackoverflow.com/questions/53953814/typescript-check-if-a-type-is-a-union
export type IsUnion<T, U extends T = T> =
  T extends unknown ? [U] extends [T] ? never : true : never;

