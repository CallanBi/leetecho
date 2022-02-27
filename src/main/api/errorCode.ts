const enum ERROR_CODE {
  OK = 200,
  REDIRECT = 302,
  NOT_MODIFIED = 304,
  BAD_REQUEST = 400,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,

  UNKNOWN_ERROR = 1,
  NOT_LOGIN = 2,
}

type ErrorCodeType = 200 | 302 | 304 | 400 | 403 | 404 | 500 | 502 | 503 | 1 | 2;

type ErrorCodeMessageType = 'OK' | 'REDIRECT' | 'NOT_MODIFIED' | 'BAD_REQUEST' | 'FORBIDDEN' | 'NOT_FOUND' | 'INTERNAL_SERVER_ERROR' | 'BAD_GATEWAY' | 'SERVICE_UNAVAILABLE' | 'UNKNOWN_ERROR' | 'NOT_LOGIN';

const ErrorCodeMessageMap: { [key in ErrorCodeType]: ErrorCodeMessageType; } = {
  200: 'OK',
  302: 'REDIRECT',
  304: 'NOT_MODIFIED',
  400: 'BAD_REQUEST',
  403: 'FORBIDDEN',
  404: 'NOT_FOUND',
  500: 'INTERNAL_SERVER_ERROR',
  502: 'BAD_GATEWAY',
  503: 'SERVICE_UNAVAILABLE',

  1: 'UNKNOWN_ERROR',
  2: 'NOT_LOGIN',
};

type ErrorCode = keyof typeof ErrorCodeMessageMap;

type ErrorMessage = (typeof ErrorCodeMessageMap)[ErrorCode];

const getErrorCodeMessage: (code?: ErrorCode | number) => ErrorMessage = (code) => ErrorCodeMessageMap[code as ErrorCodeType] ?? 'UNKNOWN ERROR';

export default ERROR_CODE;

export { getErrorCodeMessage, ErrorCode, ErrorMessage, ErrorCodeMessageMap, ErrorCodeMessageType, ErrorCodeType };