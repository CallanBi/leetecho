/** user types */
export {};

declare global {
  type ErrorCodeType = 200 | 302 | 304 | 400 | 403 | 404 | 500 | 502 | 503 | 1 | 2;
  type ErrorCodeMessageType =
    | 'OK'
    | 'REDIRECT'
    | 'NOT_MODIFIED'
    | 'BAD_REQUEST'
    | 'FORBIDDEN'
    | 'NOT_FOUND'
    | 'INTERNAL_SERVER_ERROR'
    | 'BAD_GATEWAY'
    | 'SERVICE_UNAVAILABLE'
    | 'UNKNOWN_ERROR'
    | 'NOT_LOGIN';

  type SuccessResp<T> = {
    code: 200;
    data: T;
  };

  type ErrorResp = {
    code: ErrorCodeType;
    message: ErrorCodeMessageType;
  };
}
