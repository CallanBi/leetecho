/* eslint-disable max-len */
import to from 'await-to-js';
import { StatusCodeError } from 'request-promise-native/errors';
import { deleteNilVal } from '../../../tools';
import { ErrorResp } from '../../appApi/base';
import { GetProblemsRequest } from '../../appApi/idl/problems';
import ERROR_CODE, { getErrorCodeMessage } from '../../errorCode';
import Helper from '../utils/helper';
import {
  Credit,
  Difficulty,
  EndPoint,
  GetNotesByQuestionIdResponse,
  GetNotesResponse,
  GetProblemsFromGraphQLResponse,
  GetQuestionDetailByTitleSlugResponse,
  GetSubmissionDetailByIdResponse,
  GetSubmissionsByQuestionSlugResponse,
  GetUserProfileQuestionsResponse,
  GetUserStatusResponse,
  QuestionSortField,
  QuestionStatus,
  SortOrder,
  TagGroupItem,
  Uris,
  UserProfileQuestions,
} from '../utils/interfaces';
import Problem from './problem';

/**
 * validate: a decorator factory that validates API parameters
 * @param validator (params: Record<string, unknown>) => boolean
 * @returns MethodDecorator
 */
function validate(validator: (params: any) => boolean) {
  return function (
    target: unknown,
    propertyName: string,
    descriptor: TypedPropertyDescriptor<(params: Record<string, unknown>) => Promise<unknown>>,
  ) {
    const requestFunc = descriptor.value;
    descriptor.value = async function (...args) {
      if (typeof requestFunc === 'function') {
        // const params = requestFunc.arguments;
        if (validator(args)) {
          return requestFunc.apply(this, args);
        } else {
          throw new ErrorResp({
            code: ERROR_CODE.REQUEST_PARAMS_ERROR,
            message: getErrorCodeMessage(ERROR_CODE.REQUEST_PARAMS_ERROR),
          });
        }
      }
    };
  } as MethodDecorator;
}

function auth(params: Record<string, unknown>): {
  /** TODO: get whether user login status is valid */
};

class Leetcode {
  session?: string;

  csrfToken: string;

  static uris: Uris;

  static setUris(uris: Uris): void {
    Leetcode.uris = uris;
  }

  constructor(credit: Credit) {
    this.session = credit.session;
    this.csrfToken = credit.csrfToken;
  }

  get credit(): Credit {
    return {
      session: this.session,
      csrfToken: this.csrfToken,
    };
  }

  static async build(username: string, password: string, endpoint: EndPoint): Promise<Leetcode> {
    Helper.switchEndPoint(endpoint);
    const [err, credit] = (await to(this.login(username, password))) as any as [Error, Credit];
    if (err) {
      throw new ErrorResp({
        code: (err as ErrorResp).code ?? ERROR_CODE.UNKNOWN_ERROR,
        message: (err as ErrorResp).message ?? getErrorCodeMessage(),
      });
    }

    Helper.setCredit(credit);
    return new Leetcode(credit);
  }

  static async login(username: string, password: string): Promise<Credit> {
    // got login token first
    const [err, response] = await to(
      Helper.HttpRequest({
        url: Leetcode.uris.login,
        resolveWithFullResponse: true,
      }),
    );
    if (err) {
      throw new ErrorResp({
        code: (err as StatusCodeError).statusCode ?? ERROR_CODE.UNKNOWN_ERROR,
        message: (err as StatusCodeError).message ?? getErrorCodeMessage(),
      });
    }
    const token: string = Helper.parseCookie(response.headers['set-cookie'], 'csrftoken');
    // Leetcode CN returns null here, but it does not matter
    let credit: Credit = {
      csrfToken: token,
    };
    Helper.setCredit(credit);

    // then login
    const [e, _response] = await to(
      Helper.HttpRequest({
        method: 'POST',
        url: Leetcode.uris.login,
        form: {
          csrfmiddlewaretoken: token,
          login: username,
          password,
        },
        resolveWithFullResponse: true,
      }),
    );
    if (e) {
      throw new ErrorResp({
        code: (e as StatusCodeError).statusCode ?? ERROR_CODE.UNKNOWN_ERROR,
        message:
          (e as StatusCodeError).statusCode === 400
            ? 'Invalid username or password'
            : e.message || getErrorCodeMessage(),
      });
    }
    const session = Helper.parseCookie(_response.headers['set-cookie'], 'LEETCODE_SESSION');
    const csrfToken = Helper.parseCookie(_response.headers['set-cookie'], 'csrftoken');
    credit = {
      session,
      csrfToken,
    };
    return credit;
  }

  async getProfile(): Promise<any> {
    // ? TODO : fetch more user profile.
    const [err, response]: any = await to(
      Helper.GraphQLRequest({
        query: `
            {
                user {
                    username
                }
            }
            `,
      }),
    );
    if (err) {
      throw new ErrorResp({
        code: (err as StatusCodeError).statusCode ?? ERROR_CODE.UNKNOWN_ERROR,
        message: (err as StatusCodeError).message ?? getErrorCodeMessage(),
      });
    }
    return response.user;
  }

  async getAllProblems(): Promise<Array<Problem>> {
    const [err, response] = await to(
      Helper.HttpRequest({
        url: Leetcode.uris.problemsAll,
      }),
    );
    if (err) {
      throw new ErrorResp({
        code: (err as StatusCodeError).statusCode ?? ERROR_CODE.UNKNOWN_ERROR,
        message: (err as StatusCodeError).message ?? getErrorCodeMessage(),
      });
    }
    const res = JSON.parse(response);
    const problems: Array<Problem> = res.stat_status_pairs.map((p: any) => {
      return new Problem(
        p.stat.question__title_slug,
        p.stat.question_id,
        p.stat.question__title,
        Helper.difficultyMap(p.difficulty.level),
        p.is_favor,
        p.paid_only,
        undefined,
        undefined,
        Helper.statusMap(p.status),
        undefined,
        p.stat.total_acs,
        p.stat.total_submitted,
        undefined,
        undefined,
        undefined,
      );
    });
    return problems;
  }

  async getProblems(conditions: GetProblemsRequest): Promise<GetProblemsFromGraphQLResponse['problemsetQuestionList']> {
    const [err, response] = await to(
      Helper.GraphQLRequest({
        query: `
      query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
        problemsetQuestionList(
          categorySlug: $categorySlug
          limit: $limit
          skip: $skip
          filters: $filters
        ) {
          hasMore
          total
          questions {
            acRate
            difficulty
            freqBar
            frontendQuestionId
            isFavor
            paidOnly
            solutionNum
            status
            title
            titleCn
            titleSlug
            topicTags {
              name
              nameTranslated
              id
              slug
            }
            extra {
              hasVideoSolution
              topCompanyTags {
                imgUrl
                slug
                numSubscribed
              }
            }
          }
        }
      }
      `,
        variables: deleteNilVal({
          categorySlug: '',
          filters: {},
          limit: 50,
          skip: 0,
          ...conditions,
        }),
      }),
    );
    if (err) {
      throw new ErrorResp({
        code: (err as StatusCodeError).statusCode ?? ERROR_CODE.UNKNOWN_ERROR,
        message: err.message || getErrorCodeMessage(),
      });
    }

    const { problemsetQuestionList } = response;
    return problemsetQuestionList as GetProblemsFromGraphQLResponse['problemsetQuestionList'];
  }

  @validate((params: [{ tag: string }]) => typeof params[0]?.tag === 'string' && params[0].tag !== '')
  async getProblemsByTag(tag: string): Promise<Array<Problem>> {
    const [err, response] = await to(
      Helper.GraphQLRequest({
        query: `
        query getTopicTag($slug: String!) {
            topicTag(slug: $slug) {
                questions {
                    status
                    questionId
                    title
                    titleSlug
                    stats
                    difficulty
                    isPaidOnly
                    topicTags {
                        slug
                    }
                }
            }
        }
      `,
        variables: {
          slug: tag,
        },
      }),
    );
    if (err) {
      throw new ErrorResp({
        code: (err as StatusCodeError).statusCode ?? ERROR_CODE.UNKNOWN_ERROR,
        message: err.message || getErrorCodeMessage(),
      });
    }
    const problems: Array<Problem> = response.topicTag.questions.map((p: any) => {
      const stat: any = JSON.parse(p.stats);
      return new Problem(
        p.titleSlug,
        p.questionId,
        p.title,
        stat.title,
        undefined,
        p.isPaidOnly,
        undefined,
        undefined,
        Helper.statusMap(p.status),
        p.topicTags.map((t: any) => t.slug),
        stat.totalAcceptedRaw,
        stat.totalSubmissionRaw,
        undefined,
        undefined,
        undefined,
      );
    });
    return problems;
  }

  async getAllTags(): Promise<TagGroupItem[]> {
    const [err, response] = await to(
      Helper.GraphQLRequest({
        query: `
        query questionTagTypeWithTags {
          questionTagTypeWithTags {
            name
            transName
            tagRelation {
              questionNum
              tag {
                name
                id
                nameTranslated
                slug
              }
            }
          }
        }
      `,
      }),
    );
    if (err) {
      throw new ErrorResp({
        code: (err as StatusCodeError).statusCode ?? ERROR_CODE.UNKNOWN_ERROR,
        message: err.message || getErrorCodeMessage(),
      });
    }

    const { questionTagTypeWithTags: tagGroups } = response as { questionTagTypeWithTags: TagGroupItem[] };
    return tagGroups;
  }

  async getUserProfileQuestions(params: {
    difficulty?: Difficulty[];
    first?: number;
    skip?: number;
    sortField?: QuestionSortField;
    sortOrder?: SortOrder;
    status?: QuestionStatus;
  }): Promise<UserProfileQuestions> {
    const {
      difficulty = [],
      first = 0,
      skip = 0,
      sortField = 'LAST_SUBMITTED_AT',
      sortOrder = 'DESCENDING',
      status = 'ACCEPTED',
    } = params;
    const [err, response] = await to(
      Helper.GraphQLRequest({
        query: `
        query userProfileQuestions($status: StatusFilterEnum!, $skip: Int!, $first: Int!, $sortField: SortFieldEnum!, $sortOrder: SortingOrderEnum!, $keyword: String, $difficulty: [DifficultyEnum!]) {
          userProfileQuestions(status: $status, skip: $skip, first: $first, sortField: $sortField, sortOrder: $sortOrder, keyword: $keyword, difficulty: $difficulty) {
            totalNum
            questions {
              translatedTitle
              frontendId
              titleSlug
              title
              difficulty
              lastSubmittedAt
              numSubmitted
              submissions {
                id
                timestamp
                url
                lang
                memory
                runtime
                statusDisplay
                __typename
              }
              lastSubmissionSrc {
                sourceType
                ... on SubmissionSrcLeetbookNode {
                  slug
                  title
                  pageId
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
        }
      `,
        variables: {
          difficulty,
          first,
          skip,
          sortField,
          sortOrder,
          status,
        },
      }),
    );
    if (err) {
      throw new ErrorResp({
        code: (err as StatusCodeError).statusCode ?? ERROR_CODE.UNKNOWN_ERROR,
        message: err.message || getErrorCodeMessage(),
      });
    }

    const { userProfileQuestions } = response as GetUserProfileQuestionsResponse;
    return userProfileQuestions;
  }

  async getSubmissionsByQuestionSlug(params: {
    limit?: number;
    offset?: number;
    questionSlug: string;
  }): Promise<GetSubmissionsByQuestionSlugResponse['submissionList']> {
    const { limit = 0, offset = 0, questionSlug = '' } = params;
    const [err, response] = await to(
      Helper.GraphQLRequest({
        query: `
        query progressSubmissions($offset: Int, $limit: Int, $lastKey: String, $questionSlug: String) {
          submissionList(offset: $offset, limit: $limit, lastKey: $lastKey, questionSlug: $questionSlug) {
            lastKey
            hasNext
            submissions {
              id
              timestamp
              url
              lang
              memory
              runtime
              statusDisplay
              __typename
            }
            __typename
          }
        }
      `,
        variables: {
          questionSlug,
          limit,
          offset,
        },
      }),
    );
    if (err) {
      throw new ErrorResp({
        code: (err as StatusCodeError).statusCode ?? ERROR_CODE.UNKNOWN_ERROR,
        message: err.message || getErrorCodeMessage(),
      });
    }

    const { submissionList } = response as GetSubmissionsByQuestionSlugResponse;
    return submissionList;
  }

  @validate((params: [{ id: string }]) => typeof params[0]?.id === 'string' && params[0]?.id !== '')
  async getSubmissionDetailById(params: { id: string }): Promise<GetSubmissionDetailByIdResponse['submissionDetail']> {
    const { id } = params;
    const [err, response] = await to(
      Helper.GraphQLRequest({
        query: `
        query mySubmissionDetail($id: ID!) {
          submissionDetail(submissionId: $id) {
            id
            code
            runtime
            memory
            rawMemory
            statusDisplay
            timestamp
            lang
            passedTestCaseCnt
            totalTestCaseCnt
            sourceUrl
            question {
              titleSlug
              title
              translatedTitle
              questionId
              __typename
            }
            ... on GeneralSubmissionNode {
              outputDetail {
                codeOutput
                expectedOutput
                input
                compileError
                runtimeError
                lastTestcase
                __typename
              }
              __typename
            }
            submissionComment {
              comment
              flagType
              __typename
            }
            __typename
          }
        }

      `,
        variables: {
          id,
        },
      }),
    );
    if (err) {
      throw new ErrorResp({
        code: (err as StatusCodeError).statusCode ?? ERROR_CODE.UNKNOWN_ERROR,
        message: err.message || getErrorCodeMessage(),
      });
    }

    const { submissionDetail } = response as GetSubmissionDetailByIdResponse;
    return submissionDetail;
  }

  @validate((params: [{ titleSlug: string }]) => {
    return typeof params[0]?.titleSlug === 'string' && params[0]?.titleSlug !== '';
  })
  async getQuestionDetailByTitleSlug(params: {
    titleSlug: string;
  }): Promise<GetQuestionDetailByTitleSlugResponse['question']> {
    const { titleSlug } = params;
    const [err, response] = await to(
      Helper.GraphQLRequest({
        query: `
        query questionData($titleSlug: String!) {
          question(titleSlug: $titleSlug) {
            questionId
            questionFrontendId
            categoryTitle
            boundTopicId
            title
            titleSlug
            content
            translatedTitle
            translatedContent
            isPaidOnly
            difficulty
            likes
            dislikes
            isLiked
            similarQuestions
            contributors {
              username
              profileUrl
              avatarUrl
              __typename
            }
            langToValidPlayground
            topicTags {
              name
              slug
              translatedName
              __typename
            }
            companyTagStats
            codeSnippets {
              lang
              langSlug
              code
              __typename
            }
            stats
            hints
            solution {
              id
              canSeeDetail
              __typename
            }
            status
            sampleTestCase
            metaData
            judgerAvailable
            judgeType
            mysqlSchemas
            enableRunCode
            envInfo
            book {
              id
              bookName
              pressName
              source
              shortDescription
              fullDescription
              bookImgUrl
              pressImgUrl
              productUrl
              __typename
            }
            isSubscribed
            isDailyQuestion
            dailyRecordStatus
            editorType
            ugcQuestionId
            style
            exampleTestcases
            __typename
          }
        }
      `,
        variables: {
          titleSlug,
        },
      }),
    );
    if (err) {
      throw new ErrorResp({
        code: (err as StatusCodeError).statusCode ?? ERROR_CODE.UNKNOWN_ERROR,
        message: err.message || getErrorCodeMessage(),
      });
    }

    const { question } = response as GetQuestionDetailByTitleSlugResponse;
    return question;
  }

  @validate(
    (params: [{ limit: number; noteType: 'COMMON_QUESTION'; skip: number; targetId: string }]) =>
      typeof params[0]?.targetId === 'string' && params[0].targetId !== '',
  )
  async getNotesByQuestionId(params: {
    limit: number;
    noteType: 'COMMON_QUESTION';
    skip: number;
    targetId: string;
  }): Promise<GetNotesByQuestionIdResponse['noteOneTargetCommonNote']> {
    const { limit = 0, noteType = 'COMMON_QUESTION', skip = 0, targetId = '' } = params;
    const [err, response] = await to(
      Helper.GraphQLRequest({
        query: `
        query noteOneTargetCommonNote($noteType: NoteCommonTypeEnum!, $targetId: String!, $limit: Int = 10, $skip: Int = 0) {
          noteOneTargetCommonNote(noteType: $noteType, targetId: $targetId, limit: $limit, skip: $skip) {
            count
            userNotes {
              config
              content
              id
              noteType
              status
              summary
              targetId
              updatedAt
              __typename
            }
            __typename
          }
        }
      `,
        variables: {
          limit,
          noteType,
          skip,
          targetId,
        },
      }),
    );
    if (err) {
      throw new ErrorResp({
        code: (err as StatusCodeError).statusCode ?? ERROR_CODE.UNKNOWN_ERROR,
        message: err.message || getErrorCodeMessage(),
      });
    }

    const { noteOneTargetCommonNote } = response as GetNotesByQuestionIdResponse;
    return noteOneTargetCommonNote;
  }

  async getNotes(params: {
    aggregateType: 'QUESTION_NOTE';
    limit: number;
    orderBy: SortOrder;
    skip: number;
  }): Promise<GetNotesResponse['noteAggregateNote']> {
    const { limit = 0, aggregateType = 'QUESTION_NOTE', skip = 0, orderBy = 'DESCENDING' } = params;
    const [err, response] = await to(
      Helper.GraphQLRequest({
        query: `
        query noteAggregateNote($aggregateType: AggregateNoteEnum!, $keyword: String, $orderBy: AggregateNoteSortingOrderEnum, $limit: Int = 100, $skip: Int = 0) {
          noteAggregateNote(aggregateType: $aggregateType, keyword: $keyword, orderBy: $orderBy, limit: $limit, skip: $skip) {
            count
            userNotes {
              config
              content
              id
              noteType
              status
              summary
              targetId
              updatedAt
              ... on NoteAggregateLeetbookNoteNode {
                notePage {
                  bookTitle
                  coverImg
                  linkTemplate
                  parentTitle
                  title
                  __typename
                }
                __typename
              }
              ... on NoteAggregateQuestionNoteNode {
                noteQuestion {
                  linkTemplate
                  questionFrontendId
                  questionId
                  title
                  translatedTitle
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
        }
      `,
        variables: {
          limit,
          aggregateType,
          skip,
          orderBy,
        },
      }),
    );
    if (err) {
      throw new ErrorResp({
        code: (err as StatusCodeError).statusCode ?? ERROR_CODE.UNKNOWN_ERROR,
        message: err.message || getErrorCodeMessage(),
      });
    }

    const { noteAggregateNote } = response as GetNotesResponse;
    return noteAggregateNote;
  }

  async getUserStatus(): Promise<GetUserStatusResponse['userStatus']> {
    const [err, response] = await to(
      Helper.GraphQLRequest({
        query: `
        query userStatusGlobal {
          userStatus {
            isSignedIn
            isAdmin
            isStaff
            isSuperuser
            isTranslator
            isVerified
            isPhoneVerified
            isWechatVerified
            checkedInToday
            username
            realName
            userSlug
            groups
            avatar
            optedIn
            requestRegion
            region
            socketToken
            activeSessionId
            permissions
            completedFeatureGuides
            useTranslation
            accountStatus {
              isFrozen
              inactiveAfter
              __typename
            }
            __typename
          }
        }

      `,
        variables: {},
      }),
    );
    if (err) {
      throw new ErrorResp({
        code: (err as StatusCodeError).statusCode ?? ERROR_CODE.UNKNOWN_ERROR,
        message: err.message || getErrorCodeMessage(),
      });
    }

    const { userStatus } = response as GetUserStatusResponse;
    return userStatus;
  }
}

export default Leetcode;
