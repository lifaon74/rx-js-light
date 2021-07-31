// export const setImmediate = ('setImmediate' in globalThis)
//   ? globalThis.setImmediate
//   : function setImmediate(callback: () => void): any {
//     return setTimeout(callback, 0);
//   };
//
//
// export const clearImmediate = ('clearImmediate' in globalThis)
//   ? globalThis.clearImmediate
//   : function clearImmediate(id: any): void {
//     return clearTimeout(id);
//   };
