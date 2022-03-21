import {
  GetNotesByQuestionIdResponse,
  GetQuestionDetailByTitleSlugResponse,
  GetSubmissionDetailByIdResponse,
} from 'src/main/api/leetcodeApi/utils/interfaces';
import {
  GetAllProblemsResponse,
  GetNotesByQuestionIdRequest,
  GetProblemsRequest,
  GetProblemsResponse,
  GetQuestionDetailByTitleSlugRequest,
  GetSubmissionDetailByIdRequest,
  GetSubmissionsByQuestionSlugRequest,
  GetSubmissionsByQuestionSlugResponse,
} from './index';

export {};

declare global {
  /** problem global types */
  type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';
  type Status = 'NOT_STARTED' | 'AC' | 'TRIED';
  type CategorySlug = '' | 'algorithms' | 'database' | 'shell';

  type GetAllProblemsResp = GetAllProblemsResponse;

  type GetProblemsReq = GetProblemsRequest;
  type GetProblemsResp = GetProblemsResponse;

  type GetProblemReq = GetQuestionDetailByTitleSlugRequest;
  type GetProblemResp = SuccessResp<GetQuestionDetailByTitleSlugResponse['question']>;

  type GetSubmissionsByQuestionSlugReq = GetSubmissionsByQuestionSlugRequest;
  type GetSubmissionsByQuestionSlugResp = GetSubmissionsByQuestionSlugResponse;

  type GetNotesByQuestionIdReq = GetNotesByQuestionIdRequest;

  type GetNotesByQuestionIdResp = SuccessResp<GetNotesByQuestionIdResponse['noteOneTargetCommonNote']>;

  type GetSubmissionDetailByIdReq = GetSubmissionDetailByIdRequest;
  type GetSubmissionDetailByIdResp = SuccessResp<GetSubmissionDetailByIdResponse['submissionDetail']>;
}
