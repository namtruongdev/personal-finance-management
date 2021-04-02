import { GetServerSideProps } from 'next';
import Link from 'next/link';
import React, { useEffect, useMemo } from 'react';

import {
  FacebookFilled,
  GithubOutlined,
  GoogleOutlined,
} from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Form,
  Input,
  Layout,
  message,
  notification,
} from 'antd';
import {
  ButtonIcon,
  ButtonNoBorder,
  CustomButtonForm,
  CustomLayout,
  CustomSider,
  Div,
  DivIcon,
  DivIconPlugin,
  SignTitle,
} from '@components/forms/register/styles';

import { Props } from 'interface/formInterface';
import { providers, signIn, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

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

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const Signup = ({ Providers }: any) => {
  const [session] = useSession();
  const router = useRouter();

  console.log(Providers, 'hihi');

  useEffect(() => {
    if (session) {
      router.push('/');
    }
  }, [session]);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const rep = await fetch('http://localhost:3000/api/signup', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
      body: JSON.stringify({
        email: values.email,
        name: values.name,
        password: values.password,
      }),
    });
    const repData = await rep.json();
    if (rep.status === 200) {
      if (repData.error) {
        notification.warning({
          message: '',
          description: repData.message,
        });
      } else {
        notification.success({
          message: '',
          description: 'Đăng kí thành công',
        });
        router.push('/signin');
      }
    }
  };

  return (
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
            <SignTitle>Đăng ký</SignTitle>
            <DivIcon>
              {/* {Object.values(prd).map((provider) => (
                <DivIconPlugin key={provider.name}>
                  <ButtonNoBorder onClick={() => signIn(provider.id)}>
                    {provider.name === 'Facebook' ? (
                      <ButtonIcon margin="margin">
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
                    {provider.name === 'GitHub' ? (
                      <ButtonIcon>
                        <GithubOutlined style={{ fontSize: '22px' }} />
                      </ButtonIcon>
                    ) : (
                      ''
                    )}
                  </ButtonNoBorder>
                </DivIconPlugin>
              ))} */}
            </DivIcon>
            <SignTitle level={5}>
              <small>hoặc sử dụng email của bạn để đăng ký</small>
            </SignTitle>
            <Form
              {...formItemLayout}
              layout="vertical"
              form={form}
              name="register"
              onFinish={onFinish}
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
                    message: 'Please input your name!',
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
              <Form.Item
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
                  Tôi đã đọc <a href="#">điểu khoản</a>
                </Checkbox>
              </Form.Item>
              <CustomButtonForm>
                <Button type="primary" htmlType="submit">
                  Đăng ký
                </Button>
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
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const Providers = await providers();
  return {
    props: { Providers },
  };
};

export default Signup;
