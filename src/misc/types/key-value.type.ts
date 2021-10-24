/** KEY VALUE TUPLE **/

export type IKeyValueTuple<GKey, GValue> = [key: GKey, value: GValue];

export type IGenericKeyValueTuple = IKeyValueTuple<any, any>;

export type IInferKeyValueTupleGKey<GKeyValueTuple extends IGenericKeyValueTuple> =
  GKeyValueTuple extends IKeyValueTuple<infer GKey, any>
    ? GKey
    : never;

export type ITInferKeyValueTupleGValue<GKeyValueTuple extends IGenericKeyValueTuple> =
  GKeyValueTuple extends IKeyValueTuple<any, infer GValue>
    ? GValue
    : never;

/** UNION **/

export type IGenericKeyValueTupleUnion = IGenericKeyValueTuple;

export type IInferKeyValueTupleUnionGKey<GKeyValueTupleUnion extends IGenericKeyValueTupleUnion> =
  IInferKeyValueTupleGKey<GKeyValueTupleUnion>;

export type IInferKeyValueTupleUnionGValue<GKeyValueTupleUnion extends IGenericKeyValueTupleUnion> =
  ITInferKeyValueTupleGValue<GKeyValueTupleUnion>;

export type IInferKeyValueTupleUnionGValueFromKey<GKeyValueTupleUnion extends IGenericKeyValueTuple, GKey extends IInferKeyValueTupleUnionGKey<GKeyValueTupleUnion>> =
  GKeyValueTupleUnion extends IKeyValueTuple<GKey, infer GValue>
    ? GValue
    : never;

export type IKeyValueMapToKeyValueTupleUnion<GObject extends object> = {
  [GKey in Extract<keyof GObject, string>]: IKeyValueTuple<GKey, GObject[GKey]>;
}[Extract<keyof GObject, string>];

export type IKeyValueTupleUnionToKeyValueMap<GKeyValueTupleUnion extends IGenericKeyValueTuple> = {
  [GKey in IInferKeyValueTupleUnionGKey<GKeyValueTupleUnion>]: GKeyValueTupleUnion extends IKeyValueTuple<GKey, infer GValue>
    ? GValue
    : never;
};



