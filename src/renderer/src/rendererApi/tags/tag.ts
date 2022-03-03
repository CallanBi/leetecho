import to from 'await-to-js';
import { useQuery } from 'react-query';

const {
  bridge: { ipcRenderer },
} = window;

const useGetAllTags = () =>
  useQuery<GetAllTagsResp['data']['tagGroups'], Error>('getAllTags', async () => {
    const [err, res] = (await to(ipcRenderer.invoke('getAllTags'))) as [Error | null, GetAllTagsResp];
    if (err) {
      console.log('%c err >>>', 'background: yellow; color: blue', err);
      throw err;
    }
    console.log('%c res >>>', 'background: yellow; color: blue', res);

    const {
      data: { tagGroups },
    } = res;
    return tagGroups;
  });

export { useGetAllTags };
