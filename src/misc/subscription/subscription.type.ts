import { IEmitFunction } from '../../types/emit-function/emit-function.type';
import { ISubscribeFunction } from '../../types/subscribe-function/subscribe-function.type';




export interface ISubscription<GValue> {
  readonly subscribe: ISubscribeFunction<GValue>;
  readonly emit: IEmitFunction<GValue>;

  isActivated(): boolean;

  activate(): this;

  deactivate(): this;

  toggle(activate?: boolean): this;
}


export interface ISubscriptionConstructor {
  new<GValue>(
    subscribe: ISubscribeFunction<GValue>,
    emit: IEmitFunction<GValue>,
  ): ISubscription<GValue>;
}
