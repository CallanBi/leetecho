import to from 'await-to-js';
import { QueryKey, useQuery, UseQueryOptions } from 'react-query';
import { ErrorResp } from 'src/main/api/appApi/base';
import { GetUserStatusResponse, UserStatus } from 'src/main/api/leetcodeServices/utils/interfaces';

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

const useGetUserStatus = (
  options: Omit<UseQueryOptions<UserStatus, Error, UserStatus, QueryKey>, 'queryKey' | 'queryFn'>,
) =>
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

export { useLogin, useGetUserStatus };
