import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Button, Checkbox, Form, Input } from 'antd';
import { withSemiIconStyle } from '@/style';
import { IconArrowRight } from '@douyinfe/semi-icons';

const { useRef, useState, useEffect, useMemo } = React;

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
          <Button type="primary" htmlType="submit" size="large" icon={<IconArrowRight style={withSemiIconStyle()} />} style={{ borderRadius: 36, marginTop: 24 }}>
          </Button>
        </Form.Item>
      </Form>
    </LoginInputSection >
  );
};

export default LoginForm;
