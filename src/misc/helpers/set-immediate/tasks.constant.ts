export interface ITask {
  // id: number;
  callback: (...args: any[]) => void;
  args: any[];
}

// const tasks: Task[] = [];
export const TASKS: Map<number, ITask> = new Map<number, ITask>();
