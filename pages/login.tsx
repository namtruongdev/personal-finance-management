import { GetServerSideProps, GetServerSidePropsContext } from 'next';

import {
  CustomLayout,
  CustomSider,
  Div,
  DivIcon,
  MissPass,
  SignTitle,
} from '@components/forms/register/styles';
import {
  Button,
  Checkbox,
  Form,
  Input,
  Layout,
  notification,
  Spin,
} from 'antd';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const { Content } = Layout;
export const ButtonSignin = styled(Button)`
  .ant-form-vertical .ant-form-item {
    margin-bottom: 0px !important;
  }
`;
const Signin = () => {
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = async (values: unknown) => {
    setLoading(true);
    const res = await fetch(`http://localhost:3000/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    const results: RESP = await res.json();

    if (!res.ok) {
      notification.error({
        message: results.message,
      });
    }

    notification.success({
      message: results.message,
    });

    setLoading(false);

    return router.replace('/');
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
                    name="username"
                    label="Tên người dùng"
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập tên người dùng!',
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
                        message: 'Vui lòng nhập mật khẩu!',
                      },
                    ]}
                    hasFeedback
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item
                    name="remember"
                    valuePropName="checked"
                    {...tailFormItemLayout}
                  >
                    <Checkbox>Nhớ mật khẩu</Checkbox>
                    <MissPass href="#">Quên mật khẩu?</MissPass>
                  </Form.Item>
                  <Form.Item style={{ marginBottom: '5px' }}>
                    <ButtonSignin
                      type="primary"
                      block
                      htmlType="submit"
                      loading={loading}
                    >
                      Đăng nhập
                    </ButtonSignin>
                  </Form.Item>
                  <p>
                    Không có tài khoản?
                    <Link href="/signup">
                      <a> Đăng ký ngay</a>
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
export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const { req } = ctx;
  const { cookies } = req;
  const { user_id: userId, refresh_token: refreshToken } = cookies;

  if (refreshToken && userId) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }
  return {
    props: {},
  };
};

export default Signin;
