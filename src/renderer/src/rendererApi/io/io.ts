import to from 'await-to-js';
import { useQuery, UseQueryOptions } from 'react-query';

const {
  bridge: { ipcRenderer },
} = window;

const useReadUserTemplate = (
  params: ReadUserTemplateReq,
  options: Omit<UseQueryOptions<ReadUserTemplateReq, Error>, 'queryKey' | 'queryFn'>,
) =>
  useQuery<ReadUserTemplateResp, Error>(
    ['readUserTemplate', params],
    async () => {
      const [err, res] = (await to(ipcRenderer.invoke('readUserTemplate', params))) as [
        Error | null,
        SuccessResp<ReadUserTemplateResp>,
      ];
      if (err) {
        throw err;
      }
      const { data } = res;
      return data;
    },
    options,
  );

export { useReadUserTemplate };
