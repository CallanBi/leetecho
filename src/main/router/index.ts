import to from 'await-to-js';
import path from 'path';
import { app, ipcMain } from 'electron';
import fileTools from '../tools/file/file';
import ApiBridge from '../middleware/apiBridge';
import baseHandler, { ErrorResp, SuccessResp } from '../middleware/apiBridge/base';
import {
  CreateTemplateRequest,
  CreateTemplateResponse,
  ReadUserTemplateRequest,
  ReadUserTemplateResponse,
  SaveTemplateRequest,
  SaveTemplateResponse,
} from '../idl/io';
import {
  GetAllProblemsResponse,
  GetNotesByQuestionIdRequest,
  GetProblemResponse,
  GetProblemsRequest,
  GetProblemsResponse,
  GetQuestionDetailByTitleSlugRequest,
  GetSubmissionDetailByIdRequest,
  GetSubmissionsByQuestionSlugRequest,
  GetSubmissionsByQuestionSlugResponse,
} from '../idl/problems';
import { GetAllTagsResponse } from '../idl/tags';
import { CheckRepoConnectionRequest, LoginReq, LoginResp, LogoutResp } from '../idl/user';
import ERROR_CODE, { getErrorCodeMessage } from './errorCode';
import {
  Difficulty,
  GetNotesByQuestionIdResponse,
  GetUserProgressResponse,
  GetUserStatusResponse,
  Question,
} from '../services/leetcodeServices/utils/interfaces';
import { formatLeetechoSyntax, formatTimeStamp, parseJsonRecursively } from '../tools';
import {
  concurrencyController,
  getAllUserProfileSuccessQuestions,
  getQuestionAllInfoByTitleSlug,
  GetQuestionAllInfoByTitleSlugResponse,
  // sleep,
} from '../services/publishServices/publishServices';

import store from '../electronStore/electronStore';

import Handlebars from 'handlebars';

import { format } from 'date-fns';

import he from 'he';
import RepoDeploy from '../services/repoDeployServices/repoDeployServices';

const isDev = process.env.NODE_ENV === 'development';

export type EndPoint = 'CN' | 'US';

export type User = {
  usrName: string;
  pwd: string;
  endPoint: EndPoint;
  localFileFolderPath?: string;
  appSettings: Partial<{
    repoName: string;
    branch: string;
    userName: string;
    email: string;
    token: string; // 令牌
  }>;
};

export type UserGroup = {
  CN: User[];
  US: User[];
};

export type UserConfig = {
  users: UserGroup;
  lastLoginUser: {
    // 最后一次登录的用户
    usrName?: string;
    endPoint?: EndPoint;
    appSettings?: Partial<{
      repoName: string;
      branch: string;
      userName: string;
      email: string;
      token: string; // 令牌
    }>;
  };
  isUserRemembered: boolean; // 是否勾选'记住我'
};

Handlebars.registerHelper('ifCN', function (endPoint, options) {
  if (endPoint === 'CN') {
    return options.fn();
  } else {
    return '';
  }
});

let apiBridge: ApiBridge | null = null;

/** V8's serialization algorithm does not include custom properties on errors, see: https://github.com/electron/electron/issues/24427 */
export const transformCustomErrorToMsg: (err: Error | ErrorResp) => string = (err) =>
  `${(err as ErrorResp).code ?? ERROR_CODE.UNKNOWN_ERROR} ${err.message ?? getErrorCodeMessage()}`;

ipcMain.handle('login', async (_, params: LoginReq) => {
  const [err, res] = await to(baseHandler(ApiBridge.login(params)));

  if (err) {
    throw new Error(transformCustomErrorToMsg(err));
  }

  apiBridge = res?.data ?? null;
  return {
    code: res?.code ?? ERROR_CODE.OK,
    data: {},
  } as LoginResp;
});

ipcMain.handle('logout', async () => {
  if (!apiBridge) {
    return {
      code: ERROR_CODE.OK,
      data: {},
    };
  }

  apiBridge = null;

  return {
    code: ERROR_CODE.OK,
    data: {},
  } as LogoutResp;
});

ipcMain.handle('getAllProblems', async () => {
  if (!apiBridge) {
    throw new ErrorResp({ code: ERROR_CODE.NOT_LOGIN });
  }

  const [err, res] = await to(baseHandler(apiBridge.getAllProblems()));

  if (err) {
    throw new Error(transformCustomErrorToMsg(err));
  }

  return {
    code: res?.code ?? ERROR_CODE.OK,
    data: res?.data ?? {},
  } as GetAllProblemsResponse;
});

ipcMain.handle('getAllTags', async () => {
  if (!apiBridge) {
    throw new ErrorResp({ code: ERROR_CODE.NOT_LOGIN });
  }

  const [err, res] = await to(baseHandler(apiBridge.getAllTags()));

  if (err) {
    throw new Error(transformCustomErrorToMsg(err));
  }

  return {
    code: res?.code ?? ERROR_CODE.OK,
    data: res?.data ?? {},
  } as GetAllTagsResponse;
});

ipcMain.handle('getProblems', async (_, params: GetProblemsRequest) => {
  if (!apiBridge) {
    throw new ErrorResp({ code: ERROR_CODE.NOT_LOGIN });
  }
  const [err, res] = await to(baseHandler(apiBridge.getProblems(params)));

  if (err) {
    throw new Error(transformCustomErrorToMsg(err));
  }
  return {
    code: res?.code ?? ERROR_CODE.OK,
    data: res?.data ?? {},
  } as GetProblemsResponse;
});

ipcMain.handle('getProblem', async (_, params: GetQuestionDetailByTitleSlugRequest) => {
  if (!apiBridge) {
    throw new ErrorResp({ code: ERROR_CODE.NOT_LOGIN });
  }
  const [err, res] = await to(baseHandler(apiBridge.getProblem(params)));

  if (err) {
    throw new Error(transformCustomErrorToMsg(err));
  }
  return {
    code: res?.code ?? ERROR_CODE.OK,
    data: res?.data ?? {},
  } as GetProblemResponse;
});

ipcMain.handle('getSubmissionsByTitleSlug', async (_, params: GetSubmissionsByQuestionSlugRequest) => {
  if (!apiBridge) {
    throw new ErrorResp({ code: ERROR_CODE.NOT_LOGIN });
  }
  const [err, res] = await to(baseHandler(apiBridge.getSubmissionsByTitleSlug(params)));

  if (err) {
    throw new Error(transformCustomErrorToMsg(err));
  }
  return {
    code: res?.code ?? ERROR_CODE.OK,
    data: res?.data ?? {},
  } as GetSubmissionsByQuestionSlugResponse;
});

ipcMain.handle('getNotesByQuestionId', async (_, params: GetNotesByQuestionIdRequest) => {
  if (!apiBridge) {
    throw new ErrorResp({ code: ERROR_CODE.NOT_LOGIN });
  }
  const [err, res] = await to(baseHandler(apiBridge.getNotesByQuestionId(params)));

  if (err) {
    throw new Error(transformCustomErrorToMsg(err));
  }
  return {
    code: res?.code ?? ERROR_CODE.OK,
    data: res?.data ?? {},
  } as SuccessResp<GetNotesByQuestionIdResponse>;
});

ipcMain.handle('getSubmissionDetailById', async (_, params: GetSubmissionDetailByIdRequest) => {
  if (!apiBridge) {
    throw new ErrorResp({ code: ERROR_CODE.NOT_LOGIN });
  }
  const [err, res] = await to(baseHandler(apiBridge.getSubmissionDetailById(params)));

  if (err) {
    throw new Error(transformCustomErrorToMsg(err));
  }
  return {
    code: res?.code ?? ERROR_CODE.OK,
    data: res?.data ?? {},
  } as SuccessResp<GetNotesByQuestionIdResponse>;
});

ipcMain.handle('getUserStatus', async () => {
  if (!apiBridge) {
    throw new ErrorResp({ code: ERROR_CODE.NOT_LOGIN });
  }
  const [err, res] = await to(baseHandler(apiBridge.getUserStatus()));

  if (err) {
    throw new Error(transformCustomErrorToMsg(err));
  }
  return {
    code: res?.code ?? ERROR_CODE.OK,
    data: res?.data ?? {},
  } as SuccessResp<GetUserStatusResponse['userStatus']>;
});

ipcMain.handle('readUserTemplate', async (_, params: ReadUserTemplateRequest) => {
  const {
    userInfo: { usrName = '', endPoint = 'CN' },
  } = params;

  const delimiter = path.sep;

  const templatePath = `${app.getPath(
    'documents',
  )}${delimiter}Leetecho Files${delimiter}${endPoint}${delimiter}${usrName}`;

  const coverTemplate = fileTools.readFile(`${templatePath}/coverTemplate.md`);
  const problemTemplate = fileTools.readFile(`${templatePath}/problemTemplate.md`);

  const res = [
    {
      fileNameWithFileType: 'coverTemplate.md',
      content: coverTemplate,
    },
    {
      fileNameWithFileType: 'problemTemplate.md',
      content: problemTemplate,
    },
  ];

  return {
    code: ERROR_CODE.OK,
    data: res,
  } as SuccessResp<ReadUserTemplateResponse>;
});

ipcMain.handle('createTemplate', async (_, params: CreateTemplateRequest) => {
  const {
    userInfo: { usrName = '', endPoint = 'CN' },
  } = params;

  const delimiter = path.sep;

  const templatePath = `${app.getPath(
    'documents',
  )}${delimiter}Leetecho Files${delimiter}${endPoint}${delimiter}${usrName}`;

  const [_importTemplateErr, res] = await to(
    Promise.all([
      import('../../../assets/defaultTemplates/coverTemplate.md'),
      import('../../../assets/defaultTemplates/problemTemplate.md'),
    ]),
  );

  const coverTemplateModule = res?.[0] || { default: '' };
  const problemTemplateModule = res?.[1] || { default: '' };

  const coverTemplateContent = coverTemplateModule.default;
  const problemTemplateContent = problemTemplateModule.default;

  fileTools.createFilesInDir(templatePath, [
    {
      fileNameWithFileType: 'coverTemplate.md',
      content: coverTemplateContent as string,
    },
    {
      fileNameWithFileType: 'problemTemplate.md',
      content: problemTemplateContent as string,
    },
  ]);

  return {
    code: ERROR_CODE.OK,
    data: {},
  } as SuccessResp<CreateTemplateResponse>;
});

ipcMain.handle('saveTemplate', async (_, params: SaveTemplateRequest) => {
  const {
    userInfo: { usrName = '', endPoint = 'CN' },
    type,
    content,
  } = params;

  const delimiter = path.sep;

  const templatePath = `${app.getPath(
    'documents',
  )}${delimiter}Leetecho Files${delimiter}${endPoint}${delimiter}${usrName}${delimiter}${type}Template.md`;

  fileTools.writeFile(templatePath, content);

  return {
    code: ERROR_CODE.OK,
    data: {},
  } as SuccessResp<SaveTemplateResponse>;
});

ipcMain.handle('getDefaultTemplates', async (_) => {
  const [importTemplateErr, res] = await to(
    Promise.all([
      import('../../../assets/defaultTemplates/coverTemplate.md'),
      import('../../../assets/defaultTemplates/problemTemplate.md'),
    ]),
  );

  if (importTemplateErr) {
    throw new Error(transformCustomErrorToMsg(importTemplateErr));
  }

  const coverTemplateModule = res?.[0] || { default: '' };
  const problemTemplateModule = res?.[1] || { default: '' };

  const coverTemplateContent = coverTemplateModule.default;
  const problemTemplateContent = problemTemplateModule.default;

  return {
    code: ERROR_CODE.OK,
    data: {
      coverTemplateContent,
      problemTemplateContent,
    },
  } as SuccessResp<{
    coverTemplateContent: typeof import('*.md');
    problemTemplateContent: typeof import('*.md');
  }>;
});

ipcMain.handle('checkRepoConnection', async (_, params: CheckRepoConnectionRequest) => {
  const { userName = '', repoName = '', token = '', email = '', branch = 'main' } = params;

  RepoDeploy.deleteInstance();

  const outputPath = `${app.getPath('documents')}${path.sep}Leetecho Files${path.sep}CN${path.sep}${userName}${
    path.sep
  }outputs`;

  const deployTool = RepoDeploy.init({
    outputDir: outputPath,
    settings: {
      token,
      email,
      branch,
      userName,
      repoName,
    },
  });

  const [checkRepoConnectionErr, _checkRepoConnectionRes] = await to(deployTool.checkRepoConnection());

  if (checkRepoConnectionErr) {
    throw new Error(transformCustomErrorToMsg(checkRepoConnectionErr));
  }

  return {
    code: ERROR_CODE.OK,
    data: {},
  } as SuccessResp<Record<string, never>>;
});

ipcMain.handle(
  'publish',
  async (
    _,
    params: {
      userSlug: string;
      userName: string;
      endPoint: 'CN' | 'US';
    },
  ) => {
    if (!apiBridge) {
      throw new Error(transformCustomErrorToMsg(new ErrorResp({ code: ERROR_CODE.NOT_LOGIN })));
    }

    const userConfig = parseJsonRecursively(store.get('userConfig') as UserConfig) as UserConfig;


    if (!userConfig) {
      throw new Error(
        transformCustomErrorToMsg(new ErrorResp({ code: ERROR_CODE.NO_USER_CONFIG, message: 'user config not found' })),
      );
    }

    const { userSlug = '', userName = '', endPoint = 'CN' } = params;


    const thisUserConfig = userConfig?.lastLoginUser;


    if (!thisUserConfig) {
      throw new Error(
        transformCustomErrorToMsg(new ErrorResp({ code: ERROR_CODE.NO_USER_CONFIG, message: 'user config not found' })),
      );
    }

    const outputPath = `${app.getPath('documents')}${path.sep}Leetecho Files${path.sep}CN${path.sep}${userName}${
      path.sep
    }outputs`;

    RepoDeploy.deleteInstance();

    const deployTool = RepoDeploy.init({
      outputDir: outputPath,
      settings: {
        userName: thisUserConfig?.appSettings?.userName || '',
        repoName: thisUserConfig?.appSettings?.repoName || '',
        token: thisUserConfig?.appSettings?.token || '',
        email: thisUserConfig?.appSettings?.email || '',
        branch: thisUserConfig?.appSettings?.branch || 'main',
      },
    });

    const [checkRepoConnectionErr, _checkRepoConnectionRes] = await to(deployTool.checkRepoConnection());

    if (checkRepoConnectionErr) {
      throw new Error(transformCustomErrorToMsg(checkRepoConnectionErr));
    }

    const userCoverTemplateVariables: {
      [key: string]: any;
    } = {};

    fileTools.mkdirPath(`${outputPath}${path.sep}imgs`);

    fileTools.mkdirPath(`${outputPath}${path.sep}problems`);

    fileTools.copyFiles(
      isDev
        ? path.join(__dirname, '../../assets/defaultTemplates/imgs')
        : path.join(process.resourcesPath, 'assets', 'defaultTemplates', 'imgs'),
      `${outputPath}${path.sep}imgs`,
    );

    const [getUserProgressErr, getUserProgressRes] = (await to(apiBridge.getUserProgress({ userSlug }))) as [
      null | ErrorResp,
      GetUserProgressResponse,
    ];

    if (getUserProgressErr) {
      throw new Error(transformCustomErrorToMsg(getUserProgressErr));
    }

    const profile: {
      numSolved: number;
      numTotal: number;
      acEasy: number;
      acMedium: number;
      acHard: number;
      userName: string;
      endPoint: 'CN';
    } = {
      numSolved:
        getUserProgressRes?.userProfileUserQuestionProgress?.numAcceptedQuestions?.reduce?.((acc, cur) => {
          const { count = 0 } = cur;
          return acc + count;
        }, 0) || 0,
      numTotal:
        Object.entries(getUserProgressRes?.userProfileUserQuestionProgress)?.reduce?.((acc, [_, v]) => {
          return (
            (
              v as Array<{
                difficulty: Difficulty;
                count: number;
              }>
            ).reduce((innerAcc, innerCur) => {
              const { count = 0 } = innerCur;
              return innerAcc + count;
            }, 0) + acc
          );
        }, 0) || 0,
      acEasy:
        getUserProgressRes?.userProfileUserQuestionProgress?.numAcceptedQuestions?.find((i) => i?.difficulty === 'EASY')
          ?.count || 0,
      acMedium:
        getUserProgressRes?.userProfileUserQuestionProgress?.numAcceptedQuestions?.find(
          (i) => i?.difficulty === 'MEDIUM',
        )?.count || 0,
      acHard:
        getUserProgressRes?.userProfileUserQuestionProgress?.numAcceptedQuestions?.find((i) => i?.difficulty === 'HARD')
          ?.count || 0,
      userName: userSlug,
      endPoint: 'CN',
    };

    userCoverTemplateVariables.profile = profile;

    userCoverTemplateVariables.updateTime = format(new Date(), 'yyyy/MM/dd H:mm');

    let userCover = formatLeetechoSyntax(
      fileTools.readFile(
        `${app.getPath('documents')}${path.sep}Leetecho Files${path.sep}CN${path.sep}${userName}${
          path.sep
        }coverTemplate.md`,
      ),
    );

    const userProblem = formatLeetechoSyntax(
      fileTools.readFile(
        `${app.getPath('documents')}${path.sep}Leetecho Files${path.sep}CN${path.sep}${userName}${
          path.sep
        }problemTemplate.md`,
      ),
    );

    if (!userCover || !userProblem) {
      throw new Error('Template is empty');
    }

    const [getAllUserProfileSuccessQuestionsErr, getAllUserProfileQuestionsRes] = await to(
      getAllUserProfileSuccessQuestions(apiBridge),
    );

    if (getAllUserProfileSuccessQuestionsErr) {
      throw new Error(transformCustomErrorToMsg(getAllUserProfileSuccessQuestionsErr));
    }

    const {
      data: { questions = [] },
    } = getAllUserProfileQuestionsRes;

    userCover = userCover.replace(
      ':allProblems{}',
      questions
        .map(
          (question) =>
            // eslint-disable-next-line max-len
            `| ${question.frontendId ?? (question.questionFrontendId || '')} | [${question.title}](problems/${
              question.titleSlug
            }.md) | [${question.translatedTitle}](problems/${question.titleSlug}) | ![](imgs/${
              question.difficulty
            }.png) | ${formatTimeStamp(question?.lastSubmittedAt ?? 0)}`,
        )
        .join('\n'),
    );

    const handleQuestion = async (q: Question) => {
      const [err, res] = (await to(
        getQuestionAllInfoByTitleSlug({ apiBridge: apiBridge as ApiBridge, titleSlug: q.titleSlug }),
      )) as [null | ErrorResp, SuccessResp<GetQuestionAllInfoByTitleSlugResponse>];
      if (err) {
        throw new Error(transformCustomErrorToMsg(err));
      }

      const { data } = res;
      const mergedData = { ...q, ...data };
      const userProblemTemp = Handlebars.compile(userProblem);
      const problemContent = he.decode(userProblemTemp(mergedData) || '');
      fileTools.createFilesInDirForced(path.join(outputPath, 'problems'), [
        {
          fileNameWithFileType: `${mergedData.titleSlug}.md`,
          content: problemContent,
        },
      ]);
    };

    const [err, _allQuestionInfoRes] = await to(
      concurrencyController({
        requestFunc: handleQuestion,
        params: questions,
        concurrency: 3,
      }),
    );

    if (err) {
      throw new Error(transformCustomErrorToMsg(err));
    }

    const handleBarCoverTemplate = Handlebars.compile(userCover);

    const coverContent = handleBarCoverTemplate(userCoverTemplateVariables);

    fileTools.createFilesInDirForced(outputPath, [
      {
        fileNameWithFileType: 'readme.md',
        content: coverContent,
      },
    ]);

    const [pushErr, _pushRes] = await to(deployTool.push());

    if (pushErr) {
      throw new Error(transformCustomErrorToMsg(pushErr));
    }

    return {
      code: ERROR_CODE.OK,
      data: {},
    } as SuccessResp<Record<string, never>>;
  },
);
