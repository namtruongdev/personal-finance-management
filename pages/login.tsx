import React, { useEffect, useMemo, useState } from 'react';
import {
  Button,
  Checkbox,
  Form,
  Input,
  Layout,
  notification,
  Spin,
} from 'antd';
import type {GetServerSidePropsContext} from 'next'

import {
  CustomLayout,
  CustomSider,
  Div,
  DivIcon,
  MissPass,
  SignTitle,
} from '@components/forms/register/styles';
import { useSession } from 'next-auth/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import {withAuth} from '@utils/auth/index'
const { Content } = Layout;
export const ButtonSignin = styled(Button)`
  .ant-form-vertical .ant-form-item {
    margin-bottom: 0px !important;
  }
`;
const Signin = () => {
  const [session] = useSession();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (session) {
      // router.push('/');
    }
  }, [session]);
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = async (values: unknown) => {
    setLoading(true);
    const loginApi = await fetch(`http://localhost:3000/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    const result = await loginApi.json();

    if (result.status === 'success' && result.token) {
      router.push('/');

      setLoading(false);
    } else {
      setLoading(false);
      notification.warning({
        message: '',
        description: 'Đăng nhập thất bại',
      });
    }
  };

  const formItemLayout = useMemo(
    () => ({
      labelCol: { span: 24 },
      wrapperCol: { span: 24 },
    }),
    []
  );
  const tailFormItemLayout = useMemo(
    () => ({
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 24,
          offset: 0,
        },
      },
    }),
    []
  );

  return (
    <Spin spinning={loading}>
      <div>
        <CustomLayout>
          <Layout>
            <Content
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Div>
                <SignTitle>Đăng nhập</SignTitle>
                <Form
                  {...formItemLayout}
                  layout="vertical"
                  form={form}
                  name="register"
                  onFinish={onFinish}
                  scrollToFirstError
                >
                  <DivIcon />
                  <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                      {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                      },
                      {
                        required: true,
                        message: 'Please input your E-mail!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    label="Mật khẩu"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your password!',
                      },
                    ]}
                    hasFeedback
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item
                    // name="agreement"
                    valuePropName="checked"
                    {...tailFormItemLayout}
                  >
                    <Checkbox>Nhớ mật khẩu</Checkbox>
                    <MissPass href="#">Quên mật khẩu?</MissPass>
                  </Form.Item>
                  <Form.Item style={{ marginBottom: '5px' }}>
                    <ButtonSignin type="primary" block htmlType="submit">
                      Đăng nhập
                    </ButtonSignin>
                  </Form.Item>
                  <p>
                    <Link href="/signup">
                      <a>Đăng ký ngay</a>
                    </Link>
                  </p>
                </Form>
              </Div>
            </Content>
          </Layout>
          <CustomSider>Sider</CustomSider>
        </CustomLayout>
      </div>
    </Spin>
  );
};

export const getServerSideProps = withAuth(ctx: getServerSidePropsContext)
export default Signin;
