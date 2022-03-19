import { GetUserProgressResponse } from 'src/main/api/leetcodeServices/utils/interfaces';
import { SuccessResp } from '../../base';

/** interface types here */

export type LoginReq = {
  usrName: string;
  pwd: string;
};

export type LoginResp = SuccessResp<Record<string, never>>;

export type LogoutResp = SuccessResp<Record<string, never>>;

export type GetUserProgressReq = { userSlug: string };
export type GetUserProgressResp = SuccessResp<GetUserProgressResponse>;
