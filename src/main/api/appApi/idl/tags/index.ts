import { TagGroupItem } from 'src/main/api/leetcodeServices/utils/interfaces';
import { SuccessResp } from '../../base';

/** interface types here */
export type GetAllTagsResponse = SuccessResp<{
  tagGroups: TagGroupItem[];
}>;
