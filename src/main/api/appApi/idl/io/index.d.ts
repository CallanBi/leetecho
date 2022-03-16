import { EndPoint } from 'src/main/api/leetcodeApi/utils/interfaces';
import { CreateTemplateRequest, CreateTemplateResponse, ReadUserTemplateResponse } from './index';
import { SuccessResp } from '../../base';

/** interface types here */
declare global {
  type ReadUserTemplateReq = {
    userInfo: {
      usrName: string;
      endPoint: 'CN' | 'US';
    };
  };

  type ReadUserTemplateResp = ReadUserTemplateResponse;

  type CreateTemplateReq = CreateTemplateRequest;
  type CreateTemplateResp = CreateTemplateResponse;
}
