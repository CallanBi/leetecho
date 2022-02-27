import ERROR_CODE, { ErrorCodeMessageMap } from 'src/main/api/errorCode';

export * from './allProblems';

/**
 * Get error code from error message in renderer process.
 * @param err Error
 * @returns number | null
 */
export const getCodeFromMessage: (err: Error) =>
  ErrorCodeType | null = (err) => err.message.match(/\d+/)?.[0] ?
    parseInt((err.message.match(/\d+/) as any as RegExpMatchArray)[0]) as ErrorCodeType :
    null;

/**
 * Get formatted message from error message in renderer process.
 * @param err Error
 * @returns string
 */
export const getTypeFromMessage: (err: Error) => string = (err) => {
  const code = getCodeFromMessage(err) ?? ERROR_CODE.UNKNOWN_ERROR as ErrorCodeType;
  return `${code} ${ErrorCodeMessageMap[code]}`;
};
