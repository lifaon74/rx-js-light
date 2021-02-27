export type Union<GValue> = { readonly value: GValue };
export type GenericUnion = Union<any>;

export type GetUnionValue<GUnion extends GenericUnion> =
  GUnion extends Union<infer GValue>
    ? GValue
    : never;


export type SuperUnionConstraint<// generics
  GSuperUnion extends GenericUnion,
  GSubUnion extends GenericUnion,
  GDefaultUnion extends GenericUnion = GSubUnion
  //
  > =
  GSubUnion extends GSuperUnion
    ? any
    : never;

export type UnionMerge<// generics
  GUnionA extends GenericUnion,
  GUnionB extends GenericUnion,
  //
  > = Union<GUnionA['value'] | GUnionB['value']>;


export type UnionExclude<// generics
  GUnionA extends GenericUnion,
  GUnionB extends GenericUnion,
  //
  > = Union<Exclude<GUnionA['value'], GUnionB['value']>>;

export type UnionReplace<// generics
  GUnionA extends GenericUnion,
  GUnionB extends GenericUnion,
  GUnionC extends GenericUnion,
  //
  > = UnionMerge<UnionExclude<GUnionA, GUnionB>, GUnionC>;

export function toUnion<GValue>(
  value: GValue,
): Union<GValue> {
  return { value };
}

export function fromUnion<// generics
  GUnion extends GenericUnion,
  GValue extends GetUnionValue<GUnion>,
  //
>(
  union: GUnion,
): GValue {
  return union.value;
}

// export type Union<GUnion> = GUnion;
// export type GenericUnion = Union<any>;
//
// export type SuperUnionConstraint<// generics
//   GSuperUnion extends GenericUnion,
//   GSubUnion extends GenericUnion,
//   GDefaultUnion extends GenericUnion = GSubUnion
//   //
//   > =
//   [GSubUnion] extends [GSuperUnion]
//     ? GDefaultUnion
//     : never;
//
// /**
//  * Merges types of GUnionA with GUnionB
//  * @example: UnionMerge<a | b, c> => a | b | c
//  */
// export type UnionMerge<// generics
//   GUnionA extends GenericUnion,
//   GUnionB extends GenericUnion,
//   //
//   > = Union<GUnionA | GUnionB>;
//
// /**
//  * Removes types of GUnionB from GUnionA
//  * @example: UnionExclude<a | b | c, c> => a | b
//  */
// export type UnionExclude<// generics
//   GUnionA extends GenericUnion,
//   GUnionB extends GenericUnion,
//   //
//   > = Union<Exclude<GUnionA, GUnionB>>;
//
// /**
//  * Replaces types of GUnionB from GUnionA by GUnionC
//  * @example: UnionExclude<a | b | c, c, d> => a | b | d
//  */
// export type UnionReplace<// generics
//   GUnionA extends GenericUnion,
//   GUnionB extends GenericUnion,
//   GUnionC extends GenericUnion,
//   //
//   > = UnionMerge<UnionExclude<GUnionA, GUnionB>, GUnionC>;
//
// export function toUnion<GUnion>(
//   union: GUnion,
// ): Union<GUnion> {
//   return union;
// }

/*************/

// type A = 'a';
// type B = 'b';
// type C = A | B;
//
// const a: (A extends C ? true : false) = true;
// const a: (B extends C ? true : false) = true;
// const a: (C extends A ? true : false) = false;
// const a: (C extends B ? true : false) = false;
// const a: ([C] extends [B] ? true : false) = false;
//
// // function a<T extends A>() {}
// // a<C>(); // ERROR
//
// // function a(arg: A) {}
// // a('a' as unknown as A);
// // a('a' as unknown as B); // ERROR
// // a('a' as unknown as C); // ERROR
//
// /*--*/
//
// type AU = Union<A>;
// type BU = Union<B>;
// type CU = Union<A | B>;
//
// const a: (AU extends CU ? true : false) = true;
// const a: (BU extends CU ? true : false) = true;
// const a: (CU extends AU ? true : false) = false;
// const a: (CU extends BU ? true : false) = false;
//
// const a: (CU extends SuperUnionConstraint<CU, BU> ? true : false) = true;
//
// // function a<T extends SuperUnionConstraint<T, BU>>() {}
// // a<C>();
//
// type TMerge = UnionMerge<AU, BU>;
// type TExclude = UnionExclude<CU, BU>;









