import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { IconSearch } from '@douyinfe/semi-icons';
import { withSemiIconStyle } from '@/style';

const { useRef, useState, useEffect, useMemo } = React;

interface SearchEnterBtnProps {

}

const SearchEnterBtn: React.FC<SearchEnterBtnProps> = (props: SearchEnterBtnProps) => {
  const { } = props;

  return (
    <IconSearch style={withSemiIconStyle({ marginRight: 8 })} />
  );
};

export default SearchEnterBtn;
