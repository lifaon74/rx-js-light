export function freeze<T>(a: T[]): readonly T[];
export function freeze<T extends Function>(f: T): T;
export function freeze<T>(o: T): Readonly<T>;
export function freeze<T>(value: unknown): any {
  return Object.freeze(value);
}
