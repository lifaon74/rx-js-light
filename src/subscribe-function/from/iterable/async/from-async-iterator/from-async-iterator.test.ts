import { assertSubscribeFunctionEmits, notificationEquals } from '../../../../../test/assert-subscribe-functions';
import { fromAsyncIterator } from './from-async-iterator';
import { createNextNotification } from '../../../../../misc/notifications/built-in/next/create-next-notification';
import { STATIC_COMPLETE_NOTIFICATION } from '../../../../../misc/notifications/built-in/complete-notification';
import { runTest } from '../../../../../../test/test-functions';
import { createErrorNotification } from '../../../../../misc';

async function testFromAsyncIteratorWithComplete() {
  await assertSubscribeFunctionEmits(
    fromAsyncIterator(
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

async function testFromAsyncIteratorWithError() {
  await assertSubscribeFunctionEmits(
    fromAsyncIterator(
      (async function * () {
        for (let i = 0; i < 3; i++) {
          yield i;
          if (i > 0) {
            throw new Error();
          }
        }
      })()
    ),
    [
      _ => notificationEquals(_, createNextNotification(0)),
      _ => notificationEquals(_, createNextNotification(1)),
      _ => notificationEquals(_, createErrorNotification(void 0), _ => (_ instanceof Error)),
    ]
  );
}

export async function testFromAsyncIterator() {
  await Promise.all([
    runTest('testFromAsyncIteratorWithComplete', testFromAsyncIteratorWithComplete),
    runTest('testFromAsyncIteratorWithError', testFromAsyncIteratorWithError),
  ]);
}



