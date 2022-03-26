import to from 'await-to-js';
import { useQuery, UseQueryOptions } from 'react-query';
import { ReleaseTag } from 'src/main/idl/user';
import { GetUserStatusResponse } from 'src/main/services/leetcodeServices/utils/interfaces';

const {
  bridge: { ipcRenderer },
} = window;

const useLogin = (
  params: LoginReq,
  enableVal: boolean,
  onSuccess: (data: LoginResp['data']) => void,
  onError: (err: Error) => unknown,
) =>
  useQuery<LoginResp['data'], Error>(
    ['login', params],
    async () => {
      const [err, res] = (await to(ipcRenderer.invoke('login', params))) as [Error | null, LoginResp['data']];
      if (err) {
        throw err;
      }
      return res;
    },
    {
      enabled: enableVal,
      retry: false,
      cacheTime: 0 /** user info should not be cached */,
      onSuccess,
      onError,
    },
  );

const useGetUserStatus = (options: Omit<UseQueryOptions<GetUserStatusResponse, Error>, 'queryKey' | 'queryFn'>) =>
  useQuery<GetUserStatusResponse['userStatus'], Error>(
    ['getUserStatus'],
    async () => {
      const [err, res] = (await to(ipcRenderer.invoke('getUserStatus'))) as [
        Error | null,
        SuccessResp<GetUserStatusResponse['userStatus']>,
      ];
      if (err) {
        throw err;
      }
      const { data } = res;
      return data;
    },
    options,
  );

const useCheckRepoConnection = (
  params: CheckRepoConnectionReq,
  options: Omit<UseQueryOptions<CheckRepoConnectionResp, Error>, 'queryKey' | 'queryFn'>,
) =>
  useQuery<CheckRepoConnectionResp, Error>(
    ['checkRepoConnection', params],
    async () => {
      const [err, res] = (await to(ipcRenderer.invoke('checkRepoConnection', params))) as [
        Error | null,
        CheckRepoConnectionResp,
      ];
      if (err) {
        throw err;
      }

      return res as CheckRepoConnectionResp;
    },
    options,
  );

const useCheckUpdate = (
  enableVal: boolean,
  onSuccess: (data: SuccessResp<Record<string, never>>) => void,
  onError: (err: Error) => unknown,
) =>
  useQuery<SuccessResp<ReleaseTag>, Error>(
    ['checkUpdate'],
    async () => {
      const [err, res] = (await to(ipcRenderer.invoke('checkUpdate'))) as [Error | null, SuccessResp<ReleaseTag>];
      if (err) {
        throw err;
      }
      return res?.data;
    },
    {
      enabled: enableVal,
      retry: false,
      refetchInterval: 1000 * 60 * 60, // 1 hour's cron job
      refetchIntervalInBackground: true,
      cacheTime: 1000 * 60 * 60 /** check update should be cached for 1 hour */,
      onSuccess,
      onError,
    },
  );

export { useLogin, useGetUserStatus, useCheckRepoConnection, useCheckUpdate };
