import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { UseQueryOptions } from 'react-query';
import { Alert, Button, message, PageHeader, Typography } from 'antd';
import { useReadUserTemplate, useSaveUserTemplate } from '@/rendererApi/io';
import { AppStoreContext } from '@/store/appStore/appStore';
import useResizable from '@/hooks/useResizable';
import Resizer from '@/components/resizer';
import { IconEdit, IconInfoCircle, IconSave } from '@douyinfe/semi-icons';
import { withSemiIconStyle } from '@/style';
import Footer from '@/components/layout/footer';
import { getErrorCodeMessage } from 'src/main/router/errorCode';
import to from 'await-to-js';

import MarkDownEditor from '@/components/markdownEditor';
import WrappedLoading from '@/components/illustration/loading/wrappedLoading';
import { COLOR_PALETTE } from 'src/const/theme/color';

const { Link } = Typography;

const {
  bridge: { ipcRenderer, path, __filename, __dirname, isDev, fs },
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

  const alertInfo = (
    <>
      <section>支持 Markdown 语法；</section>
      <section>如期望上传本地图片，可直接从本地拖曳到编辑器中，编辑器会自动将其转为 base64 编码；</section>
      <section>如期望插入远程图片，直接插入图片即可；</section>
      <section>
        Leetecho 自定义模板语法可参考{' '}
        <Link
          style={{
            color: COLOR_PALETTE.LEETECHO_LIGHT_BLUE,
          }}
          target="_blank"
        >
          说明文档（建设中）
        </Link>
        。
      </section>
    </>
  );

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
          <Alert
            style={{
              borderColor: COLOR_PALETTE.LEETECHO_BLUE,
              marginBottom: 12,
              marginTop: 3,
            }}
            description={alertInfo}
            type="info"
            showIcon
            icon={<IconInfoCircle style={withSemiIconStyle({ paddingRight: 12 })} />}
            closable={true}
          />
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
