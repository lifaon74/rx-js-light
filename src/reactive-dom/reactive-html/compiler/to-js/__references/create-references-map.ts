// export type INodeReferencesMap = Map<string, Node>;

// export function createReferencesMap(): INodeReferencesMap {
//   return new Map<string, Node>();
// }

/*-----*/

export type IReferencesMap<GValue> = Map<string, GValue>;

export function createReferencesMap<GValue>(): IReferencesMap<GValue> {
  return new Map<string, GValue>();
}

/*----*/

export interface IReferencesMapGetter<GValue> {
  (name: string): GValue | never;
}

export interface IReferencesMapSetter<GValue> {
  (name: string, value: GValue): void | never;
}

export interface IReferencesMapGetterAndSetter<GValue> {
  readonly getReference: IReferencesMapGetter<GValue>;
  readonly setReference: IReferencesMapSetter<GValue>;
}

export function createReferencesMapGetterAndSetter<GValue>(
  map: IReferencesMap<GValue> = createReferencesMap<GValue>(),
): IReferencesMapGetterAndSetter<GValue> {
  return {
    getReference: (name: string): GValue | never => {
      if (map.has(name)) {
        return map.get(name) as GValue;
      } else {
        throw new Error(`Missing reference '${ name }'`);
      }
    },
    setReference: (name: string, value: GValue): void | never => {
      if (map.has(name)) {
        throw new Error(`Duplicate reference '${ name }'`);
      } else {
        map.set(name, value);
      }
    },
  };
}
