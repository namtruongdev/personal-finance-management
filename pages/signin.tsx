import {
  FacebookFilled,
  GithubOutlined,
  GoogleOutlined,
} from '@ant-design/icons';
import {
  ButtonIcon,
  ButtonNoBorder,
  CustomLayout,
  CustomSider,
  Div,
  DivIcon,
  DivIconPlugin,
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
import { Props } from 'interface/formInterface';
import Cookies from 'js-cookie';
import { providers, signIn, useSession } from 'next-auth/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

const { Content } = Layout;
export const ButtonSignin = styled(Button)`
  .ant-form-vertical .ant-form-item {
    margin-bottom: 0px !important;
  }
`;
const Signin = ({ providers: signInProviders }: Props) => {
  const [session] = useSession();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (session) {
      router.push('/');
    }
  }, [session]);
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = async (values: unknown) => {
    setLoading(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const loginApi: any = await fetch(`http://localhost:3000/api/auth`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    }).catch((error) => {
      notification.warning({
        message: '',
        description: 'Đăng nhập thất bại',
      });
      setLoading(false);
    });

    const result = await loginApi.json();
    if (result.success && result.token) {
      Cookies.set('token', result.token);
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
                  <DivIcon>
                    {Object.values(signInProviders).map((provider) => (
                      <DivIconPlugin key={provider.name}>
                        {/* <form> */}
                        <ButtonNoBorder onClick={() => signIn(provider.id)}>
                          {provider.name === 'Facebook' ? (
                            <ButtonIcon margin="margin">
                              <FacebookFilled style={{ fontSize: '22px' }} />
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
                    ))}
                  </DivIcon>
                  <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                      {
                        required: true,
                        message: 'Hãy nhập tài khoản',
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
                        message: 'Hãy nhập mật khẩu',
                      },
                    ]}
                    hasFeedback
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item valuePropName="checked" {...tailFormItemLayout}>
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
export default Signin;
export async function getServerSideProps() {
  return {
    props: { providers: await providers() },
  };
}
