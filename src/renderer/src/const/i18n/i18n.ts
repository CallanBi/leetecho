const I18NWORD: {
  ZH?: Record<string, string>;
  EN?: Record<string, string>;
} = {
  'ZH': {
    'EASY': '简单',
    'MEDIUM': '中等',
    'HARD': '困难',
  },
  'EN': {
    'EASY': 'Easy',
    'MEDIUM': 'Medium',
    'HARD': 'Hard',
  }
};

export const getI18nWord: (key: string, language: 'ZH' | 'EN') => string = (key, language) => I18NWORD[language]?.[key] || '';