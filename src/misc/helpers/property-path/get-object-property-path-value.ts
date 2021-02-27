import { isNull } from '../is-type/is-null';

export interface IObjectPropertyPathOnIncomplete {
  (): any;
}

export const OBJECT_PROPERTY_PATH_ON_INCOMPLETE_THROW: IObjectPropertyPathOnIncomplete = () => {
  throw new Error(`Invalid property path`);
};

export const OBJECT_PROPERTY_PATH_ON_INCOMPLETE_RETURN_UNDEFINED: IObjectPropertyPathOnIncomplete = () => {
  return void 0;
};

export const OBJECT_PROPERTY_PATH_ON_INCOMPLETE_RETURN_FALSE: IObjectPropertyPathOnIncomplete = () => {
  return false;
};

export function getObjectPropertyPathValue<GValue>(
  data: any,
  path: PropertyKey[],
  onIncompletePath: IObjectPropertyPathOnIncomplete = OBJECT_PROPERTY_PATH_ON_INCOMPLETE_THROW,
): GValue {
  for (let i = 0, l = path.length; i < l; i++) {
    const propertyKey: PropertyKey = path[i];
    data = data[propertyKey];
    if (isNull(data)) {
      return onIncompletePath();
    }
  }
  return data;
}

export function getOptionalObjectPropertyPathValue<GValue>(
  data: any,
  path: PropertyKey[],
): GValue {
  return getObjectPropertyPathValue<GValue>(data, path, OBJECT_PROPERTY_PATH_ON_INCOMPLETE_RETURN_UNDEFINED);
}

/*-----------------------*/

export function setObjectPropertyPathValue<GValue>(
  data: any,
  path: PropertyKey[],
  value: GValue,
  onIncompletePath: IObjectPropertyPathOnIncomplete = OBJECT_PROPERTY_PATH_ON_INCOMPLETE_RETURN_FALSE,
): boolean {
  const lengthMinusOne: number = path.length - 1;
  for (let i = 0; i < lengthMinusOne; i++) {
    const propertyKey: PropertyKey = path[i];
    data = data[propertyKey];
    if (isNull(data)) {
      return onIncompletePath();
    }
  }
  data[path[lengthMinusOne]] = value;
  return true;
}
