import { SigninFb, SigninGg } from '@components/forms/login/allSignin';
import {
  CustomLayout,
  CustomSider,
  TitleH1,
} from '@components/forms/register/styles';
import { Button, Checkbox, Form, Input, Layout, message } from 'antd';
import 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import firebaseDb from './firebase';
import { Div, DivIcon, success } from './signup';

const { Content } = Layout;
export const ButtonSignin = styled(Button)`
  .ant-form-vertical .ant-form-item {
    margin-bottom: 0px !important;
  }
`;
const reSetPass = () => {
  message.warning('email ko xac dinh');
};
// eslint-disable-next-line @typescript-eslint/no-shadow
const Signin = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [emailMissPass, setEmailMissPass] = useState('');
  const onFinish = (values: unknown) => {
    handleLogin(values);
  };
  const checkUs = () => {
    router.push('/');
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
      .then(() => checkUs());
  };

  const missPass = () => {
    const auth = firebaseDb.auth();
    const emailAddress = emailMissPass[0]?.value;
    auth
      .sendPasswordResetEmail(emailAddress)
      .then((res) => {
        success();
      })
      .catch((error) => {
        reSetPass();
      });
  };
  const onFieldChange = (one, all) => {
    const email = all.filter((item) => item.name[0] === 'email');
    setEmailMissPass(email);
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
                onFieldsChange={onFieldChange}
              >
                <DivIcon>
                  <SigninGg />
                  <SigninFb />
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
                  <a style={{ float: 'right' }} href="#" onClick={missPass}>
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
