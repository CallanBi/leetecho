import * as React from 'react';
import { Avatar } from 'antd';
import { ReactComponent as NavLogo } from '@/assets/logo-vertical.svg';
import './index.less';

import { UserOutlined } from '@ant-design/icons';

import type { ProSettings } from '@ant-design/pro-layout';
import ProLayout, { SettingDrawer } from '@ant-design/pro-layout';
import { navConfig } from './routes/index';
import { layoutSettings } from './const/layout';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ROUTE } from './const/route';
import { useRouter } from './hooks/router/useRouter';
import { AppStoreContext } from './store/appStore/appStore';
import NavFooter from './components/layout/navFooter';
import Header, { HeaderRightContent } from './components/layout/header';

const { useState, useRef, useEffect, useContext, useMemo } = React;
const { bridge: { isDev } } = window;



const navLogoStyle: React.CSSProperties = {
  marginTop: 100,
  marginBottom: 20
};

const renderLogo: () => React.ReactNode = () => {
  return <section style={navLogoStyle}><NavLogo /></section>;
};

const renderNavFooter: () => React.ReactNode = () => <><NavFooter></NavFooter></>;

const App: React.FC<Record<string, never>> = () => {
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>(layoutSettings);
  const [path, setPath] = useState<typeof ROUTE[number]['path']>('/settledProblems');

  const { state, dispatch } = useContext(AppStoreContext);

  const { uiStatus: { isNavCollapsed } } = state;

  const router = useRouter();

  return useMemo(() => (
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
        headerRender={() => <Header></Header>}
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
      {/* {isDev && <SettingDrawer
        pathname={path}
        getContainer={() => document.getElementById('main')}
        settings={settings}
        onSettingChange={(changeSetting) => {
          console.log('%c changeSetting >>>', 'background: yellow; color: blue', changeSetting);
          setSetting(changeSetting);
        }}
        disableUrlParams
      />} */}
    </div>
  ), [isNavCollapsed, path]);
};

export default App;
