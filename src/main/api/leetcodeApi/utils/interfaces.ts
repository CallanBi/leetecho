interface HttpRequestOptions {
  method?: string;
  url: string;
  referer?: string;
  resolveWithFullResponse?: boolean;
  form?: any;
  body?: any;
  header?: any;
}

interface GraphQLRequestOptions {
  origin?: string;
  referer?: string;
  query: string;
  variables?: object;
}

interface Credit {
  session?: string;
  csrfToken: string;
}

enum ProblemStatus {
  'Accept',
  'Not Accept',
  'Not Start',
}

enum ProblemDifficulty {
  'Easy',
  'Medium',
  'Hard',
}

enum SubmissionStatus {
  'Accepted',
  'Compile Error',
  'Wrong Answer',
  'Time Limit Exceeded',
}

enum EndPoint {
  'US',
  'CN',
}

interface Uris {
  base: string;
  login: string;
  graphql: string;
  problemsAll: string;
  problem: string;
  submit: string;
  submission: string;
}

/** ---- newly added */

interface TagItem {
  id: string;
  name: string;
  nameTranslated?: string;
  slug: string;
}

interface TagRelationItem {
  questionNum: number;
  tag: TagItem;
}

interface TagGroupItem {
  name: string;
  transName: string;
  tagRelation: TagRelationItem[];
}

export interface TopicTag {
  id: string;
  name: string;
  slug: string;
  nameTranslated?: string;
  __typename: string;
}

export interface TopCompanyTag {
  imgUrl: string;
  slug: string;
  __typename: string;
}

export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';
export type Status = 'NOT_STARTED' | 'AC' | 'TRIED';
export type CategorySlug = '' | 'algorithms' | 'database' | 'shell';

export type QuestionStatus = 'FAILED' | 'ACCEPTED' | 'UNTOUCHED';

export type SortOrder = 'ASCENDING' | 'DESCENDING';

export interface Extra {
  companyTagNum?: number;
  hasVideoSolution?: boolean;
  topCompanyTags?: TopCompanyTag[];
  __typename?: string;
  [key: string]: unknown;
}

export type ProblemItemFromGraphQL = {
  __typename: string;
  acRate: number;
  difficulty: Difficulty;
  freqBar: number;
  paidOnly: boolean;
  status: Status;
  frontendQuestionId: string;
  isFavor: boolean;
  solutionNum: number;
  title: string;
  titleCn: string;
  titleSlug: string;
  topicTags: TopicTag[];
  extra: Extra;
};

export type ProblemsetQuestionList = {
  hasMore: boolean;
  total: number;
  questions: ProblemItemFromGraphQL[];
  __typename: string;
};

export interface GetProblemsFromGraphQLResponse {
  problemsetQuestionList: ProblemsetQuestionList;
}

export interface UserProfileQuestions {
  totalNum: number;
  questions: Question[];
}

export interface GetUserProfileQuestionsResponse {
  userProfileQuestions: UserProfileQuestions;
}

export interface Submission {
  id: string;
  timestamp: string;
  url: string;
  lang: string;
  memory: string;
  runtime: string;
  statusDisplay: SubmissionStatus;
  __typename: string;
}

export interface SubmissionList {
  lastKey: string;
  hasNext: boolean;
  submissions: Submission[];
  __typename: string;
}

export interface GetSubmissionsByQuestionSlugResponse {
  submissionList: SubmissionList;
}

export type QuestionSortField = 'LAST_SUBMITTED_AT';

export interface OutputDetail {
  codeOutput: string;
  expectedOutput: string;
  input: string;
  compileError: string;
  runtimeError: string;
  lastTestcase: string;
  __typename: string;
}

export interface SubmissionDetail {
  id: string;
  code: string;
  runtime: string;
  memory: string;
  rawMemory: string;
  statusDisplay: string;
  timestamp: number;
  lang: string;
  passedTestCaseCnt: number;
  totalTestCaseCnt: number;
  sourceUrl: string;
  question: Question;
  outputDetail: OutputDetail;
  __typename: string;
  submissionComment?: any;
}

export interface GetSubmissionDetailByIdResponse {
  submissionDetail: SubmissionDetail;
}

export interface TopicTag {
  name: string;
  slug: string;
  translatedName: string;
  __typename: string;
}

export interface CodeSnippet {
  lang: string;
  langSlug: string;
  code: string;
  __typename: string;
}

export interface Solution {
  id: string;
  canSeeDetail: boolean;
  __typename: string;
}

export interface Question {
  questionId: string;
  questionFrontendId?: string;
  categoryTitle?: string;
  boundTopicId?: number;
  title: string;
  titleSlug: string;
  content?: string;
  translatedTitle: string;
  translatedContent?: string;
  isPaidOnly?: boolean;
  difficulty?: string;
  likes?: number;
  dislikes?: number;
  isLiked?: any;
  similarQuestions?: string;
  contributors?: any[];
  langToValidPlayground?: string;
  topicTags?: TopicTag[];
  companyTagStats?: any;
  codeSnippets?: CodeSnippet[];
  stats?: string;
  hints?: string[];
  solution?: Solution;
  status?: string;
  sampleTestCase?: string;
  metaData?: string;
  judgerAvailable?: boolean;
  judgeType?: string;
  mysqlSchemas?: any[];
  enableRunCode?: boolean;
  envInfo?: string;
  book?: any;
  isSubscribed?: boolean;
  isDailyQuestion?: boolean;
  dailyRecordStatus?: string;
  editorType?: string;
  ugcQuestionId?: any;
  style?: string;
  exampleTestcases?: string;
  __typename: string;
}

export interface UserNote {
  config: string;
  content: string;
  id: string;
  noteType: string;
  status: string;
  summary: string;
  targetId: string;
  updatedAt: Date;
  noteQuestion?: NoteQuestion;
  __typename: string;
}

export interface NoteOneTargetCommonNote {
  count: number;
  userNotes: UserNote[];
  __typename: string;
}

export interface GetNotesByQuestionIdResponse {
  noteOneTargetCommonNote: NoteOneTargetCommonNote;
}

export interface GetQuestionDetailByTitleSlugResponse {
  question: Question;
}

export interface NoteQuestion {
  linkTemplate: string;
  questionFrontendId: string;
  questionId: string;
  title: string;
  translatedTitle: string;
  __typename: string;
}

export interface NoteAggregateNote {
  count: number;
  userNotes: UserNote[];
  __typename: string;
}

export interface GetNotesResponse {
  noteAggregateNote: NoteAggregateNote;
}

export interface AccountStatus {
  isFrozen: boolean;
  inactiveAfter?: any;
  __typename: string;
}

export interface UserStatus {
  isSignedIn: boolean;
  isAdmin: boolean;
  isStaff: boolean;
  isSuperuser: boolean;
  isTranslator: boolean;
  isVerified: boolean;
  isPhoneVerified: boolean;
  isWechatVerified: boolean;
  checkedInToday: boolean;
  username: string;
  realName: string;
  userSlug: string;
  groups: string[];
  avatar: string;
  optedIn: boolean;
  requestRegion: string;
  region: string;
  socketToken: string;
  activeSessionId: number;
  permissions: string[];
  completedFeatureGuides: string[];
  useTranslation: boolean;
  accountStatus: AccountStatus;
  __typename: string;
}

export interface GetUserStatusResponse {
  userStatus: UserStatus;
}

export {
  HttpRequestOptions,
  GraphQLRequestOptions,
  Credit,
  ProblemStatus,
  ProblemDifficulty,
  SubmissionStatus,
  EndPoint,
  Uris,
  TagItem,
  TagRelationItem,
  TagGroupItem,
};
