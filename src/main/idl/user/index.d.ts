/** user types */
import {
  LoginResp as LoginRs,
  GetUserProgressReq as GetUserProgressRq,
  GetUserProgressResp as GetUserProgressRs,
  CheckRepoConnectionRequest,
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

  type CheckRepoConnectionReq = CheckRepoConnectionRequest;
  type CheckRepoConnectionResp = SuccessResp<Record<string, never>>;
}
