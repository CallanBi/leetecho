import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { UseQueryOptions } from 'react-query';
import { useGetProblem, useGetSubmissionsByTitleSlug } from '@/rendererApi/problem';
import { useRouter } from '@/hooks/router/useRouter';
import { message, PageHeader} from 'antd';
import QuestionWrapper from './components/questionWrapper';

const { useRef, useState, useEffect, useMemo } = React;

interface ProblemDetailProps {}

const ProblemDetail: React.FC<ProblemDetailProps> = (props: ProblemDetailProps) => {
  const {} = props;

  const router = useRouter();

  const [requestParams, setRequestParams] = useState<{
    [key: string]: {
      enableRequest: boolean;
    };
  }>({
    submissions: {
      enableRequest: true,
    },
    problems: {
      enableRequest: true,
    },
    notes: {
      enableRequest: true,
    },
  });

  const onProblemRequestSuccess = () => {
    if (requestParams.enableRequest) {
      setRequestParams({ ...requestParams, problems: { enableRequest: false } });
    }
  };

  const onProblemRequestError = () => {
    if (requestParams.enableRequest) {
      setRequestParams({ ...requestParams, problems: { enableRequest: false } });
    }
  };

  const onSubmissionsRequestSuccess = () => {
    if (requestParams.enableRequest) {
      setRequestParams({ ...requestParams, submissions: { enableRequest: false } });
    }
  };

  const onSubmissionsRequestError = () => {
    if (requestParams.enableRequest) {
      setRequestParams({ ...requestParams, submissions: { enableRequest: false } });
    }
  };

  const { query } = router;

  const { titleSlug = '' } = query as { titleSlug: string };

  if (!titleSlug) {
    message.error('未知错误');
    router.push('/allProblems');
  }

  const queryArgs: GetProblemReq = {
    titleSlug,
  };

  const submissionsQueryArgs: GetSubmissionsByQuestionSlugReq = {
    questionSlug: titleSlug,
  };

  const problemQueryOptions: Omit<UseQueryOptions<GetProblemResp['data'], Error>, 'queryKey' | 'queryFn'> = {
    enabled: requestParams.problems.enableRequest,
    onSuccess: onProblemRequestSuccess,
    onError: onProblemRequestError,
  };

  const submissionsQueryOptions: Omit<
    UseQueryOptions<GetSubmissionsByQuestionSlugResp['data'], Error>,
    'queryKey' | 'queryFn'
  > = {
    enabled: requestParams.submissions.enableRequest,
    onSuccess: onSubmissionsRequestSuccess,
    onError: onSubmissionsRequestError,
  };

  const getProblemQuery = useGetProblem(queryArgs, problemQueryOptions);

  const getSubmissionsQuery = useGetSubmissionsByTitleSlug(submissionsQueryArgs, submissionsQueryOptions);

  console.log('%c  getSubmissionsQuery  >>>', 'background: yellow; color: blue', getSubmissionsQuery);

  return (
    <>
      <PageHeader
        style={{ paddingTop: 0, paddingBottom: 24, paddingLeft: 8 }}
        onBack={() => {
          router.history.goBack();
        }}
        title="题目详情"
        subTitle={
          getProblemQuery?.data
            ? `${getProblemQuery.data.questionFrontendId}: ${
              getProblemQuery.data?.translatedTitle || getProblemQuery.data?.title || ''
            }`
            : ''
        }
      ></PageHeader>
      <QuestionWrapper getQuestionQuery={getProblemQuery}></QuestionWrapper>
    </>
  );
};

export default ProblemDetail;
