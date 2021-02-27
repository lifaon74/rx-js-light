export function createFastArrayIterator<GValue>(): IFastArrayIterator<GValue> {
  let _array: GValue[] = [];
  let _isIterating = false;

  return Object.freeze({
    isIterating(): boolean {
      return _isIterating;
    },
    getArray(): readonly GValue[] {
      return _array;
    },
    mutate: (callback: IFastArrayIteratorMutateCallback<GValue>): void => {
      if (_isIterating) {
        _array = _array.slice();
      }
      callback(_array);
    },
    iterate: (callback: IFastArrayIteratorCallback<GValue>): void => {
      if (_isIterating) {
        throw new Error(`Already iterating. You probably created a recursive loop.`);
      } else {
        const array: GValue[] = _array;
        const lengthMinusOne: number = array.length - 1;
        if (lengthMinusOne >= 0) {
          _isIterating = true;
          for (let i: number = 0; i < lengthMinusOne; i++) {
            if (!callback(array[i])) {
              return;
            }
          }
          _isIterating = false;
          callback(array[lengthMinusOne]);
        }
      }
    },
  });
}

export interface IFastArrayIteratorCallback<GValue> {
  (value: GValue): boolean;
}

export interface IFastArrayIteratorMutateCallback<GValue> {
  (array: GValue[]): void;
}

export interface IFastArrayIterator<GValue> {
  isIterating(): boolean;

  getArray(): readonly GValue[];

  readonly iterate: (callback: IFastArrayIteratorCallback<GValue>) => void;
  readonly mutate: (callback: IFastArrayIteratorMutateCallback<GValue>) => void;
}
