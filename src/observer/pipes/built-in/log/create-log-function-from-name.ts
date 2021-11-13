import { ITapFunction } from '../tap/tap-function.type';

export function createLogFunctionFromName<GValue>(
  name?: string,
): ITapFunction<GValue> {
  return (name === void 0)
    ? (value: GValue) => console.log(value)
    : (value: GValue) => console.log(name, value);
}
