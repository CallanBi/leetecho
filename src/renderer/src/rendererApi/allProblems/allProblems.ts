import to from 'await-to-js';
import {
  useQuery,
} from "react-query";

const { bridge: { ipcRenderer } } = window;

const useGetAllProblems = () => {
  return useQuery<GetAllProblemsResp['data']['problems'], Error>("getAllProblems", async () => {
    const [getAllProblemsErr, res] = await to(ipcRenderer.invoke('getAllProblems')) as [Error | null, GetAllProblemsResp];
    if (getAllProblemsErr) {
      console.log('%c err >>>', 'background: yellow; color: blue', getAllProblemsErr);
      throw getAllProblemsErr;
    }
    console.log('%c res >>>', 'background: yellow; color: blue', res);

    const { data: { problems } } = res;
    return problems;
  });
};

export { useGetAllProblems };