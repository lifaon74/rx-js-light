export interface IFilterFunctionGeneric<GValue> {
  (value: GValue): boolean;
}
