import {
  ContentContainer,
  FormContent,
  FormLayout,
  FormSider
} from '@components/forms';
import {
  Facebook, Github, Google,
  IconContainer
} from '@components/forms/login';
import { LOGIN_API } from '@constants/index';
import { fetchAPI } from '@utils/services';
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  notification,
  Row,
  Spin,
  Typography
} from 'antd';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { signIn, useSession } from 'next-auth/client';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { React, useEffect, useMemo, useState } from 'react';





const ParticlesBg = dynamic(() => import('particles-bg'), {
  ssr: false,
});
const { Title, Paragraph } = Typography;

const Signin = () => {
  const [loading, setLoading] = useState(false);
  const [session] = useSession();
  console.log(session)
  const [form] = Form.useForm();
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    const LogIn = async () => {
      await fetch(`http://localhost:3000/api/signinPlugin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'truong111',
          password: '1'
        }),
      })
        .then(() => { router.push('/') })
        .then(() => setIsLogin(true));
    }
    console.log(session, isLogin)
    if (!isLogin && session) {
      LogIn();
    }
    console.log('object')
  }, [isLogin, session])
  console.log(session)
  const onFinish = async (values: unknown) => {
    setLoading(true);

    const res = await fetchAPI({
      url: LOGIN_API,
      method: 'POST',
      payload: values,
    });

    const results: RESP = await res.json();

    if (!res.ok) {
      setLoading(false);
      return notification.error({
        message: results.message,
      });
    }

    notification.success({
      message: results.message,
    });

    setLoading(false);

    return router.replace('/');
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
  const handleSignin = async () => {
    signIn('github')
    setIsLogin(true)
  }
  return (
    <FormLayout>
      <FormContent>
        <ParticlesBg type="cobweb" bg={true} />
        <ContentContainer>
          <Spin spinning={loading}>
            <Row justify="center">
              <Col span={24}>
                <Row justify="center">
                  <Title>Đăng nhập</Title>
                </Row>
              </Col>
              <IconContainer span={24}>
                <Row justify="center" gutter={[15, 15]}>
                  <Col>
                    <Facebook
                      onClick={() => signIn('facebook', { redirect: false })}
                    />
                  </Col>
                  <Col>
                    <Github onClick={handleSignin} />
                  </Col>
                  <Col>
                    <Google
                      onClick={() => signIn('google', { redirect: false })}
                    />
                  </Col>
                </Row>
              </IconContainer>
            </Row>
            <Form
              {...formItemLayout}
              layout="vertical"
              form={form}
              name="register"
              onFinish={onFinish}
              scrollToFirstError
            >
              <Form.Item
                name="username"
                label="Tên người dùng"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập tên người dùng!',
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
                    message: 'Vui lòng nhập mật khẩu!',
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>
              <Row justify="space-between">
                <Col>
                  <Form.Item
                    name="remember"
                    valuePropName="checked"
                    {...tailFormItemLayout}
                  >
                    <Checkbox>Nhớ mật khẩu</Checkbox>
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item>
                    <Link href="#">Quên mật khẩu?</Link>
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item>
                <Button
                  type="primary"
                  block
                  htmlType="submit"
                  loading={loading}
                >
                  Đăng nhập
                </Button>
              </Form.Item>
              <Paragraph>
                Chưa có tài khoản?
                <Link href="/signup">
                  <a> Đăng ký ngay</a>
                </Link>
              </Paragraph>
            </Form>
          </Spin>
        </ContentContainer>
      </FormContent>
      <FormSider>Sider</FormSider>
    </FormLayout>
  );
};
export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const { req } = ctx;
  const { cookies } = req;
  const { user_id: userId, refresh_token: refreshToken } = cookies;

  if (refreshToken && userId) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }
  return {
    props: {
    },
  };
};

export default Signin;
