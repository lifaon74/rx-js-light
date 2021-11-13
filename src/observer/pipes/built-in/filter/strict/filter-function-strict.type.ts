
export interface IFilterFunctionStrict<GIn, GOut extends GIn> {
  (value: GIn): value is GOut;
}
