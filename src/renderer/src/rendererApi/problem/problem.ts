import to from 'await-to-js';
import { useQuery, UseQueryOptions } from 'react-query';

const {
  bridge: { ipcRenderer },
} = window;

const useGetProblem = (
  params: GetProblemReq,
  options: Omit<UseQueryOptions<GetProblemResp['data'], Error>, 'queryKey' | 'queryFn'>,
) =>
  useQuery<GetProblemResp['data'], Error>(
    ['getProblem', params],
    async () => {
      debugger;
      const [err, res] = (await to(ipcRenderer.invoke('getProblem', params))) as [Error | null, GetProblemResp];
      if (err) {
        throw err;
      }

      const { data } = res || {};

      return data;
    },
    {
      retry: 2,
      cacheTime: 1000 * 60 /** 1 min */,
      ...options,
    },
  );

export { useGetProblem };
