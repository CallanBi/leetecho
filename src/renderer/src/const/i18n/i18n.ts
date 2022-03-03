const I18NWORD: {
  ZH?: Record<string, string>;
  EN?: Record<string, string>;
} = {
  ZH: {
    EASY: '简单',
    MEDIUM: '中等',
    HARD: '困难',
    NOT_STARTED: '未开始',
    AC: '已解答',
    TRIED: '尝试过',
  },
  EN: {
    EASY: 'Easy',
    MEDIUM: 'Medium',
    HARD: 'Hard',
    NOT_STARTED: 'Not started',
    AC: 'Accepted',
    TRIED: 'Tried',
  },
};

export const getI18nWord: (key: string, language: 'ZH' | 'EN') => string = (key, language) =>
  I18NWORD[language]?.[key] || '';
