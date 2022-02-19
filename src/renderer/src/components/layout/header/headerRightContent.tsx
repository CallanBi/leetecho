import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Input } from 'antd';
import SearchEnterBtn from './components/searchEnterBtn';

const { Search } = Input;

const { useRef, useState, useEffect, useMemo } = React;


const HeaderSearchSection = styled.section`
  flex: 1;
  display: flex;
  vertical-align: middle;
  justify-content: center;
  margin-right: 24px;
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
      <Search style={searchStyle} placeholder="搜索题目" onSearch={() => console.log('%c 111 >>>', 'background: yellow; color: blue')
      } enterButton={<SearchEnterBtn></SearchEnterBtn>} />
    </HeaderSearchSection>
  );
};

export default HeaderRightContent;
