import {
  ContentContainer,
  FormContent,
  FormLayout,
  FormSider,
} from '@components/forms';
import {
  Facebook,
  Github,
  Google,
  IconContainer,
} from '@components/forms/login';
import { LOGIN_API } from '@constants/index';
import {
  JWT_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY,
  SALT,
  SET_COOKIE_OPTIONS,
} from '@constants/jwt';
import { setCookie } from '@utils/auth';
import db from '@utils/database/index';
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
  Typography,
} from 'antd';
import { hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { NextApiResponse, NextApiRequest } from 'next';
import { getSession, signIn } from 'next-auth/client';
import jwt from 'next-auth/jwt';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const ParticlesBg = dynamic(() => import('particles-bg'), {
  ssr: false,
});
const { Title, Paragraph } = Typography;

const Signin = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();
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
                    <Github
                      onClick={() => signIn('github', { redirect: false })}
                    />
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
export const getServerSideProps = async ({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) => {
  const secret = process.env.JWT_SECRET;
  const { cookies } = req;
  const { user_id: isUserId, refresh_token: isRefreshToken } = cookies;
  const session = await getSession({ req });

  const infor = await jwt.getToken({ req, secret });

  if (session) {
    const { sub, name } = infor;
    const doc = await db.collection('users').doc(`${sub}`).get();

    const claims = {
      id: sub,
      name,
    };
    const token = sign(claims, secret, { expiresIn: '15m' });
    const refreshToken = uuidv4();
    const refreshTokenHash = await hash(refreshToken, SALT);

    res.setHeader('Set-Cookie', [
      setCookie({
        name: 'auth',
        value: token,
        options: SET_COOKIE_OPTIONS({ maxAge: JWT_TOKEN_EXPIRY }),
      }),
      setCookie({
        name: 'user_id',
        value: `${sub}`,
        options: SET_COOKIE_OPTIONS({ maxAge: REFRESH_TOKEN_EXPIRY }),
      }),
      setCookie({
        name: 'refresh_token',
        value: refreshToken,
        options: SET_COOKIE_OPTIONS({ maxAge: REFRESH_TOKEN_EXPIRY }),
      }),
    ]);

    const usersRef = db.collection('users');

    if (!doc.exists) {
      usersRef.doc(`${sub}`).set({
        infor,
        username: name,
      });

      await db.collection('users').doc(`${sub}`).update({
        refreshTokenHash,
      });
      return {
        redirect: {
          destination: '/',
          permanent: true,
        },
      };
    }
    await db.collection('users').doc(`${sub}`).update({
      refreshTokenHash,
    });
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }
  if (isRefreshToken && isUserId) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }
  return {
    props: {},
  };
};

export default Signin;
