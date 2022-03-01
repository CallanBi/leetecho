import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Button, Form, Input, message } from 'antd';
import { withSemiIconStyle } from '@/style';
import { IconArrowRight } from '@douyinfe/semi-icons';
import { useLogin } from '@/rendererApi/user';
import { useQuery } from 'react-query';
import { getErrorCodeFromMessage } from '@/rendererApi';
import { AppStoreContext } from '@/store/appStore/appStore';
import { app } from 'electron';

const { useRef, useState, useEffect, useMemo, useContext } = React;

const LoginInputSection = styled.section`
  -webkit-app-region: no-drag;
  .ant-form-item-required {
    ::before {
      visibility: hidden!important;
    }
  }
`;

interface LoginFormProps {
}

const LoginForm: React.FC<LoginFormProps> = (props: LoginFormProps) => {
  const { } = props;
  const [form] = Form.useForm();

  const { state: appState, dispatch: appDispatch } = useContext(AppStoreContext);

  const { userState: { isLogin } } = appState;

  const [loginInfo, setLoginInfo] = useState<{
    isSubmitted: boolean;
    submittedVal: { username: string; password: string; };
  }>({
    isSubmitted: false,
    submittedVal: { username: '', password: '' },
  });

  const { isLoading, isSuccess, isError, data, error } = useLogin({ usrName: loginInfo.submittedVal.username, pwd: loginInfo.submittedVal.password }, loginInfo.isSubmitted);

  const onSubmit = (val: { username: string; password: string; }) => {
    setLoginInfo({
      isSubmitted: true,
      submittedVal: {
        username: val.username,
        password: val.password,
      }
    });
  };

  if (isSuccess) {
    if (loginInfo.isSubmitted) {
      setLoginInfo({ ...loginInfo, isSubmitted: false });
      appDispatch({
        appActionType: 'change-user-status',
        payload: {
          isLogin: true,
        }
      });
      message.success('登录成功');
    }
  }

  if (isError) {
    if (loginInfo.isSubmitted) {
      setLoginInfo({ ...loginInfo, isSubmitted: false });
      if (getErrorCodeFromMessage(error!) === 400) {
        message.error('用户名或密码错误，请重新输入');
      } else {
        message.error('未知错误');
      }
    }
  }


  return (
    <LoginInputSection>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
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

        <Form.Item
          label="LeetCode 密码"
          name="password"
          rules={[{ required: true, message: '请输入 Leetcode 密码' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 11, span: 16 }}>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            icon={<IconArrowRight style={withSemiIconStyle()} />}
            style={{ borderRadius: 36, marginTop: 24 }}
            loading={isLoading}
          >
          </Button>
        </Form.Item>
      </Form>
    </LoginInputSection >
  );
};

export default LoginForm;
