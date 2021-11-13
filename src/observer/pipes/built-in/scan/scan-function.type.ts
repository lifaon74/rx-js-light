export interface IScanFunction<GIn, GOut> {
  (previousValue: GOut, value: GIn): GOut;
}
