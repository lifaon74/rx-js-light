import { IObservable } from '../observable.type';

export type IHigherOrderObservable<GValue> = IObservable<IObservable<GValue>>;
