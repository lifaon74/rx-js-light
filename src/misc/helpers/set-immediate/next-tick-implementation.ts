import { IRegisterImmediate } from './register-immediate.type';
import { runTask } from './run-task';

/** NEXT TICK **/

export function nextTickImplementation(process: any): IRegisterImmediate {
  return (handle: number) => {
    process.nextTick(() => {
      runTask(handle);
    });
  };
}
