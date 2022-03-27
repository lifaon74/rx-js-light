import { ICustomError, ICustomErrorMessageOptionalOptions } from '../custom-error/custom-error.type';
import { ITimeoutErrorName } from './timeout-error-name.constant';

export interface ITimeoutErrorOptions extends ICustomErrorMessageOptionalOptions {
}

export interface ITimeoutErrorProperties {
}

export type ITimeoutError = ICustomError<ITimeoutErrorName, ITimeoutErrorProperties>;




