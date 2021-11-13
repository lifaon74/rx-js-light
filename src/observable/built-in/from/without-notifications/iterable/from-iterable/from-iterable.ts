import { IObserver } from '../../../../../../observer/type/observer.type';
import { fromIterator } from '../from-iterator/from-iterator';
import { IObservable, IUnsubscribe } from '../../../../../type/observable.type';

export function fromIterable<GValue>(
  iterable: Iterable<GValue>,
): IObservable<GValue> {
  return (emit: IObserver<GValue>): IUnsubscribe => {
    return fromIterator<GValue>(iterable[Symbol.iterator]())(emit);
  };
}


// export function fromIterable<GValue>(
//   iterable: Iterable<GValue>,
// ): IObservable<GValue> {
//   return (emit: IObserver<GValue>): IUnsubscribe => {
//     const iterator: Iterator<GValue> = iterable[Symbol.iterator]();
//     let running: boolean = true;
//     let result: IteratorResult<GValue>;
//     while (running && !(result = iterator.next()).done) {
//       emit(result.value);
//     }
//     return (): void => {
//       running = false;
//     };
//   };
// }
