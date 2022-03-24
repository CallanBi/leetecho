import to from 'await-to-js';
import { useQuery, UseQueryOptions } from 'react-query';

const {
  bridge: { ipcRenderer },
} = window;

const useGetAllProblems = () =>
  useQuery<GetAllProblemsResp['data']['problems'], Error>('getAllProblems', async () => {
    const [getAllProblemsErr, res] = (await to(ipcRenderer.invoke('getAllProblems'))) as [
      Error | null,
      GetAllProblemsResp,
    ];
    if (getAllProblemsErr) {
      throw getAllProblemsErr;
    }

    const {
      data: { problems },
    } = res;
    return problems;
  });

const useGetProblems = (
  params: GetProblemsReq,
  options: Omit<UseQueryOptions<GetProblemsResp['data'], Error>, 'queryKey' | 'queryFn'>,
) =>
  useQuery<GetProblemsResp['data'], Error>(
    ['getProblems', params],
    async () => {
      const [err, res] = (await to(ipcRenderer.invoke('getProblems', params))) as [Error | null, GetProblemsResp];
      if (err) {
        throw err;
      }

      const { data } = res;

      return data;
    },
    {
      retry: 2,
      cacheTime: 1000 * 60 /** 1 min */,
      ...options,
    },
  );

export { useGetAllProblems, useGetProblems };
