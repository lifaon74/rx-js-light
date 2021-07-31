import { clearImmediate } from './set-immediate';
import { ITask, TASKS } from './tasks.constant';

let taskRunning: boolean = false;

export function runTask(handle: number): void {
  if (taskRunning) {
    setTimeout(runTask, 0, handle);
  } else {
    if (TASKS.has(handle)) {
      const task: ITask = TASKS.get(handle) as ITask;
      taskRunning = true;
      try {
        task.callback.apply(void 0, task.args);
      } finally {
        clearImmediate(handle);
        taskRunning = false;
      }
    }
  }
}
