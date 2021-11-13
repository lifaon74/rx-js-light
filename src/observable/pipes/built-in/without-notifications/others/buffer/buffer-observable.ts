import { IObserver } from '../../../../../../observer/type/observer.type';
import { IObservable, IUnsubscribe } from '../../../../../type/observable.type';

export function bufferObservable<GValue>(
  subscribe: IObservable<GValue>,
  closingObservable: IObservable<any>,
): IObservable<GValue[]> {
  return (emit: IObserver<GValue[]>): IUnsubscribe => {
    let currentBuffer: GValue[] = [];

    const unsubscribeOfClosingObservable: IUnsubscribe = closingObservable((): void => {
      const buffer: GValue[] = currentBuffer;
      currentBuffer = [];
      emit(buffer);
    });

    const unsubscribeOfSourceObservable: IUnsubscribe = subscribe((value: GValue): void => {
      currentBuffer.push(value);
    });

    return (): void => {
      unsubscribeOfClosingObservable();
      unsubscribeOfSourceObservable();
    };
  };
}
