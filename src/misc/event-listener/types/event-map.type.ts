export type IGenericEventMap = Record<string, Event>;

export type IToEventMap<GEventMap extends object> = {
  [GKey in Extract<keyof GEventMap, string>]: GEventMap[GKey] extends Event
    ? GEventMap[GKey]
    : never;
}
