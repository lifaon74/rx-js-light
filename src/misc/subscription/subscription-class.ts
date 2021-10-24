import { ISubscription } from './subscription.type';
import { IEmitFunction, ISubscribeFunction, IUnsubscribeFunction } from '../../types';

/**
 * TODO very close of a IEmitSubscribePair
 */

export class Subscription<GValue> implements ISubscription<GValue> {
  public readonly subscribe: ISubscribeFunction<GValue>;
  public readonly emit: IEmitFunction<GValue>;

  protected _unsubscribe: IUnsubscribeFunction | null;

  constructor(
    subscribe: ISubscribeFunction<GValue>,
    emit: IEmitFunction<GValue>,
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

