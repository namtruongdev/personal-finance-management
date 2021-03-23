import { FacebookFilled, GoogleOutlined } from '@ant-design/icons';
import {
  ButtonNoBorder,
  CustomButtonForm,
  CustomLayout,
  CustomSider,
  DivIconPlugin,
} from '@components/forms/register/styles';
import { Button, Checkbox, Form, Input, Layout, Typography } from 'antd';
import { providers, signIn } from 'next-auth/client';
import { Provider } from 'next-auth/providers';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const { Content } = Layout;
const { Title } = Typography;
export interface Props {
  providers?: Provider;
}
export const TitleH1 = styled(Title)`
  text-align: center;
  margin-bottom: 20px;
  margin-bottom: 20px !important;
  margin-left: ${(props: String) => (props.left ? '0px' : '')};
  margin-bottom: ${(props: String) => (props.left ? '25px !important' : '')};
`;
export const ButtonIcon = styled(Button)`
  width: 30px;
  outline: none;
  display: flex;
  justify-content: center;
  align-content: center;
  padding-right: ${(props: String) => (props.margin ? '5px' : '')};
  margin-left: ${(props: String) => (props.margin ? '0px' : '')};
  margin-right: ${(props: String) => (props.margin ? '10px' : '')};
`;
export const DivIcon = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;
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

export const Div = styled.div`
  /* border:1px solid; */
  width: 350px;
`;

// eslint-disable-next-line @typescript-eslint/no-shadow
const Signup = ({ providers }: Props) => {
  const [form] = Form.useForm();
  const onFinish = (values: unknown) => {
    // console.log('Received values of form: ', values);
  };
  const formItemLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };
  // eslint-disable-next-line no-console
  console.log(Object.values(providers));
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
              <TitleH1>Đăng ký</TitleH1>
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
              <TitleH1 level={5}>
                <small>hoặc sử dụng email của bạn để đăng ký</small>
              </TitleH1>
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
                    Tôi đã đọc <a href="javascript:void(0)">điểu khoản</a>
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
    </div>
  );
};

export default Signup;
const GhIcon = () => (
  <ButtonIcon>
    <img
      height="22"
      width="22"
      alt="github"
      src="https://unpkg.com/simple-icons@v4/icons/github.svg"
    />
  </ButtonIcon>
);
// type Ctx =
Signup.getInitialProps = async (context?: {}) => ({
  providers: await providers(),
});
