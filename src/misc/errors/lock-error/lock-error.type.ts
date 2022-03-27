import { ICustomError, ICustomErrorMessageOptionalOptions } from '../custom-error/custom-error.type';
import { ILockErrorName } from './lock-error-name.constant';

export interface ILockErrorOptions extends ICustomErrorMessageOptionalOptions {
}

export interface ILockErrorProperties {
}

export type ILockError = ICustomError<ILockErrorName, ILockErrorProperties>;


