import to from 'await-to-js';
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from 'react-query';

const {
  bridge: { ipcRenderer },
} = window;

const useReadUserTemplate = (
  params: ReadUserTemplateReq,
  options: Omit<UseQueryOptions<ReadUserTemplateResp, Error>, 'queryKey' | 'queryFn'>,
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

const useSaveUserTemplate = (
  options?: Omit<UseMutationOptions<SaveTemplateResp, Error, SaveTemplateReq>, 'mutationKey' | 'mutationFn'>,
) =>
  useMutation<SaveTemplateResp, Error, SaveTemplateReq>(async (params: SaveTemplateReq) => {
    const [err, res] = (await to(ipcRenderer.invoke('saveTemplate', params))) as [
      Error | null,
      SuccessResp<SaveTemplateResp>,
    ];
    if (err) {
      throw err;
    }
    const { data } = res;
    return data;
  }, options);

export { useReadUserTemplate, useSaveUserTemplate };
