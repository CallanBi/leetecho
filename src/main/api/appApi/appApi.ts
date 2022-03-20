import to from 'await-to-js';
import Leetcode from '../leetcodeServices';
import { EndPoint } from '../leetcodeServices/utils/interfaces';
import {
  GetNotesByQuestionIdRequest,
  GetProblemsRequest,
  GetQuestionDetailByTitleSlugRequest,
  GetSubmissionDetailByIdRequest,
  GetSubmissionsByQuestionSlugRequest,
  GetUserProfileQuestionsRequest,
} from './idl/problems';
import { GetUserProgressReq } from './idl/user';

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

  async getSubmissionsByTitleSlug(
    params: GetSubmissionsByQuestionSlugRequest,
    options?: {
      sleepTime?: number;
    },
  ) {
    const [err, res] = await to(this.leetcode.getSubmissionsByQuestionSlug(params));
    if (err) {
      throw err;
    }
    return res as UnPromisifyFunction<typeof this.leetcode.getSubmissionsByQuestionSlug>;
  }

  async getNotesByQuestionId(params: GetNotesByQuestionIdRequest) {
    const [err, res] = await to(
      this.leetcode.getNotesByQuestionId({
        targetId: String(params.questionId),
      }),
    );
    if (err) {
      throw err;
    }
    return res as UnPromisifyFunction<typeof this.leetcode.getNotesByQuestionId>;
  }

  async getSubmissionDetailById(params: GetSubmissionDetailByIdRequest) {
    const [err, res] = await to(this.leetcode.getSubmissionDetailById(params));
    if (err) {
      throw err;
    }
    return res as UnPromisifyFunction<typeof this.leetcode.getSubmissionDetailById>;
  }

  async getUserProfileQuestions(params: GetUserProfileQuestionsRequest) {
    const [err, res] = await to(this.leetcode.getUserProfileQuestions(params));
    if (err) {
      throw err;
    }
    return res as UnPromisifyFunction<typeof this.leetcode.getUserProfileQuestions>;
  }

  async getUserStatus() {
    const [err, res] = await to(this.leetcode.getUserStatus());
    if (err) {
      throw err;
    }
    return res as UnPromisifyFunction<typeof this.leetcode.getUserStatus>;
  }

  async getUserProgress(params: GetUserProgressReq) {
    const [err, res] = await to(this.leetcode.getUserProgress(params));
    if (err) {
      throw err;
    }
    return res as UnPromisifyFunction<typeof this.leetcode.getUserProgress>;
  }
}

export default AppApi;
