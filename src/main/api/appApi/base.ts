import to from 'await-to-js';
import ERROR_CODE, { ErrorMessage, getErrorCodeMessage } from '../errorCode';

export type SuccessResp<T> = {
  code: number;
  data: T;
};

export class ErrorResp extends Error {
  code: number;
  constructor ({ code = 1, message = getErrorCodeMessage() }) {
    super(message);
    this.code = code;
    this.message = message;
  }
};

export default async function baseHandler<T>(request: Promise<T>): Promise<SuccessResp<T>> {
  const [err, res] = await to(request);
  if (err) {
    throw new ErrorResp({
      code: (err as any as ErrorResp).code ?? ERROR_CODE.UNKNOWN_ERROR,
      message: (err as any as ErrorResp).message as ErrorMessage ?? getErrorCodeMessage((err as any as ErrorResp).code || ERROR_CODE.UNKNOWN_ERROR) as any as ErrorMessage,
    });
  }
  return {
    code: (res as any as SuccessResp<T>).code ?? ERROR_CODE.OK,
    data: (res as any as SuccessResp<T>).data ?? res as T,
  };
}