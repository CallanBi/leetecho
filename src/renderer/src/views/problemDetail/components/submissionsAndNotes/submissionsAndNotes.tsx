/* eslint-disable indent */
import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { UseQueryOptions, UseQueryResult } from 'react-query';
import {
  useAddNote,
  useDeleteNote,
  useGetNotesByQuestionId,
  useGetSubmissionDetailById,
  useUpdateNote,
} from '@/rendererApi/problem';
import {
  AddNoteRequest,
  DeleteNoteRequest,
  GetNotesByQuestionIdResponse,
  Question,
  SubmissionList,
  UserNote,
} from 'src/main/services/leetcodeServices/utils/interfaces';

import { Button, Descriptions, message, Modal, PageHeader, Pagination, Typography } from 'antd';
import { COLOR_PALETTE } from 'src/const/theme/color';
import ContentSkeleton from '@/components/contentSkeleton';
// import MarkdownEditor from '@/components/markdownEditor';
import ErrorIllustrator from '@/components/illustration/errorIllustrator';
import Empty from '@/components/illustration/empty';
import { formatTimeStamp } from 'src/main/tools';
import withSuspend from '@/components/suspendComponent';
import { IconAlertTriangle, IconDelete, IconEdit, IconPlusCircle, IconSave } from '@douyinfe/semi-icons';
import { withSemiIconStyle } from '@/style';
import WrappedLoading from '@/components/illustration/loading/wrappedLoading';

const MarkdownEditor = withSuspend(React.lazy(() => import('@/components/markdownEditor')));

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

const MyNotesHeaderExtraSection = styled.section``;

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

  const onRequestSuccess = (res: SuccessResp<GetNotesByQuestionIdResponse['noteOneTargetCommonNote']>) => {
    if (requestParams.enableRequest) {
      setRequestParams({ ...requestParams, enableRequest: false });
    }
    setNotePagination({
      ...notePagination,
      total: res?.data?.count || 0,
      pageSize: 5,
      curPageData: res?.data?.userNotes?.slice(0, 5) || [],
      isReadOnly: new Array<boolean>(5).fill(true),
    });
    noteContentCache.current = res?.data?.userNotes?.slice(0, 5)?.map((n) => n.content) || [];
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

  const [notePagination, setNotePagination] = useState<{
    cur: number;
    total: number;
    pageSize: number;
    curPageData: UserNote[];
    isReadOnly: Array<boolean>;
  }>({
    cur: 1,
    total: getNotesByQuestionIdQuery?.data?.count || 0,
    pageSize: 5,
    curPageData: getNotesByQuestionIdQuery?.data?.userNotes?.slice(0, 5) || [],
    isReadOnly: new Array<boolean>(5).fill(true),
  });

  const noteContentCache = React.useRef<Array<string>>([]);

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

  const notePaginationChange = (cur: number) => {
    if (notePagination?.isReadOnly?.findIndex((e) => !e) !== -1) {
      message.info('请先保存当前笔记');
      return;
    }
    setNotePagination({
      ...notePagination,
      cur,
      curPageData:
        getNotesByQuestionIdQuery?.data?.userNotes?.slice(
          (cur - 1) * notePagination.pageSize,
          cur * notePagination.pageSize,
        ) || [],
      isReadOnly: new Array<boolean>(notePagination.pageSize).fill(true),
    });
    noteContentCache.current =
      getNotesByQuestionIdQuery?.data?.userNotes
        ?.slice((cur - 1) * notePagination.pageSize, cur * notePagination.pageSize)
        ?.map((n: UserNote) => n?.content || '') || {};
  };

  if (getNotesByQuestionIdQuery.status === 'success' && getNotesByQuestionIdQuery.data.userNotes.length > 0) {
    if (notePagination.curPageData.length === 0) {
      setNotePagination({
        ...notePagination,
        cur: 1,
        curPageData: getNotesByQuestionIdQuery?.data?.userNotes?.slice(0, 5) || [],
        total: getNotesByQuestionIdQuery?.data?.count || 0,
        pageSize: 5,
        isReadOnly: new Array<boolean>(5).fill(true),
      });
      noteContentCache.current =
        getNotesByQuestionIdQuery?.data?.userNotes?.slice(0, 5)?.map((n: UserNote) => n?.content || '') || [];
    }
  }
  /**-------- addNote -------- */

  const addNoteMutation = useAddNote({
    onError: (e) => {
      message.error('添加失败: ' + e?.message || '');
      setRequestParams({
        ...requestParams,
        enableRequest: true,
      });
    },
    onSuccess: (res) => {
      if (res?.ok) {
        message.success('添加成功');
        setRequestParams({
          ...requestParams,
          enableRequest: true,
        });
        setNotePagination({
          ...notePagination,
          isReadOnly: new Array<boolean>(notePagination.pageSize).fill(true),
        });
      } else {
        message.error('添加失败');
        setRequestParams({
          ...requestParams,
          enableRequest: true,
        });
      }
    },
  });

  const { isLoading: isAddNoteLoading } = addNoteMutation;

  const onNoteAdd = (value: string) => {
    addNoteMutation.mutateAsync({
      targetId: questionId,
      content: value,
      noteType: 'COMMON_QUESTION',
      summary: value?.slice(0, 20) || '',
    });
  };

  /**-------- deleteNote -------- */

  const deleteNoteMutation = useDeleteNote({
    onError: (e) => {
      message.error('删除失败: ' + e?.message || '');
      setRequestParams({
        ...requestParams,
        enableRequest: true,
      });
    },
    onSuccess: (res) => {
      if (res?.ok) {
        message.success('删除成功');
        setRequestParams({
          ...requestParams,
          enableRequest: true,
        });
        setNotePagination({
          ...notePagination,
          isReadOnly: new Array<boolean>(notePagination.pageSize).fill(true),
        });
      } else {
        message.error('删除失败');
        setRequestParams({
          ...requestParams,
          enableRequest: true,
        });
      }
    },
  });

  const { isLoading: isDeleteNoteLoading } = deleteNoteMutation;

  const onNoteDelete = (index: number) => {
    Modal.confirm({
      title: null,
      content: '确认删除该笔记吗？',
      okText: '确认',
      icon: (
        <section
          css={css`
            display: flex;
            align-items: bottom;
          `}
        >
          <IconAlertTriangle
            size="extra-large"
            style={withSemiIconStyle({
              color: COLOR_PALETTE.LEETECHO_YELLOW,
            })}
          />
          <Typography.Title
            level={5}
            style={{
              display: 'inline-block',
              marginLeft: '16px',
              top: '3px',
              position: 'relative',
            }}
          >
            确认删除
          </Typography.Title>
        </section>
      ),
      okButtonProps: {
        style: {
          background: COLOR_PALETTE.LEETECHO_RED,
        },
      },
      cancelText: '取消',
      onOk: () => {
        setNotePagination({
          ...notePagination,
          isReadOnly: new Array<boolean>(notePagination.pageSize).fill(true),
        });
        deleteNoteMutation.mutateAsync({
          noteType: 'COMMON_QUESTION',
          targetId: questionId,
          noteId: notePagination?.curPageData?.[index]?.id || '',
        });
      },
      onCancel: () => {
        /** noop */
      },
    });
  };

  /**-------- updateNote -------- */

  const updateNoteMutation = useUpdateNote({
    onError: (e) => {
      message.error('笔记更新失败: ' + e?.message || '');
      setRequestParams({
        ...requestParams,
        enableRequest: true,
      });
    },
    onSuccess: (res) => {
      if (res?.ok) {
        message.success('笔记更新成功');
        setRequestParams({
          ...requestParams,
          enableRequest: true,
        });
      } else {
        message.error('笔记更新失败');
        setRequestParams({
          ...requestParams,
          enableRequest: true,
        });
      }
    },
  });

  const { isLoading: isUpdateNoteLoading } = updateNoteMutation;

  const onNoteUpdate = (index: number, content: string) => {
    setNotePagination({
      ...notePagination,
      isReadOnly: new Array<boolean>(notePagination.pageSize).fill(true),
    });
    updateNoteMutation.mutateAsync({
      content,
      noteId: notePagination?.curPageData?.[index]?.id || '',
      noteType: 'COMMON_QUESTION',
      /** the id of the question where the note belongs*/
      targetId: questionId,
      summary: content?.slice(0, 20) || '',
    });
  };

  const [newNote, setNewNote] = useState<{
    isEditing: boolean;
  }>({
    isEditing: false,
  });

  const newNoteCache = useRef(' ');

  /**-------- return -------- */

  return (
    <SubmissionsAndNotesSection style={{ width: width }}>
      {(getQuestionQueryIsLoading || getSubmissionDetailByIdQuery.isLoading) && (
        <ContentSkeleton style={{ padding: 12 }}></ContentSkeleton>
      )}
      {getQuestionQueryData?.status === 'ac' &&
        (getNotesByQuestionIdQuery.isSuccess || getNotesByQuestionIdQuery.isFetched) && (
        <SubmissionsSection>
          <PageHeader
            style={{ paddingTop: 0, paddingBottom: 24, paddingLeft: 8 }}
            title="最近一次 AC 的代码"
            extra={<></>}
          ></PageHeader>
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
          <PageHeader
            style={{ paddingTop: 0, paddingBottom: 24, paddingLeft: 8, marginRight: 0, paddingRight: 0 }}
            title="我的笔记"
            extra={
              <MyNotesHeaderExtraSection>
                <Button
                  type="text"
                  style={{
                    color: COLOR_PALETTE.LEETECHO_BLUE,
                  }}
                  icon={
                    <IconPlusCircle
                      style={withSemiIconStyle({
                        marginRight: 8,
                        color: COLOR_PALETTE.LEETECHO_BLUE,
                      })}
                    />
                  }
                  onClick={() => {
                    newNoteCache.current = ' ';
                    setNewNote({
                      isEditing: true,
                    });
                  }}
                >
                  新增笔记
                </Button>
              </MyNotesHeaderExtraSection>
            }
          ></PageHeader>
          <NotesSection>
            {getNotesByQuestionIdQuery?.data?.userNotes?.length === 0 && !newNote.isEditing && (
              <Empty title="未找到笔记"></Empty>
            )}
            {newNote.isEditing && (
              <>
                <section
                  css={css`
                    display: flex;
                    flex-direction: row-reverse;
                  `}
                >
                  <section>
                    <Button
                      type="text"
                      onClick={() => {
                        setNewNote({
                          isEditing: false,
                        });
                        newNoteCache.current = ' ';
                      }}
                    >
                      取消
                    </Button>
                    <Button
                      type="text"
                      style={{
                        color: COLOR_PALETTE.LEETECHO_BLUE,
                      }}
                      icon={
                        <IconDelete
                          style={withSemiIconStyle({
                            marginRight: 8,
                            color: COLOR_PALETTE.LEETECHO_BLUE,
                          })}
                        />
                      }
                      onClick={() => {
                        onNoteAdd(newNoteCache.current);
                        setNewNote({
                          isEditing: false,
                        });
                        newNoteCache.current = ' ';
                      }}
                    >
                      保存
                    </Button>
                  </section>
                </section>
                <MarkdownEditor
                  value={newNoteCache.current}
                  onChange={(value) => {
                    newNoteCache.current = value;
                  }}
                  isReadOnly={false}
                ></MarkdownEditor>
              </>
            )}
            {getNotesByQuestionIdQuery?.data?.userNotes?.length > 0 ? (
              <>
                {!isAddNoteLoading || !isDeleteNoteLoading || !isUpdateNoteLoading ? (
                  <>
                    {notePagination?.curPageData?.map((e, idx) => {
                      return (
                        <>
                          <section
                            css={css`
                              display: flex;
                            `}
                          >
                            <section
                              css={css`
                                color: ${COLOR_PALETTE.LEETECHO_RED};
                                display: flex;
                                flex: 1;
                              `}
                            >
                              <Button
                                onClick={() => {
                                  onNoteDelete(idx);
                                }}
                                type="text"
                                style={{
                                  color: COLOR_PALETTE.LEETECHO_RED,
                                }}
                                icon={
                                  <IconDelete
                                    style={withSemiIconStyle({
                                      marginRight: 8,
                                      color: COLOR_PALETTE.LEETECHO_RED,
                                    })}
                                  />
                                }
                              >
                                删除
                              </Button>
                            </section>

                            <section>
                              <Button
                                type="text"
                                style={{
                                  color: notePagination?.isReadOnly?.[idx] ? COLOR_PALETTE.LEETECHO_BLUE : undefined,
                                }}
                                icon={
                                  notePagination.isReadOnly[idx] ? (
                                    <IconEdit
                                      style={withSemiIconStyle({
                                        marginRight: 8,
                                        color: COLOR_PALETTE.LEETECHO_BLUE,
                                      })}
                                    />
                                  ) : undefined
                                }
                                onClick={() => {
                                  if (notePagination.isReadOnly[idx]) {
                                    // modify
                                    setNotePagination({
                                      ...notePagination,
                                      isReadOnly: [
                                        ...notePagination.isReadOnly.slice(0, idx),
                                        false,
                                        ...notePagination.isReadOnly.slice(idx + 1),
                                      ],
                                    });
                                  } else {
                                    // cancel
                                    const curPageData = notePagination?.curPageData || [];
                                    const cache = noteContentCache.current;
                                    setNotePagination({
                                      ...notePagination,
                                      isReadOnly: [
                                        ...notePagination.isReadOnly.slice(0, idx),
                                        true,
                                        ...notePagination.isReadOnly.slice(idx + 1),
                                      ],
                                    });
                                    noteContentCache.current = [
                                      ...cache.slice(0, idx),
                                      curPageData[idx].content,
                                      ...cache.slice(idx + 1),
                                    ];
                                  }
                                }}
                              >
                                {notePagination.isReadOnly[idx] ? '修改' : '取消'}
                              </Button>
                              {!notePagination.isReadOnly[idx] && (
                                <Button
                                  type="text"
                                  style={{
                                    color: COLOR_PALETTE.LEETECHO_BLUE,
                                  }}
                                  icon={
                                    <IconDelete
                                      style={withSemiIconStyle({
                                        marginRight: 8,
                                        color: COLOR_PALETTE.LEETECHO_BLUE,
                                      })}
                                    />
                                  }
                                  onClick={() => {
                                    onNoteUpdate(idx, noteContentCache.current[idx]);
                                  }}
                                >
                                  保存
                                </Button>
                              )}
                            </section>
                          </section>
                          <MarkdownEditor
                            key={e.id}
                            value={noteContentCache.current[idx]}
                            onChange={(value) => {
                              noteContentCache.current = [
                                ...noteContentCache.current.slice(0, idx),
                                value,
                                ...noteContentCache.current.slice(idx + 1),
                              ];
                            }}
                            isReadOnly={notePagination.isReadOnly[idx] ?? true}
                          ></MarkdownEditor>
                        </>
                      );
                    })}
                    {notePagination?.curPageData?.length > 0 && (
                      <section
                        style={{
                          display: 'flex',
                          flexDirection: 'row-reverse',
                        }}
                      >
                        <Pagination
                          total={notePagination.total}
                          pageSize={notePagination.pageSize}
                          current={notePagination.cur}
                          onChange={notePaginationChange}
                          style={{}}
                        ></Pagination>
                      </section>
                    )}
                  </>
                ) : (
                  <WrappedLoading></WrappedLoading>
                )}
              </>
            ) : null}
          </NotesSection>
        </>
      )}
      {getNotesByQuestionIdQuery.isError && <ErrorIllustrator></ErrorIllustrator>}
    </SubmissionsAndNotesSection>
  );
};

export default SubmissionsAndNotes;
