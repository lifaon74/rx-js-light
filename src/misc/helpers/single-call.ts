export function singleCall<GFunction extends (...args: unknown[]) => void>(callback: GFunction): (...args: Parameters<GFunction>) => void {
  let done: boolean = false;
  return (...args: Parameters<GFunction>): void => {
    if (!done) {
      done = true;
      return callback(...args);
    }
  };
}

