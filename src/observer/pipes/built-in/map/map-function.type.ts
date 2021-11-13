export interface IMapFunction<GIn, GOut> {
  (value: GIn): GOut;
}
