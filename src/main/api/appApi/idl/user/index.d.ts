/** user types */
import {
  LoginResp as LoginRs,
  GetUserProgressReq as GetUserProgressRq,
  GetUserProgressResp as GetUserProgressRs,
} from './index';

export {};

declare global {
  type LoginReq = {
    usrName: string;
    pwd: string;
  };

  type LoginResp = LoginRs;

  type GetUserProgressReq = GetUserProgressRq;
  type GetUserProgressResp = GetUserProgressRs;
}
