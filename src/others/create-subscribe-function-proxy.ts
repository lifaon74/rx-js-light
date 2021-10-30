import {
  createMulticastReplayLastSource,
  IMulticastReplayLastSource,
} from '../source/replay-last-source/derived/create-multicast-replay-last-source';
import { IEmitFunction } from '../types/emit-function/emit-function.type';
import { ISubscribeFunction } from '../types/subscribe-function/subscribe-function.type';
import { pipeSubscribeFunction } from '../functions/piping/pipe-subscribe-function/pipe-subscribe-function';
import { mapSubscribePipe } from '../subscribe-function/subscribe-pipe/emit-pipe-related/map/map-subscribe-pipe';
import {
  getObjectPropertyPathValue, getOptionalObjectPropertyPathValue,
} from '../misc/helpers/property-path/get-object-property-path-value';


export type ISubscribeFunctionProxy<GData> = {
  [GKey in keyof GData]: ISubscribeFunctionProxy<GData[GKey]>;
} & {
  '$': ISubscribeFunction<GData>;
  '$array': ISubscribeFunction<readonly ISubscribeFunctionProxy<any>[]>;
};

export function createSubscribeFunctionProxy<GData extends object>(
  data: ISubscribeFunction<GData>,
  path: PropertyKey[] = [],
): ISubscribeFunctionProxy<GData> {

  let cachedSubscribe: ISubscribeFunction<any>;

  const cachedSourcesForArray: IEmitFunction<any>[] = [];
  const cachedProxiesForArray: ISubscribeFunctionProxy<any>[] = [];

  let cachedSubscribeArray: ISubscribeFunction<ISubscribeFunctionProxy<any>>;

  const cachedProxies = new Map<PropertyKey, ISubscribeFunctionProxy<any>>();

  return new Proxy<any>(Object.create(null), {
    get: (target: any, propertyKey: PropertyKey): any => {
      // console.log(propertyKey);
      if (propertyKey === '$') {
        if (cachedSubscribe === void 0) {
          cachedSubscribe = pipeSubscribeFunction(data, [
            mapSubscribePipe<GData, any>((data: GData): any => {
              return getOptionalObjectPropertyPathValue<any>(data, path);
            }),
          ]);
        }
        return cachedSubscribe;
      } else if (propertyKey === '$array') {
        if (cachedSubscribeArray === void 0) {
          cachedSubscribeArray = pipeSubscribeFunction(data, [
            mapSubscribePipe<GData, any>((data: GData): any => {
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
                    cachedProxiesForArray[i] = createSubscribeFunctionProxy<any>(source.subscribe);
                  }
                }

                for (let i = 0; i < itemsLength; i++) {
                  cachedSourcesForArray[i](items[i]);
                }

                return cachedProxiesForArray;
              } else {
                throw new Error(`Not an array`);
              }
            }),
          ]);
        }
        return cachedSubscribeArray;
      } else {
        let cachedProxy: ISubscribeFunctionProxy<any> | undefined = cachedProxies.get(propertyKey);
        if (cachedProxy === void 0) {
          cachedProxy = createSubscribeFunctionProxy(data, path.concat(propertyKey));
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

// export type ISubscribeFunctionProxy<GData> = {
//   [GKey in keyof GData]: GData[GKey] & ISubscribeFunctionProxy<GData[GKey]>;
// } & {
//   '$': ISubscribeFunction<GData>;
// };
//
// export function createSubscribeFunctionProxy<GData extends object>(
//   data: IReplayLastSource<GData, ISource<GData>>,
//   path: PropertyKey[] = [],
// ): ISubscribeFunctionProxy<GData> {
//   // Object.create(null);
//   return new Proxy<any>(noop, {
//     get: (target: any, propertyKey: PropertyKey): any => {
//       console.log('get', propertyKey);
//       switch (propertyKey) {
//         case '$':
//           return pipeSubscribeFunction(data.subscribe, [
//             mapSubscribePipe<GData, any>((data: GData) => {
//               return getOptionalObjectPropertyPathValue(data, path);
//             }),
//           ]);
//         case Symbol.toPrimitive:
//           return () => getOptionalObjectPropertyPathValue(data.getValue(), path);
//         default:
//           return createSubscribeFunctionProxy(data, path.concat(propertyKey));
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
