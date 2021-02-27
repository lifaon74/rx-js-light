import { assertSubscribeFunctionEmits, notificationEquals } from '../../../../../test/assert-subscribe-functions';
import { fromAsyncIterable } from './from-async-iterable';
import { createNextNotification } from '../../../../../misc/notifications/built-in/next/create-next-notification';
import { STATIC_COMPLETE_NOTIFICATION } from '../../../../../misc/notifications/built-in/complete-notification';
import { runTest } from '../../../../../../test/test-functions';

async function testFromAsyncIterableWithComplete() {
  await assertSubscribeFunctionEmits(
    fromAsyncIterable(
      (async function * () {
        for (let i = 0; i < 2; i++) {
          yield i;
        }
      })()
    ),
    [
      _ => notificationEquals(_, createNextNotification(0)),
      _ => notificationEquals(_, createNextNotification(1)),
      _ => notificationEquals(_, STATIC_COMPLETE_NOTIFICATION),
    ]
  );
}

export async function testFromAsyncIterable() {
  await Promise.all([
    runTest('testFromAsyncIterableWithComplete', testFromAsyncIterableWithComplete),
  ]);
}



