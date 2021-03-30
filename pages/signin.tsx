// import { FacebookFilled, GoogleOutlined } from '@ant-design/icons';
import { CustomLayout, CustomSider } from '@components/forms/register/styles';
import { Button, Checkbox, Form, Input, Layout } from 'antd';
import Link from 'next/link';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import Header from '../components/header';
import { Div } from './signup';

const { Content } = Layout;
export const ButtonSignin = styled(Button)`
  .ant-form-vertical .ant-form-item {
    margin-bottom: 0px !important;
  }
`;
const Signin = () => {
  const [form] = Form.useForm();
  const onFinish = (values: unknown) => {
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

  return (
    <div>
      <Header />
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
              {/* <TitleH1 left>Đăng nhập</TitleH1> */}
              <Form
                {...formItemLayout}
                layout="vertical"
                form={form}
                name="register"
                onFinish={onFinish}
                scrollToFirstError
              >
                {/* <DivIcon>
                  <ButtonIcon  margin>
                    <FacebookFilled
                      style={{ fontSize: 22, marginRight: '10px' }}
                    />
                  </ButtonIcon>
                  <ButtonIcon>
                    <GoogleOutlined style={{ fontSize: 22 }} />
                  </ButtonIcon>
                </DivIcon> */}
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
