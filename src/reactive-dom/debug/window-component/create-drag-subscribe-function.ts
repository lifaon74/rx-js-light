import { IEmitFunction, ISubscribeFunction, IUnsubscribeFunction } from '../../../types';
import { createNotification, INotification, TInferNotificationGName } from '../../../misc';
import { fromEventTarget } from '../../../subscribe-function';


export interface IPoint2D {
  readonly x: number;
  readonly y: number;
}

export interface IDragObject {
  readonly origin: IPoint2D;
  readonly delta: IPoint2D;
}

export type IDragSubscribeFunctionNotifications =
  INotification<'drag-start', IDragObject>
  | INotification<'drag-move', IDragObject>
  | INotification<'drag-end', IDragObject>
  ;

/*---------------*/


export function createDragSubscribeFunction(
  target: Element,
): ISubscribeFunction<IDragSubscribeFunctionNotifications> {
  return (emit: IEmitFunction<IDragSubscribeFunctionNotifications>): IUnsubscribeFunction => {
    let origin: IPoint2D;
    let unsubscribeOfMouseDown: IUnsubscribeFunction;
    let unsubscribeOfMouseMove: IUnsubscribeFunction;
    let unsubscribeOfMouseUp: IUnsubscribeFunction;

    const dispatch = (
      name: TInferNotificationGName<IDragSubscribeFunctionNotifications>,
      event: MouseEvent,
    ) => {
      emit(createNotification(name, Object.freeze({
        origin,
        delta: createPoint2D(
          event.clientX - origin.x,
          event.clientY - origin.y
        )
      })));
    };

    const onMouseDown = (event: MouseEvent) => {
      event.stopImmediatePropagation();
      event.preventDefault();
      origin = createPoint2D(event.clientX, event.clientY);
      dispatch('drag-start', event);
      dispatch('drag-move', event);
      unsubscribeOfMouseMove = subscribeToMouseMove(onMouseMove);
      unsubscribeOfMouseUp = subscribeToMouseUp(onMouseUp);
    };

    const onMouseMove = (event: MouseEvent) => {
      event.stopImmediatePropagation();
      event.preventDefault();
      dispatch('drag-move', event);
    };

    const onMouseUp = (event: MouseEvent) => {
      event.stopImmediatePropagation();
      event.preventDefault();
      dispatch('drag-move', event);
      dispatch('drag-end', event);
      unsubscribeOfMouseMove();
      unsubscribeOfMouseUp();
    };

    const subscribeToMouseDown = fromEventTarget<'mousedown', MouseEvent>(target, 'mousedown');
    const subscribeToMouseMove = fromEventTarget<'mousemove', MouseEvent>(window, 'mousemove');
    const subscribeToMouseUp = fromEventTarget<'mouseup', MouseEvent>(window, 'mouseup');

    unsubscribeOfMouseDown = subscribeToMouseDown(onMouseDown);

    return (): void => {
      unsubscribeOfMouseDown();
      unsubscribeOfMouseMove();
      unsubscribeOfMouseUp();
    };
  };
}

/*---------------*/


function createPoint2D(
  x: number,
  y: number,
): IPoint2D {
  return Object.freeze({ x, y });
}

// function dispatchDragEventFromStartPositionAndMouseEvent(
//   emit: IEmitFunction<IDragSubscribeFunctionNotifications>,
//   name: TInferNotificationGName<IDragSubscribeFunctionNotifications>,
//   startPosition: IPoint2D,
//   event: MouseEvent,
// ): void {
//   emit(createNotification(name, Object.freeze({
//     start: startPosition,
//     delta: createPoint2D(
//       event.clientX - startPosition.x,
//       event.clientY - startPosition.y
//     )
//   })));
// }

//
// function createDragObjectFromStartPositionAndXY(
//   startPosition: IPoint2D,
//   x: number,
//   y: number,
// ): IDragObject {
//   return Object.freeze({
//     start: startPosition,
//     delta: createPoint2D(
//       x - startPosition.x,
//       y - startPosition.y
//     )
//   });
// }
//
// function createDragObjectFromStartPositionAndMouseEvent(
//   startPosition: IPoint2D,
//   event: MouseEvent,
// ): IDragObject {
//   return createDragObjectFromStartPositionAndXY(startPosition, event.clientX, event.clientY);
// }
//
// function dispatchDragEventFromStartPositionAndMouseEvent(
//   emit: IEmitFunction<IDragSubscribeFunctionNotifications>,
//   name: TInferNotificationGName<IDragSubscribeFunctionNotifications>,
//   startPosition: IPoint2D,
//   event: MouseEvent,
// ): void {
//   emit(createNotification(name, createDragObjectFromStartPositionAndMouseEvent(startPosition, event)));
// }
