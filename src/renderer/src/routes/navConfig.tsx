import * as React from 'react';
import { BasicLayoutProps } from '@ant-design/pro-layout';
import { IconCheckList, IconList, IconTemplate, IconServer } from '@douyinfe/semi-icons';

const withIconStyle: (style?: React.CSSProperties | undefined) => React.CSSProperties = (style) => {
  return {
    ...style,
    marginLeft: 16,
    marginRight: 8,
    position: 'relative',
    top: 3,
  };
};

const navConfig: BasicLayoutProps = {
  route: {
    path: '/',
    routes: [
      {
        path: '/settledProblems',
        name: '已刷习题',
        icon: <IconCheckList style={withIconStyle()} />,
        component: './Welcome',
      },
      {
        path: '/allProblems',
        name: '所有习题',
        icon: <IconList style={withIconStyle()}/>,
        access: 'canAdmin',
        component: './Admin',
      },
      {
        name: '默认模板',
        icon: <IconTemplate style={withIconStyle()}/>,
        path: '/defaultTemplate',
        component: './ListTableList',
      },
      {
        path: '/remoteSettings',
        name: ' 远程设置',
        icon: <IconServer style={withIconStyle()}/>,
        component: './Welcome',
      },
    ],
  },
  location: {
    pathname: '/',
  },
};

export { navConfig };