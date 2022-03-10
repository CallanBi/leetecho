import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { UseQueryOptions, UseQueryResult } from 'react-query';
import { useGetNotesByQuestionId, useGetSubmissionDetailById } from '@/rendererApi/problem';
import { Question, SubmissionList } from 'src/main/api/leetcodeApi/utils/interfaces';

import { Descriptions, Typography } from 'antd';
import { COLOR_PALETTE } from 'src/const/theme/color';
import ContentSkeleton from '@/components/contentSkeleton';

const { Title } = Typography;

const { useRef, useState, useEffect, useMemo } = React;

interface SubmissionsAndNotesProps {
  getQuestionQuery: UseQueryResult<Question, Error>;
  getSubmissionsQuery: UseQueryResult<SubmissionList, Error>;
}

const SubmissionsAndNotesSection = styled.section`
  padding: 12px;
  height: calc(100% - 2px);
  overflow-y: auto;
`;

const SubmissionsSection = styled.section``;

const NotesSection = styled.section``;

const SubmissionsAndNotes: React.FC<SubmissionsAndNotesProps> = (props: SubmissionsAndNotesProps) => {
  const { getQuestionQuery, getSubmissionsQuery } = props;

  console.log('%c getQuestionQuery?.data >>>', 'background: yellow; color: blue', getQuestionQuery?.data);

  /**-------- getNotesQuery -------- */

  const [requestParams, setRequestParams] = useState<{
    enableRequest: boolean;
  }>({
    enableRequest: getQuestionQuery?.data?.questionId !== undefined,
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
    questionId: Number(getQuestionQuery?.data?.questionId),
  };

  const queryOptions: Omit<UseQueryOptions<GetNotesByQuestionIdResp['data'], Error>, 'queryKey' | 'queryFn'> = {
    enabled: requestParams.enableRequest,
    onSuccess: onRequestSuccess,
    onError: onRequestError,
  };

  const getNotesByQuestionIdQuery = useGetNotesByQuestionId(queryArgs, queryOptions);

  console.log('%c getNotesByQuestionIdQuery >>>', 'background: yellow; color: blue', getNotesByQuestionIdQuery);

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
    id: latestAcceptedSubmissionId,
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

  console.log('%c getSubmissionDetailByIdQuery >>>', 'background: yellow; color: blue', getSubmissionDetailByIdQuery);

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
      return <>暂无笔记</>;
    }
    return getNotesByQuestionIdQuery?.data?.userNotes?.map((e) => (
      <pre
        key={e.id}
        style={{
          background: COLOR_PALETTE.LEETECHO_INPUT_BACKGROUND,
          padding: 24,
          marginTop: 24,
          marginBottom: 24,
        }}
      >
        {e?.content || ''}
      </pre>
    ));
  };

  return (
    <SubmissionsAndNotesSection>
      {getSubmissionDetailByIdQuery.isLoading && <ContentSkeleton style={{ padding: 12 }}></ContentSkeleton>}
      {getQuestionQuery?.data?.status === 'ac' && getSubmissionDetailByIdQuery.isSuccess && (
        <SubmissionsSection>
          <Title level={4}>最近一次 AC 的代码</Title>
          <Descriptions bordered column={2}>
            <Descriptions.Item label="执行用时">{runtime}</Descriptions.Item>
            <Descriptions.Item label="语言">{lang}</Descriptions.Item>
            <Descriptions.Item label="内存消耗">{memory}</Descriptions.Item>
            <Descriptions.Item label="提交时间">{timestamp}</Descriptions.Item>
            <Descriptions.Item label="总测试用例">{totalTestCaseCnt}</Descriptions.Item>
            <Descriptions.Item label="通过的测试用例">{passedTestCaseCnt}</Descriptions.Item>
          </Descriptions>
          {/**TODO: support syntax highlight */}
          <pre
            style={{
              background: COLOR_PALETTE.LEETECHO_INPUT_BACKGROUND,
              padding: 24,
              marginTop: 24,
              marginBottom: 24,
            }}
          >
            {code}
          </pre>
        </SubmissionsSection>
      )}
      <Title level={4}>我的笔记</Title>
      {getNotesByQuestionIdQuery.isSuccess && <NotesSection>{renderNotes()}</NotesSection>}
    </SubmissionsAndNotesSection>
  );
};

export default SubmissionsAndNotes;
