import to from 'await-to-js';
import Leetcode from '../leetcodeApi';
import { EndPoint } from '../leetcodeApi/utils/interfaces';
import { GetProblemsRequest, GetQuestionDetailByTitleSlugRequest } from './idl/problems';

interface UsrInfo {
  usrName: string;
  pwd: string;
}

class AppApi {
  leetcode: Leetcode;
  // static leetcode: Leetcode;

  constructor(leetcode: Leetcode) {
    this.leetcode = leetcode;
  }

  static async login(usrInfo: UsrInfo) {
    const [err, leetcode] = await to(Leetcode.build(usrInfo.usrName, usrInfo.pwd, EndPoint.CN));
    if (err) {
      throw err;
    }
    return new AppApi(leetcode as Leetcode);
  }

  async getAllProblems() {
    const [err, problems] = await to(this.leetcode.getAllProblems());
    if (err) {
      throw err;
    }
    return {
      problems: problems as UnPromisifyFunction<typeof this.leetcode.getAllProblems>,
    };
  }

  async getAllTags() {
    const [err, problems] = await to(this.leetcode.getAllTags());
    if (err) {
      throw err;
    }
    return {
      tagGroups: problems as UnPromisifyFunction<typeof this.leetcode.getAllTags>,
    };
  }

  async getProblems(conditions: GetProblemsRequest) {
    const [err, res] = await to(this.leetcode.getProblems(conditions));
    if (err) {
      throw err;
    }
    return res as UnPromisifyFunction<typeof this.leetcode.getProblems>;
  }

  async getProblem(params: GetQuestionDetailByTitleSlugRequest) {
    const [err, res] = await to(this.leetcode.getQuestionDetailByTitleSlug(params));
    if (err) {
      throw err;
    }
    return res as UnPromisifyFunction<typeof this.leetcode.getQuestionDetailByTitleSlug>;
  }
}

export default AppApi;
