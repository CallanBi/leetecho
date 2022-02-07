/* eslint-disable indent */
import { MenuDataItem } from '@ant-design/pro-layout/lib/typings';
import { IconCheckList, IconList, IconTemplate, IconServer } from '@douyinfe/semi-icons';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import AllProblems from '@/views/allProblems';
import DefaultTemplate from '@/views/defaultTemplate';
import RemoteSettings from '@/views/remoteSettings';
import SettledProblems from '@/views/settledProblems';


const withIconStyle: (style?: React.CSSProperties | undefined) => React.CSSProperties = (style) => {
  return {
    ...style,
    marginLeft: 16,
    marginRight: 8,
    position: 'relative',
    top: 3,
  };
};


const ROUTE: Array<
  MenuDataItem & {
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any> | undefined;
  }
> = [
    {
      path: '/settledProblems',
      name: '已刷习题',
      icon: <IconCheckList style={withIconStyle()} />,
      component: SettledProblems,
    },
    {
      path: '/allProblems',
      name: '所有习题',
      icon: <IconList style={withIconStyle()} />,
      component: AllProblems,
    },
    {
      name: '默认模板',
      icon: <IconTemplate style={withIconStyle()} />,
      path: '/defaultTemplate',
      component: DefaultTemplate,
    },
    {
      path: '/remoteSettings',
      name: ' 远程设置',
      icon: <IconServer style={withIconStyle()} />,
      component: RemoteSettings,
    },
  ];

export {
  ROUTE,
};
