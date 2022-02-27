import Problem from 'src/main/api/leetcodeApi/lib/problem';

import { SuccessResp } from '../../base';

/** interface types here */
export type GetAllProblemsResponse = SuccessResp<{
  problems: Problem[];
}>;

