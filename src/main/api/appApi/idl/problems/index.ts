import Problem from 'src/main/api/leetcodeApi/lib/problem';
import {
  GetProblemsFromGraphQLResponse,
  GetQuestionDetailByTitleSlugResponse,
} from 'src/main/api/leetcodeApi/utils/interfaces';

import { SuccessResp } from '../../base';

/** interface types here */
export type GetAllProblemsResponse = SuccessResp<{
  problems: Problem[];
}>;

export type GetProblemsRequest = {
  categorySlug?: '' | 'algorithms' | 'database' | 'shell';
  /** skip: for pagination, the number of problems to skip. Calculated by pageSize * pageNum. Default value is 0 */
  skip?: number;
  /** limit: for pagination, default value is 10 */
  limit?: number;
  filters?: {
    difficulty?: 'EASY' | 'MEDIUM' | 'HARD' | '';
    status?: 'NOT_STARTED' | 'AC' | 'TRIED' | '';
    /** searchKeywords: problem title, frontend id or content */
    searchKeywords?: string;
    /** tags: tags that a problem belongs to, defined as tagSlug */
    tags?: string[];
    /** listId: problem list that a problem belongs to */
    listId?: string;
    orderBy?: 'FRONTEND_ID' | 'AC_RATE' | 'DIFFICULTY' | '';
    sortOrder?: 'DESCENDING' | 'ASCENDING' | '';
  };
};

export type GetQuestionDetailByTitleSlugRequest = {
  titleSlug: string;
};

export type GetProblemsResponse = SuccessResp<GetProblemsFromGraphQLResponse['problemsetQuestionList']>;

export type GetProblemResponse = SuccessResp<GetQuestionDetailByTitleSlugResponse>;
