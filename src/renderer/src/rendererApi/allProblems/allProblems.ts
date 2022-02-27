import to from 'await-to-js';
import {
  useQuery,
} from "react-query";
import { ErrorResp } from 'src/main/api/appApi/base';
import ERROR_CODE, { getErrorCodeMessage } from 'src/main/api/errorCode';

const { bridge: { ipcRenderer } } = window;

const useGetAllProblems = () => {
  return useQuery<GetAllProblemsResp['data']['problems'], ErrorResp>("getAllProblems", async () => {
    const [getAllProblemsErr, res] = await to(ipcRenderer.invoke('getAllProblems')) as [ErrorResp | null, GetAllProblemsResp];
    if (getAllProblemsErr) {
      console.log('%c err >>>', 'background: yellow; color: blue', getAllProblemsErr);
      throw new ErrorResp({ code: 1, message: getErrorCodeMessage(ERROR_CODE.UNKNOWN_ERROR) });
    }
    console.log('%c res >>>', 'background: yellow; color: blue', res);

    const { data: { problems } } = res;
    return problems;
  });
};

export { useGetAllProblems };