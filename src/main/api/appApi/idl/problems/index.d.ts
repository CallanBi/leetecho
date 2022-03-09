import { GetQuestionDetailByTitleSlugResponse } from 'src/main/api/leetcodeApi/utils/interfaces';
import {
  GetAllProblemsResponse,
  GetProblemsRequest,
  GetProblemsResponse,
  GetQuestionDetailByTitleSlugRequest,
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
  type GetProblemResp = SuccessResp<GetQuestionDetailByTitleSlugResponse>;
}
