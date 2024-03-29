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

  NOT_LOGIN = 4000001,
  REQUEST_PARAMS_ERROR = 4000002,

  NOT_A_REPO = 4030003,

  NO_AC_SUBMISSIONS = 5000001,
  NO_NOTES = 5000002,
  REPO_CONNECTION_ERROR = 5000003,
  REPO_PUSH_ERROR = 5000004,
  NO_USER_CONFIG = 5000005,
  REPO_INIT_ERROR = 5000006,
}

type ErrorCodeType =
  | 200
  | 302
  | 304
  | 400
  | 403
  | 404
  | 500
  | 502
  | 503
  | 1
  | 4000001
  | 4000002
  | 5000001
  | 5000002
  | 4030003
  | 5000003
  | 5000004
  | 5000005
  | 5000006;

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
  | 'NOT_LOGIN'
  | 'REQUEST_PARAMS_ERROR'
  | 'NO_AC_SUBMISSIONS'
  | 'NO_NOTES'
  | 'NOT_A_REPO'
  | 'REPO_CONNECTION_ERROR'
  | 'REPO_PUSH_ERROR'
  | 'NO_USER_CONFIG'
  | 'REPO_INIT_ERROR';

const ErrorCodeMessageMap: { [key in ErrorCodeType]: ErrorCodeMessageType } = {
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

  4000001: 'NOT_LOGIN',
  4000002: 'REQUEST_PARAMS_ERROR',
  4030003: 'NOT_A_REPO',

  5000001: 'NO_AC_SUBMISSIONS',
  5000002: 'NO_NOTES',
  5000003: 'REPO_CONNECTION_ERROR',
  5000004: 'REPO_PUSH_ERROR',
  5000005: 'NO_USER_CONFIG',
  5000006: 'REPO_INIT_ERROR',
};

type ErrorCode = keyof typeof ErrorCodeMessageMap;

type ErrorMessage = typeof ErrorCodeMessageMap[ErrorCode];

const getErrorCodeMessage: (code?: ErrorCode | number) => ErrorMessage | string = (code) =>
  ErrorCodeMessageMap[code as ErrorCodeType] ?? 'UNKNOWN ERROR';

export default ERROR_CODE;

export { getErrorCodeMessage, ErrorCode, ErrorMessage, ErrorCodeMessageMap, ErrorCodeMessageType, ErrorCodeType };
