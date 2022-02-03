import * as React from 'react';
import { Button, Descriptions, Result, Avatar, Space, Statistic } from 'antd';
import Logo from '@/assets/logo.png';
import './index.less';

import { LikeOutlined, UserOutlined } from '@ant-design/icons';

import type { ProSettings } from '@ant-design/pro-layout';
import ProLayout, { PageContainer, SettingDrawer } from '@ant-design/pro-layout';
import { navConfig } from './routes/index';
import { themeSettings } from './const/theme';

const { useState } = React;

const renderLogo: () => React.ReactNode = () => {
  return <><img src={Logo} alt="Leetecho" style={{ height: 80 }} /></>;
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
        /**TODO: collapsed 状态由 Context 管理*/
        collapsed={false}
        collapsedButtonRender={() => <></>}
        {...navConfig}
        onMenuHeaderClick={(e) => console.log('%c header e >>>', 'background: yellow; color: blue', e)
        }
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
          setSetting(changeSetting);
        }}
        disableUrlParams
      />
    </div>
  );
};

export default App;
