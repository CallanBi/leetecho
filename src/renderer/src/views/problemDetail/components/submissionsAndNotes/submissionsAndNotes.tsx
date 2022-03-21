/* eslint-disable indent */
import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { UseQueryOptions, UseQueryResult } from 'react-query';
import { useGetNotesByQuestionId, useGetSubmissionDetailById } from '@/rendererApi/problem';
import { Question, SubmissionList } from 'src/main/services/leetcodeServices/utils/interfaces';

import { Descriptions, Pagination, Typography } from 'antd';
import { COLOR_PALETTE } from 'src/const/theme/color';
import ContentSkeleton from '@/components/contentSkeleton';
import MarkdownEditor from '@/components/markdownEditor';
import ErrorIllustrator from '@/components/illustration/errorIllustrator';
import Empty from '@/components/illustration/empty';
import { formatTimeStamp } from 'src/main/tools';

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

  const [notePagination, setNotePagination] = useState<{
    cur: number;
    total: number;
    pageSize: number;
    curPageData: GetNotesByQuestionIdResp['data']['userNotes'];
  }>({
    cur: 1,
    total: getNotesByQuestionIdQuery?.data?.count || 0,
    pageSize: 5,
    curPageData: getNotesByQuestionIdQuery?.data?.userNotes?.slice(0, 5) || [],
  });

  const notePaginationChange = (cur: number) => {
    setNotePagination({
      ...notePagination,
      cur,
      curPageData:
        getNotesByQuestionIdQuery?.data?.userNotes?.slice(
          (cur - 1) * notePagination.pageSize,
          cur * notePagination.pageSize,
        ) || [],
    });
  };

  if (getNotesByQuestionIdQuery.status === 'success' && getNotesByQuestionIdQuery.data.userNotes.length > 0) {
    if (notePagination.curPageData.length === 0) {
      setNotePagination({
        ...notePagination,
        cur: 1,
        curPageData: getNotesByQuestionIdQuery?.data?.userNotes?.slice(0, 5) || [],
        total: getNotesByQuestionIdQuery?.data?.count || 0,
        pageSize: 5,
      });
    }
  }

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
                <Descriptions.Item label="提交时间">
                  {typeof timestamp === 'number' ? formatTimeStamp(timestamp) : ''}
                </Descriptions.Item>
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
          <NotesSection>
            {getNotesByQuestionIdQuery?.data?.userNotes?.length === 0 && <Empty title="未找到笔记"></Empty>}
            {getNotesByQuestionIdQuery?.data?.userNotes?.length > 0 && (
              <>
                {notePagination?.curPageData?.map((e) => {
                  return <MarkdownEditor key={e.id} value={e?.content} isReadOnly={true}></MarkdownEditor>;
                })}
                {notePagination?.curPageData?.length > 1 && (
                  <section style={{
                    display: 'flex',
                    flexDirection: 'row-reverse',
                  }}>
                    <Pagination
                      total={notePagination.total}
                      pageSize={notePagination.pageSize}
                      current={notePagination.cur}
                      onChange={notePaginationChange}
                      style={{
                      }}
                    ></Pagination>
                  </section>
                )}
              </>
            )}
          </NotesSection>
        </>
      )}
      {getNotesByQuestionIdQuery.isError && <ErrorIllustrator></ErrorIllustrator>}
    </SubmissionsAndNotesSection>
  );
};

export default SubmissionsAndNotes;
