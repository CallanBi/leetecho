import { COLOR_PALETTE } from 'src/const/theme/color';
import { getI18nWord } from '../i18n';

export type LeetCodeProblemListType = {
  CN:
    | 'CODING_INTERVIEW_SPECIAL'
    | 'CODING_INTERVIEW_2'
    | 'PROGRAMMER_INTERVIEW_GOLDEN_6'
    | 'LEETCODE_HOT_100'
    | 'LEETCODE_DATABASE_70'
    | 'LEETCODE_ALGORITHM_200'
    | 'LEETCODE_CONTEST'
    | 'TENCENT_50'
    | 'LEETCODE_TOP_INTERVIEW'
    | 'FAVORITE';
  EN: never;
};

export type LeetCodeProblemList = {
  CN: {
    [key in LeetCodeProblemListType['CN']]: {
      name: string;
      listId: string;
    };
  };
  EN?: {
    [key in LeetCodeProblemListType['EN']]: {
      name: string;
      listId: string;
    };
  };
};

export const LEETCODE_PROBLEM_LIST: LeetCodeProblemList = {
  CN: {
    CODING_INTERVIEW_SPECIAL: {
      name: '剑指 offer（专项突击版）',
      listId: 'e8X3pBZi',
    },
    CODING_INTERVIEW_2: {
      name: '剑指 offer（第 2 版）',
      listId: 'xb9nqhhg',
    },
    PROGRAMMER_INTERVIEW_GOLDEN_6: {
      name: '程序员面试金典（第 6 版）',
      listId: 'xb9lfcwi',
    },
    LEETCODE_HOT_100: {
      name: 'LeetCode 热题 Hot 100',
      listId: '2cktkvj',
    },
    LEETCODE_DATABASE_70: {
      name: 'LeetCode 精选数据库 70 题',
      listId: 'qgq7m9e',
    },
    LEETCODE_ALGORITHM_200: {
      name: 'LeetCode 精选算法 200 题',
      listId: 'qgq7m9e',
    },
    LEETCODE_CONTEST: {
      name: '力扣杯 - 竞赛合集',
      listId: '7cyqwuv',
    },
    TENCENT_50: {
      name: '腾讯精选练习 50 题',
      listId: 'ex0k24j',
    },
    LEETCODE_TOP_INTERVIEW: {
      name: 'LeetCode 精选 TOP 面试题',
      listId: '2ckc81c',
    },
    FAVORITE: {
      name: 'Favorite',
      listId: 'ow1ekkr',
    },
  },
};

export const DIFFICULTY_WORD = {
  EASY: getI18nWord('EASY', 'ZH'),
  MEDIUM: getI18nWord('MEDIUM', 'ZH'),
  HARD: getI18nWord('HARD', 'ZH'),
};

export const DIFFICULTY_COLOR: { [key in Difficulty]: string } = {
  EASY: COLOR_PALETTE.LEETECHO_GREEN,
  MEDIUM: COLOR_PALETTE.LEETECHO_YELLOW,
  HARD: COLOR_PALETTE.LEETECHO_RED,
};

export const STATUS_WORD: { [key in Status]: string } = {
  NOT_STARTED: getI18nWord('NOT_STARTED', 'ZH'),
  AC: getI18nWord('AC', 'ZH'),
  TRIED: getI18nWord('TRIED', 'ZH'),
};
