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
    'Not Start'
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

interface TagItem {
    id: string;
    name: string;
    nameTranslated?: string;
    slug: string;
}

interface TagRelationItem {
    questionNum: number;
    tag: TagItem[];
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


type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';
type Status = 'NOT_STARTED' | 'AC' | 'TRIED';
type CategorySlug = '' | 'algorithms' | 'database' | 'shell';

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

export { HttpRequestOptions, GraphQLRequestOptions, Credit, ProblemStatus, ProblemDifficulty, SubmissionStatus, EndPoint, Uris, TagItem, TagRelationItem, TagGroupItem };

