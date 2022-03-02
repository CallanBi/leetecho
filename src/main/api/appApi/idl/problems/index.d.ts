import { GetAllProblemsResponse, GetProblemsRequest, GetProblemsResponse } from './index';
export { };

declare global {
  /** problem global types */
  type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';
  type Status = 'NOT_STARTED' | 'AC' | 'TRIED';
  type CategorySlug = '' | 'algorithms' | 'database' | 'shell';


  type GetAllProblemsResp = GetAllProblemsResponse;

  type GetProblemsReq = GetProblemsRequest;
  type GetProblemsResp = GetProblemsResponse;
}