import { GetUserProgressResponse } from 'src/main/services/leetcodeServices/utils/interfaces';
import { RepoSettings } from 'src/main/services/repoDeployServices/repoDeployServices';
import { SuccessResp } from '../../middleware/apiBridge/base';

/** interface types here */

export interface Author {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

export interface ReleaseTag {
  url: string;
  assets_url: string;
  upload_url: string;
  html_url: string;
  id: number;
  author: Author;
  node_id: string;
  tag_name: string;
  target_commitish: string;
  name: string;
  draft: boolean;
  prerelease: boolean;
  created_at: Date;
  published_at: Date;
  assets: any[];
  tarball_url: string;
  zipball_url: string;
  body: string;
}

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

export type CheckUpdateResp = SuccessResp<Record<string, never>>;
