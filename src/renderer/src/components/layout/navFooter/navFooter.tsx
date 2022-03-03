import * as React from 'react';
import styled from '@emotion/styled';
import { Button } from 'antd';
import { IconGithubLogo, IconGlobeStroke, IconLanguage, IconSetting, IconUpload } from '@douyinfe/semi-icons';
import { withSemiIconStyle } from '@/style';

const { useRef, useState, useEffect, useMemo } = React;

const Footer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  vertical-align: middle; /** 指定行内元素（inline）或表格单元格（table-cell）元素的垂直对齐方式 */
`;

const PublishButtonSection = styled.section`
  flex: 1;
  margin: 16px;
  display: flex;
  justify-content: center;
  vertical-align: middle;
  align-items: center;
`;

const FooterToolSection = styled.section`
  flex: 1;
  margin: 18px;
  display: flex;
  justify-content: center;
  vertical-align: middle;
  align-items: center;
`;

const publishButtonStyle: React.CSSProperties = {
  width: 128,
};

const publishButtonIconStyle: React.CSSProperties = {
  marginRight: 10,
  top: 4,
};

interface NavFooterProps {}

const NavFooter: React.FC<NavFooterProps> = (props: NavFooterProps) => (
  <Footer>
    <PublishButtonSection>
      <Button
        type="primary"
        shape="round"
        style={publishButtonStyle}
        icon={<IconUpload style={withSemiIconStyle(publishButtonIconStyle)} />}
      >
        发布
      </Button>
    </PublishButtonSection>
    <FooterToolSection>
      <Button type="link" icon={<IconSetting />} />
      <Button type="link" icon={<IconGlobeStroke />} />
      <Button type="link" icon={<IconGithubLogo />} />
      <Button type="link" icon={<IconLanguage />} />
    </FooterToolSection>
  </Footer>
);

export default NavFooter;
