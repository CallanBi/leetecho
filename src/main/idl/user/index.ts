import { GetUserProgressResponse } from 'src/main/services/leetcodeServices/utils/interfaces';
import { RepoSettings } from 'src/main/services/repoDeployServices/repoDeployServices';
import { SuccessResp } from '../../middleware/apiBridge/base';

/** interface types here */

export type LoginReq = {
  usrName: string;
  pwd: string;
};

export type LoginResp = SuccessResp<Record<string, never>>;

export type LogoutResp = SuccessResp<Record<string, never>>;

export type GetUserProgressReq = { userSlug: string };
export type GetUserProgressResp = SuccessResp<GetUserProgressResponse>;

export type CheckRepoConnectionRequest = RepoSettings;
export type CheckRepoConnectionResponse = SuccessResp<Record<string, never>>;
