import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { UseQueryOptions } from 'react-query';
import { Tabs } from 'antd';
import { useReadUserTemplate } from '@/rendererApi/io';
import { AppStoreContext } from '@/store/appStore/appStore';
import Loading from '@/components/illustration/loading';

const MarkDownEditor = React.lazy(() => import('@/components/markdownEditor'));

const { TabPane } = Tabs;

const { useRef, useState, useEffect, useMemo, useContext } = React;

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

  return (
    <>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="封面模板" key="coverTemplate">
          {data?.[0]?.content?.length > 0 && (
            <React.Suspense fallback={<Loading></Loading>}>
              <MarkDownEditor key={'coverTemplate'} value={data?.[0]?.content || ''} isReadOnly={true}></MarkDownEditor>
            </React.Suspense>
          )}
        </TabPane>
        <TabPane tab="题目模板" key="problemTemplate">
          {data?.[1]?.content?.length > 0 && (
            <React.Suspense fallback={<Loading></Loading>}>
              <MarkDownEditor
                key={'problemTemplate'}
                value={data?.[1]?.content || ''}
                isReadOnly={true}
              ></MarkDownEditor>
            </React.Suspense>
          )}
        </TabPane>
      </Tabs>
    </>
  );
};

export default TemplateManagement;
