import { assert } from '../../test/assert';
import { IEqualsFunction, strictEquals } from '../../test/compare';
import { IGenericNotification } from '../misc/notifications/notification.type';
import { asyncUnsubscribe } from '../misc/helpers/async-unsubscribe';
import { ISubscribeFunction } from '../types/subscribe-function/subscribe-function.type';

export interface IIsExpectedValue<GValue> {
  (value: GValue): boolean
}


export interface ITestSubscribeFunctionEmitsOptions {
  timeout?: number;
  equalsFunction?: IEqualsFunction;
}


export function testSubscribeFunctionEmits<GValue>(
  subscribe: ISubscribeFunction<GValue>,
  isExpectedValue: readonly IIsExpectedValue<GValue>[],
  { timeout = 1000, equalsFunction: strictEquals }: ITestSubscribeFunctionEmitsOptions = {}
): Promise<boolean> {
  return new Promise<boolean>((
    resolve: (value: boolean) => void,
    reject: (error: any) => void,
  ): void => {
    let index: number = -1;

    const end = () => {
      clearInterval(timer);
      asyncUnsubscribe(() => unsubscribe);
    };

    const _resolve = () => {
      end();
      resolve(true);
    };

    const _reject = (error: any) => {
      end();
      reject(error);
    };

    const unsubscribe = subscribe((value: GValue) => {
      index++;

      if (index >= isExpectedValue.length) {
        _reject(new Error(`Too much values received`));
      } else if (!isExpectedValue[index](value)) {
        console.log(value);
        console.log(isExpectedValue[index].toString());
        _reject(new Error(`Invalid value received #${ index }`));
      }
    });

    const timer = setTimeout(() => {
      if (index === (isExpectedValue.length - 1)) {
        _resolve();
      } else {
        _reject(new Error(`Not enough values received`));
      }
    }, timeout);

  });
}

export function assertSubscribeFunctionEmits<GValue>(
  subscribe: ISubscribeFunction<GValue>,
  isExpectedValue: readonly IIsExpectedValue<GValue>[],
  options?: ITestSubscribeFunctionEmitsOptions
): Promise<void> {
  return assert(() => testSubscribeFunctionEmits(subscribe, isExpectedValue, options), `assertSubscribeFunctionEmits`);
}


export function notificationEquals(
  a: IGenericNotification,
  b: IGenericNotification,
  valueEqualsFunction: IEqualsFunction = strictEquals,
): boolean {
  return (a.name === b.name)
    && valueEqualsFunction(a.value, b.value);
}
