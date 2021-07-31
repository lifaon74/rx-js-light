import { IRegisterImmediate } from './register-immediate.type';
import { runTask } from './run-task';

/** SET TIMEOUT **/

export function setTimeoutImplementation(): IRegisterImmediate {
  return (handle: number) => {
    setTimeout(runTask, 0, handle);
  };
}
