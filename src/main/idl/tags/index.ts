import { TagGroupItem } from 'src/main/services/leetcodeServices/utils/interfaces';
import { SuccessResp } from '../../middleware/apiBridge/base';

/** interface types here */
export type GetAllTagsResponse = SuccessResp<{
  tagGroups: TagGroupItem[];
}>;
