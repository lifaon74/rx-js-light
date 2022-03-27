import { ICustomError, ICustomErrorMessageOptionalOptions } from '../custom-error/custom-error.type';
import { IEmptyErrorName } from './empty-error-name.constant';

export interface IEmptyErrorOptions extends ICustomErrorMessageOptionalOptions {
}

export interface IEmptyErrorProperties {
}

export type IEmptyError = ICustomError<IEmptyErrorName, IEmptyErrorProperties>;

