import to from 'await-to-js';
import { useQuery } from 'react-query';

const {
  bridge: { ipcRenderer },
} = window;

const useGetAllTags = () =>
  useQuery<GetAllTagsResp['data']['tagGroups'], Error>('getAllTags', async () => {
    const [err, res] = (await to(ipcRenderer.invoke('getAllTags'))) as [Error | null, GetAllTagsResp];
    if (err) {
      throw err;
    }
    const {
      data: { tagGroups },
    } = res;
    return tagGroups;
  });

export { useGetAllTags };
