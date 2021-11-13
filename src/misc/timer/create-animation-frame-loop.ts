import { IAbortTimer } from './abort-timer.type';
import { createAnimationFrame } from './create-animation-frame';

export function createAnimationFrameLoop(
  callback: () => void,
): IAbortTimer {
  let running: boolean = true;
  let abortAnimationFrame: IAbortTimer;

  const loop = () => {
    abortAnimationFrame = createAnimationFrame(() => {
      callback();
      if (running) {
        loop();
      }
    });
  };

  loop();

  return (): void => {
    if (running) {
      running = false;
      abortAnimationFrame();
    }
  };
}
