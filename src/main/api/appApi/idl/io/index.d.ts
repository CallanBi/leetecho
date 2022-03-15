import { EndPoint } from 'src/main/api/leetcodeApi/utils/interfaces';
import { SuccessResp } from '../../base';

/** interface types here */
declare global {
  type ReadUserTemplateRequest = {
    userInfo: {
      usrName: string;
      endPoint: EndPoint;
    };
  };
}
