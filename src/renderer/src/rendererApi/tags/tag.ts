import to from 'await-to-js';
import {
  useQuery,
} from "react-query";
import { ErrorResp } from 'src/main/api/appApi/base';
import ERROR_CODE, { getErrorCodeMessage } from 'src/main/api/errorCode';

const { bridge: { ipcRenderer } } = window;

const useGetAllTags = () => {
  return useQuery<GetAllTagsResp['data']['tagGroups'], ErrorResp>("getAllTags", async () => {
    const [err, res] = await to(ipcRenderer.invoke('getAllTags')) as [ErrorResp | null, GetAllTagsResp];
    if (err) {
      console.log('%c err >>>', 'background: yellow; color: blue', err);
      throw new ErrorResp({ code: 1, message: getErrorCodeMessage(ERROR_CODE.UNKNOWN_ERROR) });
    }
    console.log('%c res >>>', 'background: yellow; color: blue', res);

    const { data: { tagGroups } } = res;
    return tagGroups;
  });
};

export { useGetAllTags };