import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { UseQueryOptions } from 'react-query';
import { useGetProblem } from '@/rendererApi/problem';
import { useRouter } from '@/hooks/router/useRouter';
import { ImageProps, message, PageHeader, Skeleton } from 'antd';
import parse, { HTMLReactParserOptions, domToReact, attributesToProps } from 'html-react-parser';
import { Element } from 'domhandler';
import { COLOR_PALETTE } from 'src/const/theme/color';
import ErrorIllustrator from '@/components/illustration/errorIllustrator';
import Viewer from 'react-viewer';
import { ImageDecorator } from 'react-viewer/lib/ViewerProps';
import ImageComponent from '@/components/imageComponent';
import { size } from 'lodash';

const { useRef, useState, useEffect, useMemo } = React;

interface ProblemDetailProps {}

const QuestionContentSection = styled.section``;

const ProblemDetail: React.FC<ProblemDetailProps> = (props: ProblemDetailProps) => {
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

  const { query } = router;

  const { titleSlug = '' } = query as { titleSlug: string };

  if (!titleSlug) {
    message.error('未知错误');
    router.push('/allProblems');
  }

  const queryArgs: GetProblemReq = {
    titleSlug,
  };

  const queryOptions: Omit<UseQueryOptions<GetProblemResp['data'], Error>, 'queryKey' | 'queryFn'> = {
    enabled: requestParams.enableRequest,
    onSuccess: onRequestSuccess,
    onError: onRequestError,
  };

  const { isLoading, isSuccess, isError, data, error } = useGetProblem(queryArgs, queryOptions);

  console.log('%c  >>>', 'background: yellow; color: blue', { isLoading, isSuccess, isError, data, error });

  const [imgInfo, setImgInfo] = useState<ImageDecorator & { viewVisible: boolean }>({
    src: '',
    alt: '',
    viewVisible: false,
  });

  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if ((domNode as Element)?.name === 'code') {
        return (
          <code style={{ backgroundColor: COLOR_PALETTE.LEETECHO_INPUT_BACKGROUND }}>
            {domToReact((domNode as Element)?.children || [])}
          </code>
        );
      } else if ((domNode as Element)?.name === 'pre') {
        return (
          <pre style={{ backgroundColor: COLOR_PALETTE.LEETECHO_INPUT_BACKGROUND, padding: 12 }}>
            {domToReact((domNode as Element)?.children || [])}
          </pre>
        );
      } else if ((domNode as Element)?.name === 'img') {
        const imageProps = attributesToProps(
          (domNode as Element)?.attribs,
        ) as React.ImgHTMLAttributes<HTMLImageElement>;
        const { src = '', alt = '' } = imageProps;
        const imageOption: ImageDecorator = { src, alt };
        return (
          <div
            style={{ paddingTop: 12, paddingBottom: 12, cursor: 'pointer' }}
            onClick={() => {
              setImgInfo({ ...imageOption, viewVisible: true });
            }}
          >
            <ImageComponent {...imageProps} />
          </div>
        );
      }
    },
  };

  console.log('%c data.translatedContent >>>', 'background: yellow; color: blue', data?.translatedContent);

  return (
    <>
      <PageHeader
        style={{ paddingTop: 0, paddingBottom: 24, paddingLeft: 8 }}
        onBack={() => {
          router.history.goBack();
        }}
        title="题目详情"
        subTitle={data?.translatedTitle || data?.title || ''}
      />
      {isLoading && (
        <section style={{ maxWidth: 800 }}>
          <Skeleton active round paragraph={{ rows: 3 }} title></Skeleton>
          <Skeleton.Input active style={{ width: 250, height: 200 }} />
          <Skeleton.Input active style={{ width: 800, height: 64, marginTop: 12 }} />
          <Skeleton active round paragraph={{ rows: 2 }} title></Skeleton>
          <Skeleton.Input active style={{ width: 800, height: 80, marginTop: 12 }} />
          <Skeleton active round paragraph={{ rows: 5 }} title></Skeleton>
        </section>
      )}
      {isSuccess && (
        <QuestionContentSection>{parse(data.translatedContent || data.content || '', options)}</QuestionContentSection>
      )}
      {isError && <ErrorIllustrator></ErrorIllustrator>}
      <Viewer
        visible={imgInfo.viewVisible}
        onClose={() => {
          setImgInfo({ src: '', alt: '', viewVisible: false });
        }}
        noImgDetails
        showTotal={false}
        attribute={false}
        noNavbar
        noToolbar
        onMaskClick={() => {
          setImgInfo({ src: '', alt: '', viewVisible: false });
        }}
        images={[{ src: imgInfo.src, alt: imgInfo.alt }]}
      ></Viewer>
    </>
  );
};

export default ProblemDetail;
