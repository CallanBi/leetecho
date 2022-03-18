import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { UseQueryOptions } from 'react-query';
import { Button, message, PageHeader, Tabs } from 'antd';
import { useReadUserTemplate, useSaveUserTemplate } from '@/rendererApi/io';
import { AppStoreContext } from '@/store/appStore/appStore';
import useResizable from '@/hooks/useResizable';
import Resizer from '@/components/resizer';
import { IconEdit, IconSave } from '@douyinfe/semi-icons';
import { withSemiIconStyle } from '@/style';
import Footer from '@/components/layout/footer';
import { getErrorCodeMessage } from 'src/main/api/errorCode';
import to from 'await-to-js';

import MarkDownEditor from '@/components/markdownEditor';
import WrappedLoading from '@/components/illustration/loading/wrappedLoading';

const {
  bridge: { ipcRenderer },
} = window;

const { useRef, useState, useEffect, useMemo, useContext } = React;

const HIDDEN_SIZE = 200;

type EditorState = {
  editable: boolean;
  content: string;
};

type EditorStatus = {
  cover: EditorState;
  problem: EditorState;
  enableRequest: boolean;
};

const HeaderExtraSection = styled.section`
  display: flex;
`;

interface TemplateManagementProps {}

const TemplateManagement: React.FC<TemplateManagementProps> = (props: TemplateManagementProps) => {
  const {} = props;

  const { state: appState } = useContext(AppStoreContext);

  const {
    userState: { usrName = '', endPoint = 'CN' },
  } = appState;

  const onRequestSuccess = (successData: ReadUserTemplateResp) => {
    if (editorStatus.enableRequest) {
      setEditorStatus({
        ...editorStatus,
        cover: { ...editorStatus.cover, content: successData?.[0].content || '' },
        problem: { ...editorStatus.problem, content: successData?.[1].content || '' },
        enableRequest: false,
      });
      setEditorContentCache({
        ...editorContentCache,
        cover: { content: successData?.[0].content || '' },
        problem: { content: successData?.[1].content || '' },
      });
    }
  };

  const onRequestError = () => {
    if (editorStatus.enableRequest) {
      setEditorStatus({ ...editorStatus, enableRequest: false });
    }
  };

  const queryArgs: ReadUserTemplateReq = {
    userInfo: {
      usrName,
      endPoint,
    },
  };

  const [editorStatus, setEditorStatus] = useState<EditorStatus>({
    cover: { editable: false, content: '' },
    problem: { editable: false, content: '' },
    enableRequest: true,
  });

  const [editorContentCache, setEditorContentCache] = useState<{
    cover: Omit<EditorState, 'editable'>;
    problem: Omit<EditorState, 'editable'>;
  }>({
    cover: { content: '' },
    problem: { content: '' },
  });

  const queryOptions: Omit<UseQueryOptions<ReadUserTemplateResp, Error>, 'queryKey' | 'queryFn'> = {
    enabled: editorStatus.enableRequest,
    onSuccess: onRequestSuccess,
    onError: onRequestError,
  };

  const { isLoading, isSuccess, isError, data, error } = useReadUserTemplate(queryArgs, queryOptions);

  const onSaveTemplateError = (error: Error, variables?: SaveTemplateReq, context?: unknown) => {
    message.error(`保存失败，错误信息：${error?.message ?? error?.toString() ?? getErrorCodeMessage()}`);
  };

  const onSaveTemplateSuccess = (data: SaveTemplateResp, variables?: SaveTemplateReq, context?: unknown) => {
    message.success('保存成功');
  };

  const saveTemplateMutation = useSaveUserTemplate({
    onError: onSaveTemplateError,
    onSuccess: onSaveTemplateSuccess,
  });

  const onEditorSave = async (type: 'cover' | 'problem') => {
    const [_err, _res] = await to(
      saveTemplateMutation.mutateAsync({
        userInfo: {
          usrName,
          endPoint,
        },
        type,
        content: editorContentCache[type].content,
      }),
    );
    if (_err) {
      return;
    }
    setEditorStatus({
      ...editorStatus,
      [type]: {
        ...editorStatus[type],
        content: editorContentCache[type].content,
        editable: false,
      },
      enableRequest: true,
    });
  };

  const onEditorEdit = (type: 'cover' | 'problem') => {
    setEditorStatus({
      ...editorStatus,
      [type]: {
        ...editorStatus[type],
        editable: true,
      },
    });
  };

  const onEditorReset = async (type: 'cover' | 'problem') => {
    const [resetErr, res] = (await to(ipcRenderer.invoke('getDefaultTemplates'))) as [
      null | Error,
      SuccessResp<{
        coverTemplateContent: string;
        problemTemplateContent: string;
      }>,
    ];
    const { data: templContent } = res;
    if (templContent?.[`${type}TemplateContent`].length === 0 || resetErr) {
      message.error(resetErr?.message ? `重置失败，错误信息：${resetErr.message}` : '重置失败，模板文件未找到');
      return;
    }

    const [_err, _res] = await to(
      saveTemplateMutation.mutateAsync({
        userInfo: {
          usrName,
          endPoint,
        },
        type,
        content: templContent?.[`${type}TemplateContent`],
      }),
    );
    if (_err) {
      return;
    }
    setEditorStatus({
      ...editorStatus,
      [type]: {
        ...editorStatus[type],
        content: templContent?.[`${type}TemplateContent`],
        editable: false,
      },
      enableRequest: true,
    });
    setEditorContentCache({
      ...editorContentCache,
      [type]: {
        content: templContent?.[`${type}TemplateContent`],
      },
    });
  };

  const onEditorCancel = (type: 'cover' | 'problem') => {
    setEditorStatus({
      ...editorStatus,
      [type]: {
        ...editorStatus[type],
        editable: false,
      },
    });
  };

  const onEditorChangeInner = (value: string, type: 'cover' | 'problem') => {
    setEditorContentCache({
      ...editorContentCache,
      [type]: {
        ...editorContentCache[type],
        content: value,
      },
    });
  };

  const onEditorCoverChange = (value: string) => {
    onEditorChangeInner(value, 'cover');
  };

  const onEditorProblemChange = (value: string) => {
    onEditorChangeInner(value, 'problem');
  };

  const ref = useRef<HTMLElement>(null);

  const width = ref.current ? ref.current.offsetWidth : document.body.clientWidth - 208;

  const { size, handler } = useResizable({
    size: width / 2,
    minSize: 100,
    direction: 'right',
  }) as unknown as {
    size: number;
    handler: React.MouseEventHandler<HTMLElement> | React.TouchEventHandler<HTMLElement>;
  };

  const CoverEditor = useMemo(() => {
    return (saveTemplateMutation.isLoading && saveTemplateMutation.variables?.type === 'cover') || isLoading ? (
      <WrappedLoading></WrappedLoading>
    ) : (
      <MarkDownEditor
        value={editorStatus.cover.content || ''}
        isReadOnly={!editorStatus.cover.editable}
        onChange={onEditorCoverChange}
      ></MarkDownEditor>
    );
  }, [
    editorStatus.cover.editable,
    editorStatus.cover.content,
    saveTemplateMutation?.variables?.type,
    saveTemplateMutation.isLoading,
    isLoading,
  ]);

  const ProblemEditor = useMemo(() => {
    return (saveTemplateMutation.isLoading && saveTemplateMutation.variables?.type === 'problem') || isLoading ? (
      <WrappedLoading></WrappedLoading>
    ) : (
      <MarkDownEditor
        value={editorStatus.problem.content || ''}
        isReadOnly={!editorStatus.problem.editable}
        onChange={onEditorProblemChange}
      ></MarkDownEditor>
    );
  }, [
    editorStatus.problem.editable,
    editorStatus.problem.content,
    saveTemplateMutation?.variables?.type,
    saveTemplateMutation.isLoading,
    isLoading,
  ]);

  return (
    <section
      ref={ref}
      style={{
        display: 'flex',
        boxSizing: 'border-box',
        height: 'calc(100% - 2px)',
      }}
    >
      {size > HIDDEN_SIZE && (
        <section
          style={{
            width: size < HIDDEN_SIZE ? 0 : width - size > HIDDEN_SIZE ? size : '100%',
            height: editorStatus.cover.editable ? 'calc(100% - 46px)' : '100%',
            overflowY: 'auto',
            paddingRight: 12,
          }}
        >
          <PageHeader
            style={{ paddingTop: 0, paddingBottom: 24, paddingLeft: 8 }}
            title="封面模板"
            extra={
              <HeaderExtraSection>
                <Button
                  style={{
                    marginRight: 12,
                  }}
                  icon={
                    <IconEdit
                      style={withSemiIconStyle({
                        paddingRight: 12,
                      })}
                    />
                  }
                  onClick={() => {
                    onEditorReset('cover');
                  }}
                >
                  重置为默认
                </Button>
                <Button
                  icon={
                    <IconEdit
                      style={withSemiIconStyle({
                        paddingRight: 12,
                      })}
                    />
                  }
                  onClick={() => {
                    onEditorEdit('cover');
                  }}
                >
                  编辑
                </Button>
              </HeaderExtraSection>
            }
          ></PageHeader>
          {editorStatus.cover.content.length > 0 && CoverEditor}
          {editorStatus.cover.editable && (
            <Footer
              style={{
                width: size < HIDDEN_SIZE ? 0 : width - size > HIDDEN_SIZE ? size + 18 : 'calc(100% - 31px)',
                marginLeft: -21,
              }}
            >
              <Button
                type="primary"
                style={{
                  marginRight: 12,
                }}
                icon={
                  <IconSave
                    style={withSemiIconStyle({
                      paddingRight: 12,
                    })}
                  />
                }
                onClick={() => {
                  onEditorSave('cover');
                }}
              >
                保存
              </Button>
              <Button
                style={{
                  marginRight: 12,
                }}
                onClick={() => {
                  onEditorCancel('cover');
                }}
              >
                取消
              </Button>
            </Footer>
          )}
        </section>
      )}
      <Resizer
        onMouseDown={handler as React.MouseEventHandler<HTMLElement>}
        onTouchStart={handler as React.TouchEventHandler<HTMLElement>}
      ></Resizer>
      {size + HIDDEN_SIZE < width && (
        <section
          style={{
            width: width - size > HIDDEN_SIZE ? `calc(100% - ${size}px)` : 0,
            height: '100%',
            overflowY: 'auto',
            paddingLeft: 12,
            paddingRight: 12,
          }}
        >
          <PageHeader
            style={{ paddingTop: 0, paddingBottom: 24, paddingLeft: 8 }}
            title="题目模版"
            extra={
              <HeaderExtraSection>
                <Button
                  style={{
                    marginRight: 12,
                  }}
                  icon={
                    <IconEdit
                      style={withSemiIconStyle({
                        paddingRight: 12,
                      })}
                    />
                  }
                  onClick={() => {
                    onEditorReset('problem');
                  }}
                >
                  重置为默认
                </Button>
                <Button
                  icon={
                    <IconEdit
                      style={withSemiIconStyle({
                        paddingRight: 12,
                      })}
                    />
                  }
                  onClick={() => {
                    onEditorEdit('problem');
                  }}
                >
                  编辑
                </Button>
              </HeaderExtraSection>
            }
          ></PageHeader>
          {editorStatus.problem.content.length > 0 && ProblemEditor}
          {editorStatus.problem.editable && (
            <Footer
              style={{
                width:
                  width - size > HIDDEN_SIZE
                    ? size < HIDDEN_SIZE
                      ? 'calc(100% - 31px)'
                      : `calc(100% - ${size + 31}px)`
                    : 0,
                marginLeft: -12,
              }}
            >
              <Button
                type="primary"
                style={{
                  marginRight: 12,
                }}
                icon={
                  <IconSave
                    style={withSemiIconStyle({
                      paddingRight: 12,
                    })}
                  />
                }
                onClick={() => {
                  onEditorSave('problem');
                }}
              >
                保存
              </Button>
              <Button
                style={{
                  marginRight: 12,
                }}
                onClick={() => {
                  onEditorCancel('problem');
                }}
              >
                取消
              </Button>
            </Footer>
          )}
        </section>
      )}
    </section>
  );
};

export default TemplateManagement;
