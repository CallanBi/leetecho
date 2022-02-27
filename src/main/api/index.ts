import to from 'await-to-js';
import { ipcMain } from 'electron';
import AppApi from './appApi';
import baseHandler, { ErrorResp, SuccessResp } from './appApi/base';
import { GetAllProblemsResponse } from './appApi/idl/allProblems';
import { LoginReq, LoginResp } from './appApi/idl/user';
import ERROR_CODE from './errorCode';

let appApi: AppApi | null = null;

ipcMain.handle('login', async (_, params: LoginReq) => {
  const [err, res] = await to(baseHandler(AppApi.login(params)));
  if (err) {
    return err as ErrorResp;
  }
  appApi = res?.data ?? null;
  return {
    code: res?.code ?? ERROR_CODE.OK,
    data: {},
  } as LoginResp;
});

ipcMain.handle('getAllProblems', async () => {
  if (!appApi) {
    return new ErrorResp({ code: ERROR_CODE.NOT_LOGIN });
  }
  const [err, res] = await to(baseHandler(appApi.getAllProblems()));
  if (err) {
    return err as ErrorResp;
  }
  return {
    code: res?.code ?? ERROR_CODE.OK,
    data: res?.data ?? {},
  } as GetAllProblemsResponse;
});