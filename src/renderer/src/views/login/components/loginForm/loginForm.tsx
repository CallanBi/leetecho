import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Button, Form, Input, message, Checkbox } from 'antd';
import { IconArrowRight } from '@douyinfe/semi-icons';
import { withSemiIconStyle } from '@/style';
import { useLogin } from '@/rendererApi/user';
import { getErrorCodeFromMessage } from '@/rendererApi';
import { AppStoreContext } from '@/store/appStore/appStore';
import { COLOR_PALETTE } from 'src/const/theme/color';
import store, { EndPoint, User, UserConfig, UserGroup } from '@/storage/electron-store';
import to from 'await-to-js';

const {
  bridge: { ipcRenderer },
} = window;

const { useRef, useState, useEffect, useMemo, useContext } = React;

const LoginInputSection = styled.section`
  -webkit-app-region: no-drag;
  .ant-form-item-required {
    ::before {
      visibility: hidden !important;
    }
  }
`;

const [_err, userConfig] = await to(store.get('userConfig'));

interface LoginFormProps {}

const LoginForm: React.FC<LoginFormProps> = (props: LoginFormProps) => {
  const {} = props;
  const [form] = Form.useForm();

  const { state: appState, dispatch: appDispatch } = useContext(AppStoreContext);

  const [loginInfo, setLoginInfo] = useState<{
    isSubmitted: boolean;
    submittedVal: { username: string; password: string; isUserRemembered: boolean };
  }>({
    isSubmitted: false,
    submittedVal: { username: '', password: '', isUserRemembered: false },
  });

  const handleUserStatus = async () => {
    // get user status from electron-store
    const [_, users = []] = (await to(store.get('userConfig.users.CN'))) as
      | [Error, undefined]
      | [null, UserGroup['CN']];
    const user = users.findIndex((u) => u.usrName === (loginInfo?.submittedVal?.username || ''));
    // if user is not found, then create a new user
    if (user !== -1) {
      store.set('userConfig.users.CN', [
        ...users.slice(0, user),
        { ...users[user], pwd: loginInfo?.submittedVal?.password || '', endPoint: 'CN' },
        ...users.slice(user + 1),
      ] as User[]);
    } else {
      store.set('userConfig.users.CN', [
        ...users,
        {
          usrName: loginInfo?.submittedVal?.username || '',
          pwd: loginInfo?.submittedVal?.password || '',
          endPoint: 'CN',
        },
      ] as User[]);
    }
    // update user config
    await to(
      Promise.all([
        store.set('userConfig.lastLoginUser', { usrName: loginInfo?.submittedVal?.username || '', endPoint: 'CN' }),
        store.set(
          'userConfig.isUserRemembered',
          (loginInfo?.submittedVal?.isUserRemembered || false) as unknown as CascadeSelectProps<UserConfig>,
        ),
      ]),
    );

    // update app state
    appDispatch({
      appActionType: 'change-user-status',
      payload: {
        isLogin: true,
        usrName: loginInfo?.submittedVal?.username || '',
        endPoint: 'CN',
      },
    });

    // // read user template config from local folder
    // const [readUserTemplateErr, userTemplates] = (await to(
    //   ipcRenderer.invoke('readUserTemplate', {
    //     userInfo: {
    //       usrName: loginInfo?.submittedVal?.username || '',
    //       endPoint: 'CN' as EndPoint,
    //     },
    //   } as ReadUserTemplateReq),
    // )) as ReadUserTemplateResp;
    // if (readUserTemplateErr) {
    //   /** noop */
    // }

    // if template is not found, then create a new template
    await to(
      ipcRenderer.invoke('createTemplate', {
        userInfo: {
          usrName: loginInfo?.submittedVal?.username || '',
          endPoint: 'CN' as EndPoint,
        },
      } as CreateTemplateReq),
    );
  };

  const onLoginSuccess = async () => {
    if (loginInfo.isSubmitted) {
      setLoginInfo({ ...loginInfo, isSubmitted: false });
      message.success('登录成功');
    }
    await to(handleUserStatus());
  };

  const onLoginError = (error: Error) => {
    if (loginInfo.isSubmitted) {
      setLoginInfo({ ...loginInfo, isSubmitted: false });
      if (getErrorCodeFromMessage(error) === 400) {
        message.error('用户名或密码错误，请重新输入');
      } else {
        message.error('未知错误');
      }
    }
  };

  const { isLoading } = useLogin(
    {
      usrName: loginInfo.submittedVal.username,
      pwd: loginInfo.submittedVal.password,
    },
    loginInfo.isSubmitted,
    onLoginSuccess,
    onLoginError,
  );

  const onSubmit = (val: { username: string; password: string; isUserRemembered: boolean }) => {
    setLoginInfo({
      isSubmitted: true,
      submittedVal: {
        username: val.username,
        password: val.password,
        isUserRemembered: val.isUserRemembered,
      },
    });
  };

  const lastLoginUserPwd = userConfig?.users?.['CN']?.find(
    (u) => u?.usrName === userConfig?.lastLoginUser?.usrName,
  )?.pwd;

  return (
    <LoginInputSection>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{
          username: userConfig?.isUserRemembered ? userConfig?.lastLoginUser?.usrName || '' : undefined,
          password: userConfig?.isUserRemembered ? lastLoginUserPwd || '' : undefined,
          isUserRemembered: userConfig?.isUserRemembered || false,
        }}
        autoComplete="off"
        requiredMark={false}
        labelAlign="right"
        form={form}
        onFinish={onSubmit}
      >
        <Form.Item
          label="LeetCode 用户名"
          name="username"
          rules={[{ required: true, message: '请输入 Leetcode 用户名' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="LeetCode 密码" name="password" rules={[{ required: true, message: '请输入 Leetcode 密码' }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 10, span: 16 }} label="" name="isUserRemembered" valuePropName="checked">
          <Checkbox>记住我</Checkbox>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 11, span: 16 }}>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            icon={<IconArrowRight style={withSemiIconStyle()} />}
            style={{ borderRadius: 36, marginTop: 12 }}
            loading={isLoading}
          />
        </Form.Item>
      </Form>
    </LoginInputSection>
  );
};

export default LoginForm;
