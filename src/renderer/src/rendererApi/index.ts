import ERROR_CODE, { ErrorCodeMessageMap } from 'src/main/api/errorCode';

export * from './problems/problems';

/**
 * Get error code from error message in renderer process.
 * @param err Error
 * @returns number | null
 */
export const getErrorCodeFromMessage: (err: Error) => ErrorCodeType | null = (err) => {
  return err.message.match(/\d+/)?.[0]
    ? (parseInt((err.message?.match(/\d+/) as any as RegExpMatchArray)[0]) as ErrorCodeType)
    : null;
};

/**
 * Get formatted message from error message in renderer process.
 * @param err Error
 * @returns string
 */
export const getErrorTypeFromMessage: (err: Error) => string = (err) => {
  const code = getErrorCodeFromMessage(err) ?? (ERROR_CODE.UNKNOWN_ERROR as ErrorCodeType);
  return `${code} ${ErrorCodeMessageMap[code]}`;
};
