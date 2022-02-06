import * as React from 'react';
import { Avatar } from 'antd';
import { ReactComponent as LogoHeader } from '@/assets/logo-vertical.svg';
import './index.less';

import { UserOutlined } from '@ant-design/icons';

import type { ProSettings } from '@ant-design/pro-layout';
import ProLayout, { SettingDrawer } from '@ant-design/pro-layout';
import { navConfig } from './routes/index';
import { themeSettings } from './const/theme';

const { useState } = React;

// const { bridge: { app } } = window;

// console.log('%c home path >>>', 'background: yellow; color: blue', app.getPath('home'));


const headerLogoStyle: React.CSSProperties = {
  marginTop: 100,
  marginBottom: 20
};

const renderLogo: () => React.ReactNode = () => {
  return <section style={headerLogoStyle}><LogoHeader /></section>;
};

function App() {
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>(themeSettings);
  const [pathname, setPathname] = useState('/welcome');
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
        /** TODO: collapsed 状态由 Context 管理*/
        collapsed={false}
        collapsedButtonRender={() => <></>}
        {...navConfig}
        // onMenuHeaderClick={(e) => console.log('%c header e >>>', 'background: yellow; color: blue', e)
        // }
        rightContentRender={() => (
          <div>
            <Avatar shape="square" size="small" icon={<UserOutlined />} />
          </div>
        )}
        {...settings}
      >
      </ProLayout>
      <SettingDrawer
        pathname={pathname}
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
}

export default App;
