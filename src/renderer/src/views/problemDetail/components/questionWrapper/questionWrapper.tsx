import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const { useRef, useState, useEffect, useMemo } = React;
import parse, { HTMLReactParserOptions, domToReact, attributesToProps } from 'html-react-parser';
import { Question } from 'src/main/api/leetcodeApi/utils/interfaces';
import useResizable from '@/hooks/useResizable';
import ImageComponent from '@/components/imageComponent';
import { ImageDecorator } from 'react-viewer/lib/ViewerProps';
import Viewer from 'react-viewer';
import { COLOR_PALETTE } from 'src/const/theme/color';
import { Element } from 'domhandler';
import { Descriptions, Typography } from 'antd';
import { UseQueryResult } from 'react-query';
import { DIFFICULTY_COLOR, DIFFICULTY_WORD, statusIconMap, STATUS_WORD } from '@/const/problemConst';
import ContentSkeleton from '@/components/contentSkeleton';

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
  height: calc(100% - 65px);
`;

const QuestionViewerSection = styled.section`
  height: 100%;
  overflow-y: auto;
  padding-right: 12px;
`;

interface QuestionWrapperProps {
  getQuestionQuery: UseQueryResult<Question, Error>;
}

const QuestionWrapper: React.FC<QuestionWrapperProps> = (props: QuestionWrapperProps) => {
  const { getQuestionQuery } = props;

  const { size, handler } = useResizable({
    size: INIT_LEFT_SIZE,
    minSize: 0,
    maxSize: 1200,
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

  const ResizerSection = styled.section`
    width: 10px;
    height: 100%;
    z-index: 1;
    cursor: col-resize;
    background-color: ${COLOR_PALETTE.LEETECHO_INPUT_BACKGROUND};
    box-sizing: border-box;
    transition: all 0.3s;

    :hover {
      background-color: ${COLOR_PALETTE.LEETECHO_INPUT_HOVER_BG};
    }
  `;

  const SubmissionAndNoteSession = styled.section`
    width: ${`calc(100% - ${size}px)`};
  `;

  console.log(
    '%c getQuestionQuery?.data?.status >>>',
    'background: yellow; color: blue',
    getQuestionQuery?.data?.status,
  );

  return (
    <>
      <QuestionWrapperSection>
        {size > LEFT_HIDDEN_SIZE && (
          <QuestionViewerSection style={{ width: size }}>
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
        <ResizerSection onMouseDown={handler} onTouchStart={handler}></ResizerSection>
        <SubmissionAndNoteSession></SubmissionAndNoteSession>
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
