import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Button, Form, Input, message, PageHeader } from 'antd';
import Footer from '@/components/layout/footer';
import { IconSave } from '@douyinfe/semi-icons';
import { withSemiIconStyle } from '@/style';
import { AppStoreContext } from '@/store/appStore/appStore';
import to from 'await-to-js';
import store, { EndPoint, User, UserConfig, UserGroup } from '@/storage/electronStore';
import { useQuery } from 'react-query';
import { useCheckRepoConnection } from '@/rendererApi/user';

const {
  bridge: { ipcRenderer },
} = window;

// const [_err, userConfig] = await to(store.get('userConfig'));

const { useRef, useState, useEffect, useMemo } = React;

const RemoteSettingSection = styled.section`
  width: 100%;
`;

const RemoteSettingFormSection = styled.section`
  width: 75%;
  margin: 0 auto;
`;

interface RemoteSettingsProps {}

const RemoteSettings: React.FC<RemoteSettingsProps> = (props: RemoteSettingsProps) => {
  const {} = props;

  const { state: appState, dispatch: appDispatch } = React.useContext(AppStoreContext);

  const [fetchStoreUsersQuery, setFetchStoreUsersQuery] = useState<{
    enableRequest: boolean;
    onSuccess: (value: User[]) => void;
    onError: (error: Error) => void;
  }>({
        enableRequest: true,
        onSuccess: () => {
          // do nothing
          setFetchStoreUsersQuery({
            ...fetchStoreUsersQuery,
            enableRequest: false,
          });
        },
        onError: () => {
          message.error('获取用户信息失败');
          setFetchStoreUsersQuery({
            ...fetchStoreUsersQuery,
            enableRequest: false,
          });
        },
      });

  const [checkRepoConnectionQuery, setCheckRepoConnectionQuery] = useState<{
    enableRequest: boolean;
    onSuccess: (value: SuccessResp<Record<string, never>>) => void;
    onError: (error: Error) => void;
  }>({
        enableRequest: false,
        onSuccess: () => {
          message.success('🎉 连接成功，去发布吧~');
          setCheckRepoConnectionQuery({
            ...checkRepoConnectionQuery,
            enableRequest: false,
          });
        },
        onError: (error) => {
          message.error(error.message ? `仓库链接检测失败, 错误信息：${error.message}` : '仓库链接检测失败');
          setCheckRepoConnectionQuery({
            ...checkRepoConnectionQuery,
            enableRequest: false,
          });
        },
      });

  const {
    userState: { endPoint, usrName },
  } = appState;

  const { data: userConfig } = useQuery(
    ['fetchStoreUserConfig', 'userConfig'],
    async () => {
      const [err, userConfig] = (await to(store.get('userConfig'))) as [Error, undefined] | [UserConfig];
      if (err) {
        throw new Error('未找到用户信息，请重新登录后再尝试');
      }
      return userConfig as any as UserConfig;
    },
    {
      enabled: fetchStoreUsersQuery?.enableRequest,
      onSuccess: fetchStoreUsersQuery?.onSuccess,
      onError: fetchStoreUsersQuery?.onError,
      cacheTime: 0,
    },
  ) as any as { data: UserConfig };

  console.log('%c userConfig >>>', 'background: yellow; color: blue', userConfig);

  const thisUser: User = useMemo(
    () => userConfig?.users?.[endPoint || 'CN']?.find((user) => user?.usrName === appState.userState.usrName) || {},
    [userConfig, endPoint, appState.userState.usrName],
  ) as User;

  console.log('%c thisUser >>>', 'background: yellow; color: blue', thisUser);

  const { isLoading: isCheckRepoConnectionLoading } = useCheckRepoConnection(
    {
      repoName: thisUser?.appSettings?.repoName || '',
      branch: thisUser?.appSettings?.branch || '',
      userName: thisUser?.appSettings?.userName || '',
      email: thisUser?.appSettings?.email || '',
      token: thisUser?.appSettings?.token || '',
    },
    {
      enabled: checkRepoConnectionQuery?.enableRequest,
      onSuccess: checkRepoConnectionQuery?.onSuccess,
      onError: checkRepoConnectionQuery?.onError,
      cacheTime: 0,
    },
  );

  const [form] = Form.useForm();

  /** forcefully set form's initial value */
  form.setFields([
    { name: 'userName', value: thisUser?.appSettings?.userName || '' },
    { name: 'repoName', value: thisUser?.appSettings?.repoName },
    { name: 'branch', value: thisUser?.appSettings?.branch || 'main' },
    { name: 'email', value: thisUser?.appSettings?.email || '' },
    { name: 'token', value: thisUser?.appSettings?.token || '' },
  ] as {
    name: keyof User['appSettings'];
    value: User['appSettings'][keyof User['appSettings']];
  }[]);

  const onSubmit = async (val: {
    repoName: string;
    branch: string;
    userName: string;
    email: string;
    token: string;
  }) => {
    if (!userConfig?.users) {
      message.error('未找到用户，请重新登录后再尝试');
    }
    const thisUserIdx = userConfig?.users?.[endPoint || 'CN']?.findIndex((u) => u?.usrName === (usrName || '')) || 0;

    const [err, _] = await to(
      (async () => {
        await to(
          store.set(`userConfig.users.${endPoint}`, [
            ...(userConfig?.users?.[endPoint || 'CN']?.slice(0, thisUserIdx) || []),
            {
              ...(userConfig?.users?.[endPoint || 'CN']?.[thisUserIdx] || {}),
              appSettings: {
                ...(userConfig?.users?.[endPoint || 'CN']?.[thisUserIdx]?.appSettings || {}),
                repoName: val.repoName,
                branch: val.branch,
                userName: val.userName,
                email: val.email,
                token: val.token,
              },
            },
            ...(userConfig?.users?.[endPoint || 'CN']?.slice(thisUserIdx + 1) || []),
          ]),
        );
        await to(
          store.set('userConfig.lastLoginUser', {
            ...(userConfig?.lastLoginUser || {}),
            appSettings: {
              ...(userConfig?.lastLoginUser?.appSettings || {}),
              repoName: val.repoName,
              branch: val.branch,
              userName: val.userName,
              email: val.email,
              token: val.token,
            },
          } as any as UserConfig['lastLoginUser']),
        );
      })(),
    );

    if (err) {
      message.error(err?.message ? `保存失败, 错误信息：${err.message}` : '保存失败，未知错误');
    }

    message.success('保存成功');
  };

  return (
    <RemoteSettingSection>
      <RemoteSettingFormSection>
        <Form name="basic" autoComplete="off" labelAlign="right" form={form} onFinish={onSubmit} layout="vertical">
          <Form.Item label="Github 仓库名称" name="repoName" rules={[{ required: true, message: '请输入仓库名称' }]}>
            <Input placeholder="如：my-leetcode-notes" />
          </Form.Item>

          <Form.Item label="分支" name="branch" rules={[{ required: true, message: '请输入分支名称' }]}>
            <Input placeholder="如：main" />
          </Form.Item>

          <Form.Item label="仓库用户名" name="userName" rules={[{ required: true, message: '请输入用户名' }]}>
            <Input placeholder="你所期望的仓库 Owner 名称，如：CallanBi" />
          </Form.Item>

          <Form.Item label="邮箱" name="email" rules={[{ required: true, message: '请输入邮箱' }]}>
            <Input placeholder="Github 账户的邮箱" />
          </Form.Item>

          <Form.Item label="令牌" name="token" rules={[{ required: true, message: '请输入 token' }]}>
            <Input.Password placeholder="查看说明文档了解如何生成令牌" />
          </Form.Item>
        </Form>
      </RemoteSettingFormSection>
      <Footer
        style={{
          width: '100%',
          marginLeft: -21,
        }}
      >
        <section
          style={{
            width: '73%',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'row-reverse',
          }}
        >
          <Button
            type="primary"
            style={{
              marginRight: 9,
            }}
            icon={
              <IconSave
                style={withSemiIconStyle({
                  paddingRight: 12,
                })}
              />
            }
            onClick={() => {
              form.submit();
            }}
          >
            保存
          </Button>
          <Button
            style={{
              marginRight: 12,
            }}
            loading={isCheckRepoConnectionLoading}
            onClick={() => {
              setCheckRepoConnectionQuery({
                ...checkRepoConnectionQuery,
                enableRequest: true,
              });
            }}
          >
            检查仓库连接
          </Button>
        </section>
      </Footer>
    </RemoteSettingSection>
  );
};

export default RemoteSettings;
