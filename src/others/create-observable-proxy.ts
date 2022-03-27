import {
  getObjectPropertyPathValue,
  getOptionalObjectPropertyPathValue,
} from '../misc/helpers/property-path/get-object-property-path-value';
import { mapObservable } from '../observable/pipes/built-in/without-notifications/observer-pipe-related/map/map-observable';
import { IObservable } from '../observable/type/observable.type';
import {
  createMulticastReplayLastSource,
  IMulticastReplayLastSource,
} from '../observer-observable-pair/build-in/source/built-in/replay-last-source/derived/create-multicast-replay-last-source';
import { IObserver } from '../observer/type/observer.type';

export type IObservableProxy<GData> = {
  [GKey in keyof GData]: IObservableProxy<GData[GKey]>;
} & {
  '$': IObservable<GData>;
  '$array': IObservable<readonly IObservableProxy<any>[]>;
};

export function createObservableProxy<GData extends object>(
  data: IObservable<GData>,
  path: PropertyKey[] = [],
): IObservableProxy<GData> {

  let cachedSubscribe: IObservable<any>;

  const cachedSourcesForArray: IObserver<any>[] = [];
  const cachedProxiesForArray: IObservableProxy<any>[] = [];

  let cachedSubscribeArray: IObservable<IObservableProxy<any>>;

  const cachedProxies = new Map<PropertyKey, IObservableProxy<any>>();

  return new Proxy<any>(Object.create(null), {
    get: (target: any, propertyKey: PropertyKey): any => {
      // console.log(propertyKey);
      if (propertyKey === '$') {
        if (cachedSubscribe === void 0) {
          cachedSubscribe = mapObservable<GData, any>(data, (data: GData): any => {
            return getOptionalObjectPropertyPathValue<any>(data, path);
          });
        }
        return cachedSubscribe;
      } else if (propertyKey === '$array') {
        if (cachedSubscribeArray === void 0) {
          cachedSubscribeArray = mapObservable<GData, any>(data, (data: GData): any => {
            const items: any = getObjectPropertyPathValue<any>(data, path);
            if (Array.isArray(items)) {
              const itemsLength: number = items.length;
              const cachedProxiesForArrayLength: number = cachedProxiesForArray.length;

              if (cachedProxiesForArrayLength < itemsLength) {
                cachedSourcesForArray.length = itemsLength;
                cachedProxiesForArray.length = itemsLength;
                for (let i = cachedProxiesForArrayLength; i < itemsLength; i++) {
                  const source: IMulticastReplayLastSource<any> = createMulticastReplayLastSource<any>({ initialValue: items[i] });
                  cachedSourcesForArray[i] = source.emit;
                  cachedProxiesForArray[i] = createObservableProxy<any>(source.subscribe);
                }
              }

              for (let i = 0; i < itemsLength; i++) {
                cachedSourcesForArray[i](items[i]);
              }

              return cachedProxiesForArray;
            } else {
              throw new Error(`Not an array`);
            }
          });
        }
        return cachedSubscribeArray;
      } else {
        let cachedProxy: IObservableProxy<any> | undefined = cachedProxies.get(propertyKey);
        if (cachedProxy === void 0) {
          cachedProxy = createObservableProxy(data, path.concat(propertyKey));
          cachedProxies.set(propertyKey, cachedProxy);
        }
        return cachedProxy;
      }
    },
    set: (): never => {
      throw new Error(`The proxy is readonly`);
    },
  });
}

/**
 * THIS VERSION SUPPORTS SET AND GET (PRIMITIVE)
 * But it is too permissive and allows really bad habits/pattern/usage
 */

// export type IObservableProxy<GData> = {
//   [GKey in keyof GData]: GData[GKey] & IObservableProxy<GData[GKey]>;
// } & {
//   '$': IObservable<GData>;
// };
//
// export function createObservableProxy<GData extends object>(
//   data: IReplayLastSource<GData, ISource<GData>>,
//   path: PropertyKey[] = [],
// ): IObservableProxy<GData> {
//   // Object.create(null);
//   return new Proxy<any>(noop, {
//     get: (target: any, propertyKey: PropertyKey): any => {
//       console.log('get', propertyKey);
//       switch (propertyKey) {
//         case '$':
//           return pipeObservable(data.subscribe, [
//             mapObservablePipe<GData, any>((data: GData) => {
//               return getOptionalObjectPropertyPathValue(data, path);
//             }),
//           ]);
//         case Symbol.toPrimitive:
//           return () => getOptionalObjectPropertyPathValue(data.getValue(), path);
//         default:
//           return createObservableProxy(data, path.concat(propertyKey));
//       }
//     },
//     set: (target: any, propertyKey: PropertyKey, value: any): boolean => {
//       console.log('set', propertyKey);
//       return setObjectPropertyPathValue(data.getValue(), path.concat(propertyKey), value);
//     },
//     apply: (target: any, thisArg: any, argArray?: any): any => {
//       console.log('apply');
//       return getOptionalObjectPropertyPathValue<IGenericFunction>(data.getValue(), path).apply(thisArg, argArray);
//     },
//   });
// }
//
