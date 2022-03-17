import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { UseQueryOptions } from 'react-query';
import { PageHeader, Tabs } from 'antd';
import { useReadUserTemplate } from '@/rendererApi/io';
import { AppStoreContext } from '@/store/appStore/appStore';
import Loading from '@/components/illustration/loading';
import useResizable from '@/hooks/useResizable';
import Resizer from '@/components/resizer';

const MarkDownEditor = React.lazy(() => import('@/components/markdownEditor'));

const { TabPane } = Tabs;

const { useRef, useState, useEffect, useMemo, useContext } = React;

const HIDDEN_SIZE = 200;

type EditorState = {
  editable: boolean;
};

type EditorStatus = {
  cover: EditorState;
  problem: EditorState;
};

interface TemplateManagementProps {}

const TemplateManagement: React.FC<TemplateManagementProps> = (props: TemplateManagementProps) => {
  const {} = props;

  const { state: appState } = useContext(AppStoreContext);

  const {
    userState: { usrName = '', endPoint = 'CN' },
  } = appState;

  const [requestParams, setRequestParams] = useState<{
    enableRequest: boolean;
  }>({
    enableRequest: true,
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

  const queryArgs: ReadUserTemplateReq = {
    userInfo: {
      usrName,
      endPoint,
    },
  };

  const queryOptions: Omit<UseQueryOptions<ReadUserTemplateReq, Error>, 'queryKey' | 'queryFn'> = {
    enabled: requestParams.enableRequest,
    onSuccess: onRequestSuccess,
    onError: onRequestError,
  };

  const { isLoading, isSuccess, isError, data, error } = useReadUserTemplate(queryArgs, queryOptions);

  const [editorStatus, setEditorStatus] = useState<EditorStatus>({
    cover: { editable: true },
    problem: { editable: true },
  });

  const onEditorSave = (type: 'cover' | 'problem') => {
    setEditorStatus({
      ...editorStatus,
      [type]: {
        ...editorStatus[type],
        editable: false,
      },
    });
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

  return (
    <section
      ref={ref}
      style={{
        display: 'flex',
        flexDirection: 'col',
        boxSizing: 'border-box',
        height: 'calc(100% - 2px)',
      }}
    >
      {size > HIDDEN_SIZE && (
        <section style={{ width: size < HIDDEN_SIZE ? 0 : size, height: '100%', overflowY: 'auto', paddingRight: 12 }}>
          <PageHeader style={{ paddingTop: 0, paddingBottom: 24, paddingLeft: 8 }} title="封面模板"></PageHeader>
          {data?.[0]?.content?.length > 0 && (
            <React.Suspense fallback={<Loading></Loading>}>
              <MarkDownEditor
                key={'coverTemplate'}
                value={data?.[0]?.content || ''}
                isReadOnly={!editorStatus.cover.editable}
              ></MarkDownEditor>
            </React.Suspense>
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
          <PageHeader style={{ paddingTop: 0, paddingBottom: 24, paddingLeft: 8 }} title="题目模版"></PageHeader>
          {data?.[1]?.content?.length > 0 && (
            <React.Suspense fallback={<Loading></Loading>}>
              <MarkDownEditor
                key={'problemTemplate'}
                value={data?.[1]?.content || ''}
                isReadOnly={!editorStatus.problem.editable}
              ></MarkDownEditor>
            </React.Suspense>
          )}
        </section>
      )}
    </section>
  );
};

export default TemplateManagement;
