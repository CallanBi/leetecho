/* eslint-disable indent */
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

/** It's even slower after code splitting */

// const AllProblems = withSuspend(React.lazy(() => import('@/views/allProblems')));
// const TemplateManagement = withSuspend(React.lazy(() => import('@/views/templateManagement')));
// const RemoteSettings = withSuspend(React.lazy(() => import('@/views/remoteSettings')));
// const ProblemDetail = withSuspend(React.lazy(() => import('@/views/problemDetail')));

import AllProblems from '@/views/allProblems';
import TemplateManagement from '@/views/templateManagement';
import RemoteSettings from '@/views/remoteSettings';
import ProblemDetail from '@/views/problemDetail';

import { MenuDataItem } from '@ant-design/pro-layout/lib/typings';
import { IconList, IconTemplate, IconServer } from '@douyinfe/semi-icons';

import { withSemiIconStyle } from '@/style';

const navIconStyle: React.CSSProperties = {
  marginLeft: 16,
  marginRight: 8,
};

const ROUTE: Array<
MenuDataItem & {
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any> | undefined;
}
> = [
  // {
  //   path: '/settledProblems',
  //   name: '已刷习题',
  //   icon: <IconCheckList style={withSemiIconStyle(navIconStyle)} />,
  //   component: SettledProblems,
  // },
  {
    path: '/allProblems',
    name: '所有习题',
    icon: <IconList style={withSemiIconStyle(navIconStyle)} />,
    component: AllProblems,
  },
  {
    name: '模板管理',
    icon: <IconTemplate style={withSemiIconStyle(navIconStyle)} />,
    path: '/templateManagement',
    component: TemplateManagement,
  },
  {
    path: '/remoteSettings',
    name: ' 远程设置',
    icon: <IconServer style={withSemiIconStyle(navIconStyle)} />,
    component: RemoteSettings,
  },
  {
    path: '/problemDetail',
    name: '题目详情',
    hideInMenu: true,
    component: ProblemDetail,
  },
];

export { ROUTE };
