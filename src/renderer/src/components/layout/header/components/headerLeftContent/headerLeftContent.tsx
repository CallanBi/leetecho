import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Input } from 'antd';
import SearchEnterBtn from '../searchEnterBtn';
import { COLOR_PALETTE } from 'src/const/theme/color';
import { MEASUREMENT } from 'src/const/theme/measurement';


const { Search } = Input;

const { useRef, useState, useEffect, useMemo } = React;


const HeaderSearchSection = styled.section`
  -webkit-app-region: no-drag;
  display: flex;
  vertical-align: middle;
  justify-content: center;
  margin-left: 24px;
  margin-right: auto;
  width: 260px;
  .ant-input {
    background-color: ${COLOR_PALETTE.LEETECHO_HEADER_SEARCH_BG};
    border-color: ${COLOR_PALETTE.LEETECHO_HEADER_SEARCH_BG};
    border-radius: 32px;

    :hover {
      border-color: ${COLOR_PALETTE.LEETECHO_HEADER_SEARCH_BG_HOVER};
    }

    :focus {
      border-color: ${COLOR_PALETTE.LEETECHO_BLUE};
      box-shadow: none;
      background-color: ${COLOR_PALETTE.LEETECHO_INPUT_BACKGROUND};
    }
  }
  .ant-btn {
    border-top-right-radius: 32px!important;
    border-bottom-right-radius: 32px!important;
  }
`;

const searchStyle: React.CSSProperties = {
  margin: 'auto',
};

interface HeaderLeftContentProps {

}

const HeaderLeftContent: React.FC<HeaderLeftContentProps> = (props: HeaderLeftContentProps) => {
  const { } = props;

  return (
    <HeaderSearchSection>
      <Search size="small" style={searchStyle} placeholder="搜索题目" onSearch={(val, event) => console.log('%c 111 >>>', 'background: yellow; color: blue', { val, event })
      } enterButton={<SearchEnterBtn></SearchEnterBtn>} />
    </HeaderSearchSection>
  );
};

export default HeaderLeftContent;
