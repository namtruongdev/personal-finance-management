/* eslint-disable max-len */
import { FacebookFilled, GoogleOutlined } from '@ant-design/icons';
import { CustomLayout, CustomSider } from '@components/forms/register/styles';
import { Button, Checkbox, Form, Input, Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { ButtonIcon, Div, DivIcon, TitleH1 } from './signup';

export const ButtonSignin = styled(Button)`
  .ant-form-vertical .ant-form-item {
    margin-bottom: 0px !important;
  }
`;
const Signin = () => {
  const [form] = Form.useForm();
  const onFinish = (values: unknown) => {
    console.log('Received values of form: ', values);
  };
  const formItemLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
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

  return (
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
              <TitleH1 left>Đăng nhập</TitleH1>
              {/* <Form
                                form={form}
                                name="normal_login"
                                className="login-form"
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                            >
                                <Form.Item
                                    name="username"
                                    rules={[{ required: true, message: 'Please input your Username!' }]}
                                >
                                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your Password!' }]}
                                >
                                    <Input
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        type="password"
                                        placeholder="Password"
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Form.Item name="remember" valuePropName="checked" noStyle>
                                        <Checkbox>Nhớ mật khẩu</Checkbox>
                                    </Form.Item>

                                    <a className="login-form-forgot" href="">
                                        Quên mật khẩu
        </a>
                                </Form.Item>
                                <CustomButtonForm2 >
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" className="login-form-button">
                                            Đăng nhập
                                        </Button>
                                    </Form.Item>
                                    <Form.Item>
                                        <ButtonIcon primary margin>
                                            <FacebookFilled style={{ fontSize: 22, marginRight: '10px' }} />
                                        </ButtonIcon>
                                        <ButtonIcon>
                                            <GoogleOutlined style={{ fontSize: 22 }} />
                                        </ButtonIcon>
                                    </Form.Item>
                                </CustomButtonForm2>
                                <Form.Item>
                                    <p>
                                        Or <Link href="/signup">
                                            <a>Đăng ký ngay</a>
                                        </Link>
                                    </p>
                                </Form.Item>
                            </Form> */}
              <Form
                {...formItemLayout}
                layout="vertical"
                form={form}
                name="register"
                onFinish={onFinish}
                scrollToFirstError
              >
                <DivIcon>
                  <ButtonIcon primary margin>
                    <FacebookFilled
                      style={{ fontSize: 22, marginRight: '10px' }}
                    />
                  </ButtonIcon>
                  <ButtonIcon>
                    <GoogleOutlined style={{ fontSize: 22 }} />
                  </ButtonIcon>
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
