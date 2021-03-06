import { ISubscribeFunction } from '../types/subscribe-function/subscribe-function.type';
import { pipeSubscribeFunction } from '../functions/piping/pipe-subscribe-function/pipe-subscribe-function';
import { mapSubscribePipe } from '../subscribe-function/subscribe-pipe/emit-pipe-related/map/map-subscribe-pipe';
import { getOptionalObjectPropertyPathValue } from '../misc/helpers/property-path/get-object-property-path-value';

export type ISubscribeFunctionProxy<GData> = {
  [GKey in keyof GData]: ISubscribeFunctionProxy<GData[GKey]>;
} & {
  '$': ISubscribeFunction<GData>;
};

export function createSubscribeFunctionProxy<GData extends object>(
  data: ISubscribeFunction<GData>,
  path: PropertyKey[] = [],
): ISubscribeFunctionProxy<GData> {
  return new Proxy<any>(Object.create(null), {
    get: (target: any, propertyKey: PropertyKey): any => {
      if (propertyKey === '$') {
        return pipeSubscribeFunction(data, [
          mapSubscribePipe<GData, any>((data: GData) => {
            return getOptionalObjectPropertyPathValue(data, path);
          }),
        ]);
      } else {
        return createSubscribeFunctionProxy(data, path.concat(propertyKey));
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
