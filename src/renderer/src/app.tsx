import * as React from 'react';
import { Avatar } from 'antd';
import { ReactComponent as LogoHeader } from '@/assets/logo-vertical.svg';
import './index.less';

import { UserOutlined } from '@ant-design/icons';

import type { ProSettings } from '@ant-design/pro-layout';
import ProLayout, { SettingDrawer } from '@ant-design/pro-layout';
import { navConfig } from './routes/index';
import { themeSettings } from './const/theme';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ROUTE } from './const/route';
import { useRouter } from './hooks/router/useRouter';
import { AppStoreContext } from './store/appStore';
import NavFooter from './components/navFooter';

const { useState, useRef, useEffect, useContext } = React;


const headerLogoStyle: React.CSSProperties = {
  marginTop: 100,
  marginBottom: 20
};

const renderLogo: () => React.ReactNode = () => {
  return <section style={headerLogoStyle}><LogoHeader /></section>;
};

const renderNavFooter: () => React.ReactNode = () => <><NavFooter></NavFooter></>;

const App: React.FC<Record<string, never>> = () => {
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>(themeSettings);
  const [path, setPath] = useState<typeof ROUTE[number]['path']>('/settledProblems');

  const { state, dispatch } = useContext(AppStoreContext);

  const router = useRouter();

  return (
    <div
      id="main"
      style={{
        height: '100vh',
      }}
    >
      <ProLayout
        title={false}
        logo={renderLogo()}
        // onCollapse={isCollapsed => {
        //   dispatch({
        //     appActionType: 'change-ui-status',
        //     payload: {
        //       isNavCollapsed: isCollapsed,
        //     },
        //   });
        // }}
        collapsed={false}
        hasSiderMenu={false}
        defaultCollapsed={false}
        menuFooterRender={renderNavFooter}
        collapsedButtonRender={false}
        menuItemRender={(item, dom) => (
          <a
            onClick={() => {
              const { path = 'settledProblems' } = item;
              setPath(path);
              if (router.pathname !== path) {
                router.history.push(path);
              }
            }}
          >
            {dom}
          </a>
        )}
        rightContentRender={() => (
          <div>
            <Avatar shape="square" size="small" icon={<UserOutlined />} />
          </div>
        )}
        {...navConfig}
        {...settings}
        location={{
          pathname: path,
        }}
      >
        <Switch>
          <Route path='/' exact render={() => (
            <Redirect to='/settledProblems' />
          )} />
          {ROUTE.map(route => <Route key={route.name ?? '/settledProblems'} exact path={route.path ?? '/settledProblems'} component={route.component} />)}
        </Switch>
      </ProLayout>
      <SettingDrawer
        pathname={path}
        getContainer={() => document.getElementById('main')}
        settings={settings}
        onSettingChange={(changeSetting) => {
          console.log('%c changeSetting >>>', 'background: yellow; color: blue', changeSetting);
          setSetting(changeSetting);
        }}
        disableUrlParams
      />
    </div>
  );
};

export default App;
