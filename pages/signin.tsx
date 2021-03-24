import { FacebookFilled, GoogleOutlined } from '@ant-design/icons';
import {
  ButtonNoBorder,
  CustomLayout,
  CustomSider,
  DivIconPlugin,
} from '@components/forms/register/styles';
import { Button, Checkbox, Form, Input, Layout } from 'antd';
import { providers, signIn } from 'next-auth/client';
import { Provider } from 'next-auth/providers';
import Link from 'next/link';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { ButtonIcon, Div, DivIcon, TitleH1 } from './signup';
import firebaseDb from './firebase';
import 'firebase/auth';

export interface Props {
  providers?: Provider;
  // csrfToken: unknown
}
const { Content } = Layout;
export const ButtonSignin = styled(Button)`
  .ant-form-vertical .ant-form-item {
    margin-bottom: 0px !important;
  }
`;
// eslint-disable-next-line @typescript-eslint/no-shadow
const Signin = ({ providers }: Props) => {
  const [form] = Form.useForm();
  const onFinish = (values: unknown) => {
    // console.log('Received values of form: ', values);
    handleLogin(values);
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
  const handleLogin = (values) => {
    firebaseDb
      .auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then((res) => {
        // eslint-disable-next-line no-console
        console.log(res, 'lrrn +++++++');
      })

      .catch((err) => {
        switch (err.code) {
          case 'auth/invalid-email':
          case 'auth/user-disabled':
          case 'auth/user-not-found':
            break;
          case 'auth/wrong-password':
            break;
        }
        // eslint-disable-next-line no-console
        console.log(err, 'check lỗi ::::::::');
      });
    // eslint-disable-next-line no-console
    console.log('test key =============');
  };
  return (
    <div>
      <CustomLayout>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Layout>
          <Content
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Div>
              <TitleH1>Đăng nhập</TitleH1>
              <Form
                {...formItemLayout}
                layout="vertical"
                form={form}
                name="register"
                onFinish={onFinish}
                scrollToFirstError
              >
                <DivIcon>
                  {Object.values(providers).map((provider) => (
                    <DivIconPlugin key={provider.name}>
                      <form>
                        <ButtonNoBorder
                          type="button"
                          onClick={() => signIn(provider.id)}
                        >
                          {provider.name === 'Facebook' ? (
                            <ButtonIcon primary margin>
                              <FacebookFilled
                                style={{ fontSize: 22, marginRight: '10px' }}
                              />
                            </ButtonIcon>
                          ) : (
                            ''
                          )}
                          {provider.name === 'Google' ? (
                            <ButtonIcon>
                              <GoogleOutlined style={{ fontSize: '22px' }} />
                            </ButtonIcon>
                          ) : (
                            ''
                          )}
                          {provider.name === 'GitHub' ? <GhIcon /> : ''}
                        </ButtonNoBorder>
                      </form>
                    </DivIconPlugin>
                  ))}
                </DivIcon>
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
                  name="agreement"
                  valuePropName="checked"
                  {...tailFormItemLayout}
                >
                  <Checkbox>Nhớ mật khẩu</Checkbox>
                  <a style={{ float: 'right' }} href="">
                    Quên mật khẩu?
                  </a>
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
  );
};

export default Signin;
const GhIcon = () => (
  <ButtonIcon>
    <img
      height="22"
      alt="github"
      width="22"
      src="https://unpkg.com/simple-icons@v4/icons/github.svg"
    />
  </ButtonIcon>
);
Signin.getInitialProps = async (context) => ({
  providers: await providers(),
});
