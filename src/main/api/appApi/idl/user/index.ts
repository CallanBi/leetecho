import { SuccessResp } from '../../base';

/** interface types here */

export type LoginReq = {
  usrName: string;
  pwd: string;
};

export type LoginResp = SuccessResp<{}>;
