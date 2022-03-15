import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const { useRef, useState, useEffect, useMemo } = React;

import { Tabs } from 'antd';

const { TabPane } = Tabs;

interface TemplateManagementProps {}

const TemplateManagement: React.FC<TemplateManagementProps> = (props: TemplateManagementProps) => {
  const {} = props;

  return (
    <>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="封面模板" key="coverTemplate">
          封面模板
        </TabPane>
        <TabPane tab="题目模板" key="problemTemplate">
          题目模板
        </TabPane>
      </Tabs>
    </>
  );
};

export default TemplateManagement;
