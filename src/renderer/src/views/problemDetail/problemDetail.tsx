import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { UseQueryOptions } from 'react-query';
import { useGetProblem } from '@/rendererApi/problem';
import { useRouter } from '@/hooks/router/useRouter';

const { useRef, useState, useEffect, useMemo } = React;

interface ProblemDetailProps {}

const ProblemDetail: React.FC<ProblemDetailProps> = (props: ProblemDetailProps) => {
  debugger;
  const {} = props;

  const router = useRouter();

  console.log('%c router >>>', 'background: yellow; color: blue', router);

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

  const queryArgs: GetProblemReq = {
    titleSlug: 'two-sum',
  };

  const queryOptions: Omit<UseQueryOptions<GetProblemResp['data'], Error>, 'queryKey' | 'queryFn'> = {
    enabled: requestParams.enableRequest,
    onSuccess: onRequestSuccess,
    onError: onRequestError,
  };

  const { isLoading, isSuccess, isError, data, error } = useGetProblem(queryArgs, queryOptions);

  console.log('%c data >>>', 'background: yellow; color: blue', data);

  console.log('%c error >>>', 'background: yellow; color: blue', error);

  return <>Problem Detail</>;
};

export default ProblemDetail;
