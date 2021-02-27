import { ISubscription } from '../subscription.type';
import { ISubscriptionManager, ISubscriptionManagerSetMode } from './subscription-manager.type';


export class SubscriptionManager implements ISubscriptionManager {
  protected _subscriptionsMap: Map<string, ISubscription<any>>;

  constructor() {
    this._subscriptionsMap = new Map<string, ISubscription<any>>();
  }

  get size(): number {
    return this._subscriptionsMap.size;
  }

  /* MAP OPERATIONS */

  has(key: string): boolean {
    return this._subscriptionsMap.has(key);
  }

  get<GSubscription extends ISubscription<any>>(key: string): GSubscription | undefined;
  get<GSubscription extends ISubscription<any>>(key: string, mode: 'throw'): GSubscription | never;
  get<GSubscription extends ISubscription<any>>(key: string, mode?: 'throw'): GSubscription | undefined | never {
    switch (mode) {
      case void 0:
        return this._subscriptionsMap.get(key) as GSubscription;
      case 'throw': {
        if (this._subscriptionsMap.has(key)) {
          return this._subscriptionsMap.get(key) as GSubscription;
        } else {
          throw new Error(`Missing key: '${ key }'`);
        }
      }
      default:
        throw new TypeError(`Unknown mode: '${ mode }'`);
    }
  }

  set<GSubscription extends ISubscription<any>>(
    key: string,
    subscription: GSubscription,
    mode: ISubscriptionManagerSetMode = 'throw',
  ): GSubscription {
    if (this._subscriptionsMap.has(key)) {
      switch (mode) {
        case 'skip':
          break;
        case 'replace':
          (this._subscriptionsMap.get(key) as ISubscription<any>).deactivate();
          this._subscriptionsMap.set(key, subscription);
          break;
        case 'throw':
          throw new Error(`Already subscribed to: '${ key }'`);
        default:
          throw new TypeError(`Unknown mode: '${ mode }'`);
      }
    } else {
      this._subscriptionsMap.set(key, subscription);
    }

    return subscription;
  }

  delete(key: string): void {
    if (this._subscriptionsMap.has(key)) {
      (this._subscriptionsMap.get(key) as ISubscription<any>).deactivate();
    }
    this._subscriptionsMap.delete(key);
  }

  clear(): void {
    this.deactivateAll();
    this._subscriptionsMap.clear();
  }

  /* BULK OPERATIONS */

  activateAll(): void {
    const iterator: Iterator<ISubscription<any>> = this._subscriptionsMap.values();
    let result: IteratorResult<ISubscription<any>>;
    while (!(result = iterator.next()).done) {
      result.value.activate();
    }
  }

  deactivateAll(): void {
    const iterator: Iterator<ISubscription<any>> = this._subscriptionsMap.values();
    let result: IteratorResult<ISubscription<any>>;
    while (!(result = iterator.next()).done) {
      result.value.deactivate();
    }
  }

  /* ITERATE */

  [Symbol.iterator](): IterableIterator<[string, ISubscription<any>]> {
    return this._subscriptionsMap[Symbol.iterator]();
  }

  entries(): IterableIterator<[string, ISubscription<any>]> {
    return this._subscriptionsMap.entries();
  }

  keys(): IterableIterator<string> {
    return this._subscriptionsMap.keys();
  }

  values(): IterableIterator<ISubscription<any>> {
    return this._subscriptionsMap.values();
  }

}



