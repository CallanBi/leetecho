import * as React from 'react';
import { ReactComponent as NavLogo } from '@/assets/logo-vertical.svg';
import './index.less';
import type { ProSettings } from '@ant-design/pro-layout';
import ProLayout from '@ant-design/pro-layout';
import { navConfig } from './routes/index';
import { layoutSettings } from './const/layout';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ROUTE } from './const/route';
import { useRouter } from './hooks/router/useRouter';
import { AppStoreContext } from './store/appStore/appStore';
import NavFooter from './components/layout/navFooter';
import Header from './components/layout/header';
// import { ReactQueryDevtools } from 'react-query/devtools';
import Login from './views/login';
import { css } from '@emotion/react';

const { useState, useContext } = React;
const {
  bridge: { isNotProduction },
} = window;

const navLogoStyle: React.CSSProperties = {
  marginTop: 100,
  marginBottom: 20,
};

const renderLogo: () => React.ReactNode = () => (
  <section style={navLogoStyle}>
    <NavLogo />
  </section>
);

const renderNavFooter: () => React.ReactNode = () => <NavFooter />;

const App: React.FC<Record<string, never>> = () => {
  const [settings, _] = useState<Partial<ProSettings> | undefined>(layoutSettings);
  const [path, setPath] = useState<typeof ROUTE[number]['path']>('/allProblems');

  const { state: appState } = useContext(AppStoreContext);

  const {
    userState: { isLogin },
  } = appState;

  const router = useRouter();

  if (router.pathname !== path) {
    setPath(router.pathname);
  }

  return (
    <section
      css={css`
        -webkit-app-region: no-drag;
      `}
    >
      {/* {isNotProduction && <ReactQueryDevtools initialIsOpen={false} />} */}
      {isLogin && (
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
                  const { path = 'allProblems' } = item;
                  setPath(path);
                  if (router.pathname !== path) {
                    router.history.push(path);
                  }
                }}
              >
                {dom}
              </a>
            )}
            headerRender={() => <Header />}
            {...navConfig}
            {...settings}
            location={{
              pathname: path,
            }}
          >
            <Switch>
              <Route path="/" exact render={() => <Redirect to="/allProblems" />} />
              {ROUTE.map((route) => (
                <Route
                  key={route.name ?? '/allProblems'}
                  exact
                  path={route.path ?? '/allProblems'}
                  component={route.component}
                />
              ))}
            </Switch>
          </ProLayout>
          {/* {isNotProduction && <SettingDrawer
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
      )}
      {!isLogin && <Login />}
      <div id="footerModalContainer"></div>
      <div id="appSettingDrawer"></div>
    </section>
  );
};

export default App;
