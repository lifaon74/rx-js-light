export type IPureEventTarget =
  Pick<EventTarget, 'addEventListener' | 'removeEventListener'>
  & Partial<Pick<EventTarget, 'dispatchEvent'>>;
