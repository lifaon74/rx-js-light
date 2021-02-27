import { runTest, runTests } from '../../test/test-functions';
import { testFromAsyncIterable } from '../subscribe-function/from/iterable/async/from-async-iterable/from-async-iterable.test';
import { testFromAsyncIterator } from '../subscribe-function/from/iterable/async/from-async-iterator/from-async-iterator.test';


export function test() {
  return runTests(async () => {
    await Promise.all([
      runTest('testFromAsyncIterator', testFromAsyncIterator),
      runTest('testFromAsyncIterable', testFromAsyncIterable),
    ]);
  });
}
