import { FacebookFilled, GoogleOutlined } from '@ant-design/icons';
import {
  ButtonIcon,
  ButtonNoBorder,
  CustomLayout,
  CustomSider,
  Div,
  DivIcon,
  DivIconPlugin,
  TitleH1,
} from '@components/forms/register/styles';
import { Button, Checkbox, Form, Input, Layout } from 'antd';
import 'firebase/auth';
import { providers, signIn, useSession } from 'next-auth/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import jwt from 'jsonwebtoken';
import { FormSignup, Props } from '@components/forms/register/intef';
import { success } from './signup';

const { Content } = Layout;
export const ButtonSignin = styled(Button)`
  .ant-form-vertical .ant-form-item {
    margin-bottom: 0px !important;
  }
`;
// const reSetPass = () => {
//   message.warning('email ko xac dinh');
// };
const Signin = ({ providers: signInProviders }: Props) => {
  const [session] = useSession();
  useEffect(() => {
    if (session) {
      router.push('/');
    }
  }, [session]);
  const [form] = Form.useForm();
  const router = useRouter();
  const onFinish = (values: FormSignup) => {
    if (
      values.email === decoded.email &&
      values.password === decoded.password
    ) {
      success();
    } else {
      window.alert('sai tai khoan hoac mat khau');
    }
    // console.log('Received values of form: ', values);
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
  const cat = localStorage?.getItem('myCat');
  const decoded = jwt.verify(cat, 'hieuc');
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
                  {Object.values(signInProviders).map((provider) => (
                    <DivIconPlugin key={provider.name}>
                      <form>
                        <ButtonNoBorder
                          type="button"
                          onClick={() => signIn(provider.id)}
                        >
                          {provider.name === 'Facebook' ? (
                            <ButtonIcon margin>
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
                          {provider.name === 'GitHub' ? <GhIcons /> : ''}
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
                  <a style={{ float: 'right' }} href="#">
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
const GhIcons = () => (
  <ButtonIcon>
    <img
      height="22"
      width="22"
      alt="github"
      src="https://unpkg.com/simple-icons@v4/icons/github.svg"
    />
  </ButtonIcon>
);
export default Signin;
export async function getStaticProps() {
  return {
    providers: await providers(),
  };
}
