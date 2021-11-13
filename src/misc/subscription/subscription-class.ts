import { IObserver } from '../../observer/type/observer.type';
import { IObservable, IUnsubscribe } from '../../observable/type/observable.type';
import { ISubscription } from './subscription.type';

/**
 * TODO very close of a IEmitSubscribePair
 */

export class Subscription<GValue> implements ISubscription<GValue> {
  public readonly subscribe: IObservable<GValue>;
  public readonly emit: IObserver<GValue>;

  protected _unsubscribe: IUnsubscribe | null;

  constructor(
    subscribe: IObservable<GValue>,
    emit: IObserver<GValue>,
  ) {
    this.subscribe = subscribe;
    this.emit = emit;
    this._unsubscribe = null;
  }

  isActivated(): boolean {
    return this._unsubscribe !== null;
  }

  activate(): this {
    if (this._unsubscribe === null) {
      this._unsubscribe = this.subscribe(this.emit);
    }
    return this;
  }

  deactivate(): this {
    if (this._unsubscribe !== null) {
      this._unsubscribe();
      this._unsubscribe = null;
    }
    return this;
  }

  toggle(
    activate: boolean = !this.isActivated(),
  ): this {
    if (activate) {
      return this.activate();
    } else {
      return this.deactivate();
    }
  }
}

