import { IRegisterImmediate } from './register-immediate.type';
import { runTask } from './run-task';

/** MESSAGE CHANNEL **/

export function messageChannelImplementation(): IRegisterImmediate {
  const channel: MessageChannel = new MessageChannel();
  channel.port1.onmessage = (event: MessageEvent) => {
    const handle: number = event.data;
    runTask(handle);
  };

  return (handle: number) => {
    channel.port2.postMessage(handle);
  };
}
