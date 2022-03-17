import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const { useRef, useState, useEffect, useMemo } = React;
import parse, { HTMLReactParserOptions, domToReact, attributesToProps } from 'html-react-parser';
import { Question, SubmissionList } from 'src/main/api/leetcodeApi/utils/interfaces';
import useResizable from '@/hooks/useResizable';
import ImageComponent from '@/components/imageComponent';
import { ImageDecorator } from 'react-viewer/lib/ViewerProps';
import Viewer from 'react-viewer';
import { COLOR_PALETTE } from 'src/const/theme/color';
import { Element } from 'domhandler';
import { Descriptions, PageHeader, Typography } from 'antd';
import { UseQueryResult } from 'react-query';
import { DIFFICULTY_COLOR, DIFFICULTY_WORD, statusIconMap, STATUS_WORD } from '@/const/problemConst';
import ContentSkeleton from '@/components/contentSkeleton';
import SubmissionsAndNotes from '../submissionsAndNotes';
import { useRouter } from '@/hooks/router/useRouter';
import Resizer from '@/components/resizer';

const { Link } = Typography;

const LEFT_HIDDEN_SIZE = 200;
const INIT_LEFT_SIZE = 600;

const QuestionContentSection = styled.section`
  padding-top: 12px;
`;

const QuestionWrapperSection = styled.section`
  display: flex;
  flex-direction: col;
  box-sizing: border-box;
  height: calc(100% - 2px);
`;

const QuestionViewerSection = styled.section`
  height: 100%;
  overflow-y: auto;
  padding-right: 12px;
`;

interface QuestionWrapperProps {
  getQuestionQuery: UseQueryResult<Question, Error>;
  getSubmissionsQuery: UseQueryResult<SubmissionList, Error>;
}

const QuestionWrapper: React.FC<QuestionWrapperProps> = (props: QuestionWrapperProps) => {
  const { getQuestionQuery, getSubmissionsQuery } = props;

  const { size, handler } = useResizable({
    size: INIT_LEFT_SIZE,
    minSize: 100,
    maxSize: 1600,
    direction: 'right',
  });

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

  const router = useRouter();

  return (
    <>
      <QuestionWrapperSection>
        {size > LEFT_HIDDEN_SIZE && (
          <QuestionViewerSection style={{ width: size }}>
            <PageHeader
              style={{ paddingTop: 0, paddingBottom: 24, paddingLeft: 8 }}
              onBack={() => {
                router.history.goBack();
              }}
              title="题目详情"
              subTitle={
                getQuestionQuery?.data
                  ? `${getQuestionQuery.data.questionFrontendId}: ${
                    getQuestionQuery.data?.translatedTitle || getQuestionQuery.data?.title || ''
                  }`
                  : ''
              }
            ></PageHeader>
            <Descriptions style={{ borderBottom: `3px solid ${COLOR_PALETTE.LEETECHO_INPUT_BACKGROUND}` }}>
              <Descriptions.Item label="难度">
                <span style={{ color: DIFFICULTY_COLOR[getQuestionQuery?.data?.difficulty?.toUpperCase()] }}>
                  {DIFFICULTY_WORD[getQuestionQuery?.data?.difficulty?.toUpperCase()]}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="状态">
                {statusIconMap[getQuestionQuery?.data?.status?.toUpperCase()]}
              </Descriptions.Item>
              <Descriptions.Item label="官方链接">
                <Link
                  href={`https://leetcode-cn.com/problems/${getQuestionQuery.data?.titleSlug || ''}/`}
                  target="_blank"
                  style={{ color: COLOR_PALETTE.LEETECHO_LIGHT_BLUE }}
                ></Link>
              </Descriptions.Item>
            </Descriptions>
            {getQuestionQuery.isLoading ? (
              <ContentSkeleton maxWidth={550}></ContentSkeleton>
            ) : (
              <QuestionContentSection>
                {parse(getQuestionQuery?.data?.translatedContent || getQuestionQuery?.data?.content || '', options)}
              </QuestionContentSection>
            )}
          </QuestionViewerSection>
        )}
        <Resizer onMouseDown={handler} onTouchStart={handler}></Resizer>
        <SubmissionsAndNotes
          width={size > LEFT_HIDDEN_SIZE ? `calc(100% - ${size}px)` : '100%'}
          getQuestionQuery={getQuestionQuery}
          getSubmissionsQuery={getSubmissionsQuery}
        ></SubmissionsAndNotes>
      </QuestionWrapperSection>
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
      />
    </>
  );
};

export default QuestionWrapper;
