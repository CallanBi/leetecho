import to from 'await-to-js';
import { ipcMain } from 'electron';
import AppApi from './appApi';
import baseHandler, { ErrorResp, SuccessResp } from './appApi/base';
import { GetAllProblemsResponse } from './appApi/idl/allProblems';
import { GetAllTagsResponse } from './appApi/idl/tags';
import { LoginReq, LoginResp } from './appApi/idl/user';
import ERROR_CODE, { getErrorCodeMessage } from './errorCode';

let appApi: AppApi | null = null;

/** V8's serialization algorithm does not include custom properties on errors, see: https://github.com/electron/electron/issues/24427 */
const transformCustomErrorToMsg: (err: Error | ErrorResp) => string = (err) =>
  `${(err as ErrorResp).code ?? ERROR_CODE.UNKNOWN_ERROR} ${err.message ?? getErrorCodeMessage()}`;

ipcMain.handle('login', async (_, params: LoginReq) => {
  const [err, res] = await to(baseHandler(AppApi.login(params)));

  if (err) {
    throw new Error(transformCustomErrorToMsg(err));
  }

  appApi = res?.data ?? null;
  return {
    code: res?.code ?? ERROR_CODE.OK,
    data: {},
  } as LoginResp;
});

ipcMain.handle('getAllProblems', async () => {
  if (!appApi) {
    throw new ErrorResp({ code: ERROR_CODE.NOT_LOGIN });
  }

  const [err, res] = await to(baseHandler(appApi.getAllProblems()));

  if (err) {
    throw new Error(transformCustomErrorToMsg(err));
  }

  return {
    code: res?.code ?? ERROR_CODE.OK,
    data: res?.data ?? {},
  } as GetAllProblemsResponse;
});

ipcMain.handle('getAllTags', async () => {
  if (!appApi) {
    throw new ErrorResp({ code: ERROR_CODE.NOT_LOGIN });
  }

  const [err, res] = await to(baseHandler(appApi.getAllTags()));

  if (err) {
    throw new Error(transformCustomErrorToMsg(err));
  }

  return {
    code: res?.code ?? ERROR_CODE.OK,
    data: res?.data ?? {},
  } as GetAllTagsResponse;
});