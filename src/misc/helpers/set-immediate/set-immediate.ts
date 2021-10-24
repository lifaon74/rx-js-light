import { getGlobalThis } from '../get-global-this';
import { getRegisterImmediateImplementation } from './get-register-immediate-implementation';
import { IRegisterImmediate } from './register-immediate.type';
import { TASKS } from './tasks.constant';

let registerImmediate: IRegisterImmediate;
let nextHandle: number = 1;

export function setImmediate<GArguments extends any[]>(
  callback: (...args: GArguments) => void,
  ...args: GArguments
): number {
  if (registerImmediate === void 0) {
    registerImmediate = getRegisterImmediateImplementation(getGlobalThis());
  }
  TASKS.set(nextHandle, { callback: callback as any, args });
  registerImmediate(nextHandle);
  return nextHandle++;
}

export function clearImmediate(handle: number): void {
  TASKS.delete(handle);
}
