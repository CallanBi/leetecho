import to from 'await-to-js';
import { format } from 'date-fns';
import fs from 'fs';
import * as git from 'isomorphic-git';
import http from 'isomorphic-git/http/node';

import { ErrorResp, SuccessResp } from '../../middleware/apiBridge/base';
import ERROR_CODE from '../../router/errorCode';

type RepoDeployParams = { outputDir: string; settings: RepoSettings };

export type RepoSettings = {
  userName: string;
  repoName: string;
  token: string;
  email: string;
  branch: string;
};

export default class RepoDeploy {
  /** Singleton pattern */
  private static instance: RepoDeploy | null;

  outputDir = '';

  remoteUrl = '';

  platformAddress = '';

  settings: RepoSettings = {
    userName: '',
    repoName: '',
    token: '',
    email: '',
    branch: '',
  };

  private constructor(params: { outputDir: string; settings: RepoSettings }) {
    const { outputDir, settings } = params;

    this.outputDir = outputDir;
    this.settings = settings;

    this.platformAddress = {
      github: 'github.com',
      // coding: 'e.coding.net',
    }['github'];

    const preUrl = {
      github: `${this.settings.userName}:${this.settings.token}`,
    }['github'];

    // eslint-disable-next-line max-len
    this.remoteUrl = `https://${preUrl}@${this.platformAddress}/${this.settings.userName}/${this.settings.repoName}.git`;
  }

  public static init(params: RepoDeployParams): RepoDeploy {
    if (!RepoDeploy.instance) {
      RepoDeploy.instance = new RepoDeploy(params);
    }
    return RepoDeploy.instance;
  }

  public static deleteInstance(): void {
    if (RepoDeploy.instance) {
      RepoDeploy.instance = null;
    }
  }

  async checkRepoConnection() {
    let isRepo = false;
    const [err, _currentBranch] = await to(git.currentBranch({ fs, dir: this.outputDir }));
    if (!err) {
      isRepo = true;
    }

    if (!this.settings.userName || !this.settings.repoName || !this.settings.token) {
      throw new ErrorResp({
        code: ERROR_CODE.REQUEST_PARAMS_ERROR,
        message: 'userName, repoName, token are required',
      });
    }

    if (!isRepo) {
      await git.init({ fs, dir: this.outputDir });
      await git.setConfig({
        fs,
        dir: this.outputDir,
        path: 'user.name',
        value: this.settings.userName,
      });
      await git.setConfig({
        fs,
        dir: this.outputDir,
        path: 'user.email',
        value: this.settings.email,
      });
    }

    await to(
      git.addRemote({
        fs,
        dir: this.outputDir,
        remote: 'origin',
        url: this.remoteUrl,
        force: true,
      }),
    );
    const [getRemoteInfoErr, info] = await to(
      git.getRemoteInfo({
        http,
        url: this.remoteUrl,
      }),
    );
    if (getRemoteInfoErr || !info) {
      throw new ErrorResp({
        code: ERROR_CODE.REPO_CONNECTION_ERROR,
        message: `Repo connection error, ${getRemoteInfoErr.message}`,
      });
    }

    return {
      code: ERROR_CODE.OK,
      data: info,
    } as SuccessResp<git.GetRemoteInfoResult>;
  }

  /**
   * Check whether the branch needs to be switched.
   */
  async checkCurrentBranch() {
    const [currentBranchErr, currentBranch] = await to(git.currentBranch({ fs, dir: this.outputDir, fullname: false }));
    const [listenBranchErr, localBranches] = await to(git.listBranches({ fs, dir: this.outputDir }));

    if (currentBranch !== this.settings.branch) {
      if (!localBranches?.includes(this.settings.branch)) {
        const [branchErr, _branchRes] = await to(git.branch({ fs, dir: this.outputDir, ref: this.settings.branch }));
      }

      const [checkoutErr, _checkoutRes] = await to(
        git.checkout({ fs, dir: this.outputDir, ref: this.settings.branch }),
      );

      if (currentBranchErr || listenBranchErr || checkoutErr || branchErr) {
        throw new ErrorResp({
          code: ERROR_CODE.REPO_CONNECTION_ERROR,
          message: 'Repo connection error',
        });
      }

      return {
        code: ERROR_CODE.OK,
        data: {},
      } as SuccessResp<Record<string, never>>;
    }
  }

  async push() {
    const [_statusErr, statusSummary] = await to(git.status({ fs, dir: this.outputDir, filepath: '.' }));
    if (_statusErr) {
      throw new ErrorResp({
        code: ERROR_CODE.REPO_CONNECTION_ERROR,
        message: `Repo connection error, ${_statusErr.message}`,
      });
    }

    await git.addRemote({
      fs,
      dir: this.outputDir,
      remote: 'origin',
      url: this.remoteUrl,
      force: true,
    });

    if (statusSummary !== 'unmodified') {
      await git.add({ fs, dir: this.outputDir, filepath: '.' });
      await git.commit({
        fs,
        dir: this.outputDir,
        message: `feat: Auto deployed by Leetecho at ${format(new Date(), 'yyyy-MM-dd H:mm')}`,
      });
    }

    await to(this.checkCurrentBranch());

    const [pushErr, pushRes] = await to(
      git.push({
        fs,
        http,
        dir: this.outputDir,
        remote: 'origin',
        ref: this.settings.branch,
        force: true,
      }),
    );

    if (pushErr || !pushRes) {
      throw new ErrorResp({
        code: ERROR_CODE.REPO_PUSH_ERROR,
        message: pushErr.message ? `Error occurred when pushing: ${pushErr.message}` : 'Error occurred when pushing',
      });
    }

    return {
      code: ERROR_CODE.OK,
      data: pushRes,
    } as SuccessResp<git.PushResult>;
  }
}
