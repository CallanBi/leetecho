import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Drawer, Typography } from 'antd';
import { COLOR_PALETTE } from 'src/const/theme/color';

const { useRef, useState, useEffect, useMemo } = React;

interface AppSettingDrawerProps {
  visible: boolean;
  onClose: (e: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => void;
}

const AppSettingDrawerContent = styled.section`
  padding: 12;
`;

const AppSettingDrawer: React.FC<AppSettingDrawerProps> = (props: AppSettingDrawerProps) => {
  const { visible, onClose } = props;

  const getDrawerContainer = () => {
    return document.getElementById('appSettingDrawer') || document.body;
  };

  return (
    <section
      css={css`
        .ant-drawer-close {
          position: absolute;
          right: 0;
        }
      `}
      id={'app-setting-drawer'}
    >
      <Drawer
        placement="bottom"
        closable={true}
        visible={visible}
        onClose={onClose}
        height="100%"
        getContainer={getDrawerContainer}
      >
        <AppSettingDrawerContent>
          <Typography.Title level={4}>版本</Typography.Title>
          <Typography.Paragraph>0.1.0</Typography.Paragraph>
          <Typography.Link
            href={'https://github.com/CallanBi/Leetecho'}
            target="_blank"
            style={{ color: COLOR_PALETTE.LEETECHO_LIGHT_BLUE }}
          >
            @Leetecho
          </Typography.Link>
        </AppSettingDrawerContent>
      </Drawer>
    </section>
  );
};

export default AppSettingDrawer;
