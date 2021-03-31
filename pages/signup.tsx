import {
  FacebookFilled,
  GithubOutlined,
  GoogleOutlined,
} from '@ant-design/icons';
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
import {
  Button,
  Checkbox,
  Form,
  Input,
  Layout,
  message,
  notification,
} from 'antd';
import bcrypt from 'bcryptjs';
import 'firebase/auth';
import { Props } from 'interface/formInterface';
import { providers, signIn, useSession } from 'next-auth/client';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';

const { Content } = Layout;

export const success = () => {
  message.success('done', 1);
};
const Signup = ({ providers: signInProviders }: Props) => {
  const [session] = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session) {
      router.push('/');
    }
  }, [session]);
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
  const [form] = Form.useForm();
  const [listUser, setListUser] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8080/user', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: '*/*',
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        setListUser(response);
      })
      .catch((err) => {});
  }, []);

  const checkEmail = (email) => {
    // let check=false;
    const a =
      listUser.length > 0 &&
      listUser.map((item) => {
        if (item.email === email) {
          return true;
        }
        return false;
      });
    return a;
  };
  const onFinish = (values: unknown) => {
    const salt = bcrypt.genSaltSync(12);
    const hash = bcrypt.hashSync(values.password, salt);
    const check = checkEmail(values.email);
    if (check) {
      notification.warning({
        message: '',
        description: 'Email đã tồn tại.',
      });
    } else {
      const rep = fetch('http://localhost:8080/user', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
        body: JSON.stringify({
          email: values.email,
          password: hash,
          name: values.name,
        }),
      });
      if (rep) {
        notification.success({
          message: '',
          description: 'Đăng kí thành công',
        });
        Router.push('/signin');
      }
    }
  };

  const formItemLayout = useMemo(
    () => ({
      labelCol: { span: 24 },
      wrapperCol: { span: 24 },
    }),
    []
  );
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
              <SignTitle>Đăng ký</SignTitle>
              <DivIcon>
                {Object.values(prd).map((provider) => (
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
                        {provider.name === 'GitHub' ? (
                          <ButtonIcon>
                            <GithubOutlined style={{ fontSize: '22px' }} />
                          </ButtonIcon>
                        ) : (
                          ''
                        )}
                      </ButtonNoBorder>
                    </form>
                  </DivIconPlugin>
                ))}
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
                    <Button type="primary">Đăng nhập</Button>
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
export async function getStaticProps() {
  return {
    props: { providers: await providers() },
  };
}
