/* eslint-disable no-async-promise-executor */
import to from 'await-to-js';
import { StatusCodeError } from 'request-promise-native/errors';
import { transformCustomErrorToMsg } from '../../router';
import ApiBridge from '../../middleware/apiBridge';
import { ErrorResp, SuccessResp } from '../../middleware/apiBridge/base';
import ERROR_CODE, { getErrorCodeMessage } from '../../router/errorCode';
import {
  GetNotesByQuestionIdResponse,
  GetProblemsFromGraphQLResponse,
  GetQuestionDetailByTitleSlugResponse,
  GetSubmissionDetailByIdResponse,
  GetSubmissionsByQuestionSlugResponse,
  GetUserProfileQuestionsResponse,
  Question,
  Submission,
  SubmissionDetail,
  UserNote,
} from '../leetcodeServices/utils/interfaces';

import { format, toDate } from 'date-fns';
import { GetProblemsRequest } from 'src/main/idl/problems';

/**
 * sleep for a while in async function
 * @param fn async fn
 * @param par input param
 * @param sleepTime sleep time in millisecond
 * @returns sleep fn
 */
export async function sleep<T, U>(fn: (par: T) => Promise<U>, par: T, sleepTime?: number) {
  const promise = new Promise<U>(async (resolve, reject) => {
    const [err, res] = (await to(fn(par))) as [null | Error | ErrorResp, U];
    setTimeout(
      async function () {
        if (err) {
          reject(err);
        }
        resolve(res);
      },
      sleepTime || 100,
      fn,
      par,
    );
  });
  return promise;
}

/**
 * concurrency control
 * @param args
 * @returns results
 */
export async function concurrencyController<T, U>(args: {
  requestFunc: (params: T, idx: number) => Promise<U>;
  params: T[];
  concurrency: number;
}): Promise<U[]> {
  const { requestFunc, params, concurrency } = args;
  const requestWindow: T[] = [];
  const results: U[] = [];

  let i = 0;
  for (; i < params.length; i++) {
    requestWindow.push(params[i]);
    if (requestWindow.length === concurrency) {
      const requestPromises = requestWindow.map((param) => requestFunc(param, i));
      const [err, responses] = await to(Promise.all(requestPromises));
      if (err) {
        throw err;
      }
      results.push(...responses);
      requestWindow.length = 0;
    } else {
      continue;
    }
  }

  const finalRequestPromises = requestWindow.map((param) => requestFunc(param, i));

  const [finalErr, res] = await to(Promise.all(finalRequestPromises));
  if (finalErr) {
    throw finalErr;
  }
  results.push(...res);
  return results;
}

/**
 * Format timestamp to date string with 'yyyy/MM/dd H:mm' format
 * @param timestamp string | number
 * @returns string
 */
export function formatTimeStamp(timestamp: string | number) {
  return format(toDate(Number(timestamp) * 1000), 'yyyy/MM/dd H:mm');
}

/**
 * retry request with a limited number of retries
 * @param requestFunc request function
 * @param params request params
 * @param retryCount retry count
 * @param isResFailed customized function for checking if response is failed
 * @param error? customized error
 * @returns response
 */
export function retryRequest<T, U>(
  requestFunc: (params: T) => Promise<U>,
  params: T,
  isResFailed: (res?: U) => boolean = () => false,
  retryCount = 100,
  error?: Error | ErrorResp,
) {
  return new Promise<U>((resolve, reject) => {
    let count = 0;
    const request = async () => {
      try {
        const [err, res] = await to(requestFunc(params));
        if (err || isResFailed(res)) {
          if (count < retryCount) {
            count++;
            request();
          } else {
            if (err) {
              reject(err);
            }
            if (isResFailed(res)) {
              if (error) {
                reject(error || res);
              } else {
                reject(
                  new ErrorResp({
                    code: ERROR_CODE.UNKNOWN_ERROR,
                    message: 'invalid response in retry request',
                  }) || res,
                );
              }
            }
          }
        } else {
          resolve(res);
        }
      } catch (e) {
        if (count < retryCount) {
          count++;
          request();
        } else {
          reject(e);
        }
      }
    };
    request();
  });
}

export interface GetQuestionAllInfoByTitleSlugResponse extends Question {
  lastAcceptedSubmissionDetail: SubmissionDetail & {
    time: string;
  };
  notes: UserNote[];
}

export const getAllUserProfileSuccessQuestions = async (apiBridge: ApiBridge) => {
  const first = 20; // page size

  const requestOnce = async ({
    realOffset,
  }: {
    realOffset: number;
  }): Promise<GetUserProfileQuestionsResponse['userProfileQuestions']> => {
    if (!apiBridge) {
      throw new Error(transformCustomErrorToMsg(new ErrorResp({ code: ERROR_CODE.NOT_LOGIN })));
    }

    const [err, response] = await to(
      apiBridge.getUserProfileQuestions({
        skip: realOffset,
      }),
    );

    if (err) {
      throw new ErrorResp({
        code: (err as StatusCodeError).statusCode ?? ERROR_CODE.UNKNOWN_ERROR,
        message: err.message || getErrorCodeMessage(),
      });
    }

    return response as GetUserProfileQuestionsResponse['userProfileQuestions'];
  };

  const allUserProfileQuestions: GetUserProfileQuestionsResponse['userProfileQuestions']['questions'] = [];

  let curOffset = 0;

  let [err, res] = await to(requestOnce({ realOffset: curOffset }));

  if (err) {
    throw new ErrorResp({
      code: (err as StatusCodeError).statusCode ?? ERROR_CODE.UNKNOWN_ERROR,
      message: err.message || getErrorCodeMessage(),
    });
  }

  while (res?.totalNum !== allUserProfileQuestions.length) {
    const { questions = [] } = res as GetUserProfileQuestionsResponse['userProfileQuestions'];
    allUserProfileQuestions.push(...questions);
    curOffset += first;
    [err, res] = await to(requestOnce({ realOffset: curOffset }));

    if (err) {
      throw new ErrorResp({
        code: (err as StatusCodeError).statusCode ?? ERROR_CODE.UNKNOWN_ERROR,
        message: err.message || getErrorCodeMessage(),
      });
    }
  }

  allUserProfileQuestions.push(...(res?.questions ?? []));

  return {
    code: ERROR_CODE.OK,
    data: {
      questions: allUserProfileQuestions,
      totalNum: res?.totalNum ?? 0,
    },
  } as SuccessResp<GetUserProfileQuestionsResponse['userProfileQuestions']>;
};

/**
 * Get a question's detail and its submissions and notes by title slug.
 * @param apiBridge
 * @param titleSlug
 * @returns
 */
export const getQuestionAllInfoByTitleSlug = async (params: { apiBridge: ApiBridge; titleSlug: string }) => {
  const { apiBridge, titleSlug } = params;

  const [questionDetailErr, questionDetail] = (await to(apiBridge.getProblem({ titleSlug }))) as [
    null | ErrorResp,
    GetQuestionDetailByTitleSlugResponse['question'],
  ];

  if (questionDetailErr) {
    throw new ErrorResp({
      code: (questionDetailErr as unknown as StatusCodeError).statusCode ?? ERROR_CODE.UNKNOWN_ERROR,
      message: questionDetailErr.message || getErrorCodeMessage(),
    });
  }

  const [getSubmissionErr, allSubmissionsList] = (await to(
    apiBridge.getSubmissionsByTitleSlug({ questionSlug: titleSlug }),
  )) as [null | ErrorResp, GetSubmissionsByQuestionSlugResponse['submissionList']];

  if (getSubmissionErr) {
    throw new ErrorResp({
      code: (getSubmissionErr as unknown as StatusCodeError).statusCode ?? ERROR_CODE.UNKNOWN_ERROR,
      message: getSubmissionErr.message || getErrorCodeMessage(),
    });
  }

  const { submissions = [] } = allSubmissionsList;

  const lastAcceptedSubmission = submissions.find((s) => s?.statusDisplay === 'Accepted') ?? ({} as Submission);

  if (Object.keys(lastAcceptedSubmission).length === 0) {
    throw new ErrorResp({
      code: ERROR_CODE.NO_AC_SUBMISSIONS,
      message: 'No accepted submission',
    });
  }

  const [getSubmissionDetailByIdErr, lastAcceptedSubmissionDetail] = (await to(
    retryRequest(
      apiBridge.getSubmissionDetailById.bind(apiBridge),
      { id: lastAcceptedSubmission.id },
      (res) => res === null || res === undefined,
      100,
      new ErrorResp({
        code: ERROR_CODE.UNKNOWN_ERROR,
        message: 'invalid response in retry request: submission detail is empty',
      }),
    ),
    // apiBridge.getSubmissionDetailById({ id: lastAcceptedSubmission.id }),
  )) as [null | ErrorResp, GetSubmissionDetailByIdResponse['submissionDetail']];

  const [getNotesErr, allNotes] = (await to(
    apiBridge.getNotesByQuestionId({ questionId: Number(questionDetail.questionId) }),
  )) as [null | ErrorResp, GetNotesByQuestionIdResponse['noteOneTargetCommonNote']];

  if (getNotesErr) {
    throw new ErrorResp({
      code: (getNotesErr as unknown as StatusCodeError).statusCode ?? ERROR_CODE.UNKNOWN_ERROR,
      message: getNotesErr.message || getErrorCodeMessage(),
    });
  }

  if (getSubmissionDetailByIdErr) {
    throw new ErrorResp({
      code: (getSubmissionDetailByIdErr as unknown as StatusCodeError).statusCode ?? ERROR_CODE.UNKNOWN_ERROR,
      message: getSubmissionDetailByIdErr.message || getErrorCodeMessage(),
    });
  }

  const { userNotes = [] } = allNotes;

  return {
    code: ERROR_CODE.OK,
    data: {
      ...questionDetail,
      lastAcceptedSubmissionDetail: {
        ...lastAcceptedSubmissionDetail,
        time: lastAcceptedSubmissionDetail?.timestamp ? formatTimeStamp(lastAcceptedSubmissionDetail.timestamp) : '',
      },
      notes: userNotes.length === 0 ? [{ content: 'No notes' }] : userNotes,
    },
  } as SuccessResp<GetQuestionAllInfoByTitleSlugResponse>;
};

export async function getAllFilteredProblem(apiBridge: ApiBridge, params: GetProblemsRequest['filters']) {
  const limit = 100;

  const req = {
    limit,
    skip: 0,
    filters: params,
  } as GetProblemsRequest;

  const requestOnce = async ({
    realOffset,
  }: {
    realOffset: number;
  }): Promise<GetProblemsFromGraphQLResponse['problemsetQuestionList']> => {
    const [err, response] = await to(apiBridge.getProblems({ ...req, skip: realOffset }));

    if (err) {
      throw new ErrorResp({
        code: (err as StatusCodeError).statusCode ?? ERROR_CODE.UNKNOWN_ERROR,
        message: err.message || getErrorCodeMessage(),
      });
    }

    return response;
  };

  const questions: GetProblemsFromGraphQLResponse['problemsetQuestionList']['questions'] = [];

  let curOffset = 0;

  let [err, res] = await to(requestOnce({ realOffset: curOffset }));

  if (err) {
    throw new ErrorResp({
      code: (err as StatusCodeError).statusCode ?? ERROR_CODE.UNKNOWN_ERROR,
      message: err.message || getErrorCodeMessage(),
    });
  }

  while (res?.hasMore) {
    const { questions: pagedQuestions = [] } = res;
    questions.push(...pagedQuestions);
    curOffset += limit;
    [err, res] = await to(requestOnce({ realOffset: curOffset }));
    if (err) {
      throw new ErrorResp({
        code: (err as StatusCodeError).statusCode ?? ERROR_CODE.UNKNOWN_ERROR,
        message: err.message || getErrorCodeMessage(),
      });
    }
  }

  questions.push(...(res?.questions ?? []));

  if (err) {
    throw err;
  }

  return {
    code: ERROR_CODE.OK,
    data: {
      hasMore: res?.hasMore ?? false,
      total: res?.total ?? 0,
      questions,
    },
  } as SuccessResp<GetProblemsFromGraphQLResponse['problemsetQuestionList']>;
}
