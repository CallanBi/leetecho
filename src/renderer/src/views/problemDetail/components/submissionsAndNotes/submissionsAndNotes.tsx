/* eslint-disable indent */
import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { UseQueryOptions, UseQueryResult } from 'react-query';
import { useGetNotesByQuestionId, useGetSubmissionDetailById } from '@/rendererApi/problem';
import { Question, SubmissionList } from 'src/main/api/leetcodeApi/utils/interfaces';

import { Descriptions, Typography } from 'antd';
import { COLOR_PALETTE } from 'src/const/theme/color';
import ContentSkeleton from '@/components/contentSkeleton';
import MarkdownEditor from '@/components/markdownEditor';
import ErrorIllustrator from '@/components/illustration/errorIllustrator';
import Empty from '@/components/illustration/empty';

const { Title } = Typography;

const { useRef, useState, useEffect, useMemo } = React;

interface SubmissionsAndNotesProps {
  getQuestionQuery: UseQueryResult<Question, Error>;
  getSubmissionsQuery: UseQueryResult<SubmissionList, Error>;
  width?: string;
}

const SubmissionsAndNotesSection = styled.section`
  padding: 12px;
  height: calc(100% - 2px);
  overflow-y: auto;
`;

const SubmissionsSection = styled.section``;

const NotesSection = styled.section``;

const SubmissionsAndNotes: React.FC<SubmissionsAndNotesProps> = (props: SubmissionsAndNotesProps) => {
  const {
    getQuestionQuery: {
      data: getQuestionQueryData = { questionId: undefined } as Partial<UseQueryResult<Question, Error>['data']>,
      isLoading: getQuestionQueryIsLoading,
    },
    getSubmissionsQuery,
    width = '',
  } = props;

  const { questionId = '' } = getQuestionQueryData || {};

  /**-------- getNotesQuery -------- */

  const [requestParams, setRequestParams] = useState<{
    enableRequest: boolean;
  }>({
    enableRequest: questionId !== '',
  });

  const onRequestSuccess = () => {
    if (requestParams.enableRequest) {
      setRequestParams({ ...requestParams, enableRequest: false });
    }
  };

  const onRequestError = () => {
    if (requestParams.enableRequest) {
      setRequestParams({ ...requestParams, enableRequest: false });
    }
  };

  const queryArgs: GetNotesByQuestionIdReq = {
    questionId: Number(questionId),
  };

  const queryOptions: Omit<UseQueryOptions<GetNotesByQuestionIdResp['data'], Error>, 'queryKey' | 'queryFn'> = {
    enabled: requestParams.enableRequest,
    onSuccess: onRequestSuccess,
    onError: onRequestError,
  };

  const getNotesByQuestionIdQuery = useGetNotesByQuestionId(queryArgs, queryOptions);

  /**-------- getSubmissionDetailByIdQuery -------- */

  const latestAcceptedSubmissionId =
    getSubmissionsQuery?.data?.submissions?.find((e) => e.statusDisplay === 'Accepted')?.id || undefined;

  const [getSubmissionDetailByIdParams, setGetSubmissionDetailByIdParams] = useState<{
    enableRequest: boolean;
  }>({
    enableRequest: latestAcceptedSubmissionId !== undefined,
  });

  const onGetSubmissionDetailByIdSuccess = () => {
    if (getSubmissionDetailByIdParams.enableRequest) {
      setGetSubmissionDetailByIdParams({ ...getSubmissionDetailByIdParams, enableRequest: false });
    }
  };

  const onGetSubmissionDetailByIdError = () => {
    if (getSubmissionDetailByIdParams.enableRequest) {
      setGetSubmissionDetailByIdParams({ ...getSubmissionDetailByIdParams, enableRequest: false });
    }
  };

  const getSubmissionDetailByIdQueryArgs: GetSubmissionDetailByIdReq = {
    id: latestAcceptedSubmissionId || '',
  };

  const getSubmissionDetailByIdQueryOptions: Omit<
    UseQueryOptions<GetSubmissionDetailByIdResp['data'], Error>,
    'queryKey' | 'queryFn'
  > = {
    enabled: getSubmissionDetailByIdParams.enableRequest,
    onSuccess: onGetSubmissionDetailByIdSuccess,
    onError: onGetSubmissionDetailByIdError,
  };

  const getSubmissionDetailByIdQuery = useGetSubmissionDetailById(
    getSubmissionDetailByIdQueryArgs,
    getSubmissionDetailByIdQueryOptions,
  );

  if (questionId !== '') {
    if (getNotesByQuestionIdQuery.status === 'idle') {
      setRequestParams({
        ...requestParams,
        enableRequest: true,
      });
    }
  }

  if (latestAcceptedSubmissionId !== undefined) {
    if (getSubmissionDetailByIdQuery.status === 'idle') {
      setGetSubmissionDetailByIdParams({
        ...getSubmissionDetailByIdParams,
        enableRequest: true,
      });
    }
  }

  const {
    code = '',
    memory = '',
    runtime = '',
    lang = '',
    timestamp = undefined,
    passedTestCaseCnt = 0,
    totalTestCaseCnt = 0,
  } = getSubmissionDetailByIdQuery?.data || {};

  const renderNotes = () => {
    if (getNotesByQuestionIdQuery?.data?.userNotes?.length === 0) {
      return <Empty title="未找到笔记"></Empty>;
    }
    return getNotesByQuestionIdQuery?.data?.userNotes?.map((e) => {
      return <MarkdownEditor key={e.id} value={e?.content} isReadOnly={true}></MarkdownEditor>;
    });
  };

  return (
    <SubmissionsAndNotesSection style={{ width: width }}>
      {(getQuestionQueryIsLoading || getSubmissionDetailByIdQuery.isLoading) && (
        <ContentSkeleton style={{ padding: 12 }}></ContentSkeleton>
      )}
      {getQuestionQueryData?.status === 'ac' &&
        (getNotesByQuestionIdQuery.isSuccess || getNotesByQuestionIdQuery.isFetched) && (
          <SubmissionsSection>
            <Title level={3}>最近一次 AC 的代码</Title>
            {latestAcceptedSubmissionId === undefined && (
              <ErrorIllustrator desc="未找到最近 AC 的代码，麻烦提一下 issue 与开发者反馈"></ErrorIllustrator>
            )}
            {getSubmissionDetailByIdQuery.isSuccess && (
              <>
                <Descriptions bordered column={2}>
                  <Descriptions.Item label="执行用时">{runtime}</Descriptions.Item>
                  <Descriptions.Item label="语言">{lang}</Descriptions.Item>
                  <Descriptions.Item label="内存消耗">{memory}</Descriptions.Item>
                  <Descriptions.Item label="提交时间">{timestamp}</Descriptions.Item>
                  <Descriptions.Item label="总测试用例">{totalTestCaseCnt}</Descriptions.Item>
                  <Descriptions.Item label="通过的测试用例">{passedTestCaseCnt}</Descriptions.Item>
                </Descriptions>
                <MarkdownEditor value={`\`\`\`${lang}\n\n${code}\n\n\`\`\``} isReadOnly={true}></MarkdownEditor>
              </>
            )}
          </SubmissionsSection>
        )}
      {(getQuestionQueryIsLoading || getNotesByQuestionIdQuery.isLoading) && (
        <ContentSkeleton style={{ padding: 12, maxHeight: 400, overflow: 'hidden' }} />
      )}
      {(getNotesByQuestionIdQuery.isSuccess || getNotesByQuestionIdQuery.isFetched) && (
        <>
          <Title level={3}>我的笔记</Title>
          <NotesSection>{renderNotes()}</NotesSection>
        </>
      )}
      {getNotesByQuestionIdQuery.isError && <ErrorIllustrator></ErrorIllustrator>}
    </SubmissionsAndNotesSection>
  );
};

export default SubmissionsAndNotes;
