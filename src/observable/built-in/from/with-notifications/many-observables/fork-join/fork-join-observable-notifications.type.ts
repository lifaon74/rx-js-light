import {
  IDefaultInNotificationsUnion,
  IDefaultNotificationsUnion,
} from '../../../../../../misc/notifications/default-notifications-union.type';
import { IMapObservableTupleToValueTuple } from '../../../../../type/helpers/map-observable-tuple-to-value-tuple.type';
import { IObservable } from '../../../../../type/observable.type';

export type IGenericForkJoinInNotifications = IDefaultInNotificationsUnion<any>;

export type IGenericForkInObservable = IObservable<IGenericForkJoinInNotifications>;

export type IGenericForkInObservables = readonly IGenericForkInObservable[];

export type IForkJoinObservablesValues<GObservables extends IGenericForkInObservables> =
  IMapObservableTupleToValueTuple<GObservables>;

export type IForkJoinObservableNotifications<GObservables extends IGenericForkInObservables> =
  IDefaultNotificationsUnion<IForkJoinObservablesValues<GObservables>>;
