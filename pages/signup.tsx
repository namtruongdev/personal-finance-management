import AfterSignup from '@components/forms/login/afterSignup';
import { SigninFb, SigninGg } from '@components/forms/login/allSignin';
import {
  CustomButtonForm,
  CustomLayout,
  CustomSider,
  Div,
  DivIcon,
  TitleH1,
} from '@components/forms/register/styles';
import { Button, Checkbox, Form, Input, Layout, message } from 'antd';
import 'firebase/auth';
import { providers, useSession } from 'next-auth/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import firebaseDb from './firebase';
import { Props } from './signin';

const { Content } = Layout;

export const success = () => {
  message.success('done', 1);
};
const tailFormItemLayout = {
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
};

// eslint-disable-next-line @typescript-eslint/no-shadow
const Signup = ({ providers }: Props) => {
  const [session] = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session) {
      router.push('/');
    }
  }, [session]);
  const [form] = Form.useForm();
  const [isUser, setIsUser] = useState(true);
  const setFormBlank = () => {
    form.resetFields();
  };
  const onFinish = (values: unknown) => {
    handleSignup(values);
  };
  const formItemLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };

  // eslint-disable-next-line no-console

  const handleSignup = (values) => {
    firebaseDb
      .auth()
      .createUserWithEmailAndPassword(values.email, values.password)
      .then((res) => {
        success();
        setIsUser(res.user.emailVerified);
        setFormBlank();
      })
      .catch((err) => {
        switch (err.code) {
          case 'auth/email-already-in-use':
          case 'auth/invalid-email':
            form.setFields([
              {
                name: 'email',
                errors: ['Email đã tồn tại !'],
              },
            ]);
            break;
          case 'auth/weak-password':
            break;
        }
      });
  };
  return !isUser ? (
    <AfterSignup />
  ) : (
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
              <TitleH1>Đăng ký</TitleH1>
              <DivIcon>
                <SigninGg />
                <SigninFb />
              </DivIcon>
              <TitleH1 level={5}>
                <small>hoặc sử dụng email của bạn để đăng ký</small>
              </TitleH1>
              <Form
                {...formItemLayout}
                layout="vertical"
                form={form}
                name="register"
                onFinish={onFinish}
                // onFinishFailed={handleOnFinishFailed}
                // onValuesChange={onValuesChange}
                scrollToFirstError
              >
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
                  name="name"
                  label="Tên người dùng"
                  rules={[
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
                  label="Mật khảu"
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
                  name="confirm"
                  label="Xác nhận mật khẩu"
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            'The two passwords that you entered do not match!'
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <CustomButtonForm
                  name="agreement"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject(
                              new Error('Làm ơn chấp nhận điều khoản')
                            ),
                    },
                  ]}
                  {...tailFormItemLayout}
                >
                  <Checkbox>
                    Tôi đã đọc
                    <a href="javascript:void(0)">điểu khoản</a>
                  </Checkbox>
                  <Link href="/signin">
                    <a>
                      <Button type="primary">Đăng nhập</Button>
                    </a>
                  </Link>
                </CustomButtonForm>
              </Form>
            </Div>
          </Content>
        </Layout>
        <CustomSider>Sider</CustomSider>
      </CustomLayout>
    </div>
  );
};

export default Signup;
// const GhIcon = () => (
//   <ButtonIcon>
//     <img
//       height="22"
//       width="22"
//       alt="github"
//       src="https://unpkg.com/simple-icons@v4/icons/github.svg"
//     />
//   </ButtonIcon>
// );

Signup.getInitialProps = async (context) => ({
  providers: await providers(),
});
