import { ISubscription } from '../subscription.type';

export type ISubscriptionManagerSetMode = 'skip' | 'replace' | 'throw';

export interface ISubscriptionManager {
  readonly size: number;

  /* MAP OPERATIONS */

  has(key: string): boolean;

  get<GSubscription extends ISubscription<any>>(key: string): GSubscription | undefined;

  get<GSubscription extends ISubscription<any>>(key: string, mode: 'throw'): GSubscription | never;

  set<GSubscription extends ISubscription<any>>(
    key: string,
    subscription: GSubscription,
    mode?: ISubscriptionManagerSetMode,
  ): GSubscription;

  delete(key: string): void;

  clear(): void;

  /* BULK OPERATIONS */

  activateAll(): void;

  deactivateAll(): void;

  /* ITERATE */

  [Symbol.iterator](): IterableIterator<[string, ISubscription<any>]>;

  entries(): IterableIterator<[string, ISubscription<any>]>;

  keys(): IterableIterator<string>;

  values(): IterableIterator<ISubscription<any>>;
}
