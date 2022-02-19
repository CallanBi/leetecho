import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Input } from 'antd';
import SearchEnterBtn from './components/searchEnterBtn';
import { COLOR_PALETTE } from 'src/const/theme/color';
import { MEASUREMENT } from 'src/const/theme/measurement';


const { Search } = Input;

const { useRef, useState, useEffect, useMemo } = React;


const HeaderSearchSection = styled.section`
  flex: 1;
  display: flex;
  vertical-align: middle;
  justify-content: center;
  margin-right: 24px;
  .ant-input {
    background-color: ${COLOR_PALETTE.LEETECHO_HEADER_SEARCH_BG};
    border-color: ${COLOR_PALETTE.LEETECHO_HEADER_SEARCH_BG};

    :hover {
      border-color: ${COLOR_PALETTE.LEETECHO_HEADER_SEARCH_BG_HOVER};
    }

    :focus {
      border-color: ${COLOR_PALETTE.LEETECHO_BLUE};
      box-shadow: none;
      background-color: ${COLOR_PALETTE.LEETECHO_HEADER_SEARCH_BG};
    }
  }
  .ant-btn {
    border-top-right-radius: ${MEASUREMENT.LEETECHO_BORDER_RADIUS_BASE}!important;
    border-bottom-right-radius: ${MEASUREMENT.LEETECHO_BORDER_RADIUS_BASE}!important;
  }
`;

const searchStyle: React.CSSProperties = {
  margin: 'auto',
};

interface HeaderRightContentProps {

}

const HeaderRightContent: React.FC<HeaderRightContentProps> = (props: HeaderRightContentProps) => {
  const { } = props;

  return (
    <HeaderSearchSection>
      <Search style={searchStyle} placeholder="搜索题目" onSearch={(val, event) => console.log('%c 111 >>>', 'background: yellow; color: blue', { val, event })
      } enterButton={<SearchEnterBtn></SearchEnterBtn>} />
    </HeaderSearchSection>
  );
};

export default HeaderRightContent;
