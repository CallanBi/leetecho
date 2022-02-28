import { TagGroupItem } from 'src/main/api/leetcodeApi/utils/interfaces';
import { SuccessResp } from '../../base';

/** interface types here */
export type GetAllTagsResponse = SuccessResp<{
  tagGroups: TagGroupItem[];
}>;
