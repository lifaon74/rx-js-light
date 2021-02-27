import { IDefaultNotificationsUnion } from '../notifications/default-notifications-union.type';
import { IAbortNotification } from '../notifications/built-in/abort-notification';

// export type SuperSetConstraint<GSuperSet, GSubSet, GDefault = GSubSet> =
//   [GSubSet] extends [GSuperSet]
//     ? GDefault
//     : never;

// export type SuperSetConstraint<GSuperSet, GSubSet> =
//   [GSubSet] extends [GSuperSet]
//     ? [GSuperSet][0]
//     : never;

// export type SuperSetConstraint<GSuperSet, GSubSet> =
//   GSubSet extends GSuperSet
//     ? any
//     : never;

// type A = IDefaultNotificationsUnion<string>;
// type B = IAbortNotification;
// type C = A | B;
//
// // const a: (A extends C ? true : false) = true;
// // const a: (B extends C ? true : false) = true;
// // const a: (C extends A ? true : false) = false;
// // const a: (C extends B ? true : false) = false;
// // const a: ([C] extends [B] ? true : false) = false;
//
// // function a<T extends A>() {}
// // a<C>();
//
// function a<T extends SuperSetConstraint<T, A>>() {}
// a<C>();
