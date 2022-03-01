import to from 'await-to-js';
import {
  useQuery,
} from "react-query";
import { ErrorResp } from 'src/main/api/appApi/base';

const { bridge: { ipcRenderer } } = window;

const useLogin = (params: LoginReq, enableVal: boolean) => {
  debugger;
  return useQuery<LoginResp['data'], ErrorResp>(['login', params], async () => {
    const [err, res] = await to(ipcRenderer.invoke('login', params)) as [Error | null, LoginResp];
    if (err) {
      console.log('%c err >>>', 'background: yellow; color: blue', err);
      throw err;
    }
    console.log('%c res >>>', 'background: yellow; color: blue', res);
    return res;
  }, {
    enabled: enableVal,
    retry: false,
    cacheTime: 0, /** user info should not be cached */
  });
};

export { useLogin };