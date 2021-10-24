declare const __magic__: any;

let GLOBAL_THIS: any;

export function inferGlobalThis(): any {
  Object.defineProperty(Object.prototype, '__magic__', {
    get: function() {
      return this;
    },
    configurable: true, // This makes it possible to `delete` the getter later.
  });
  const globalThis = __magic__;
  delete (Object.prototype as any)['__magic__'];
  return globalThis;
}

export function getGlobalThis(): any {
  if (GLOBAL_THIS === void 0) {
    GLOBAL_THIS = inferGlobalThis();
  }
  return GLOBAL_THIS;
}
