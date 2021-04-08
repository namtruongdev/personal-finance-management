import Link from 'next/link';
import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import {
  ContentContainer,
  FormContent,
  FormLayout,
  FormSider,
} from '@components/forms';
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

const { Title, Paragraph } = Typography;

const Signin = () => {
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = async (values: unknown) => {
    setLoading(true);
    const res = await fetch(`http://localhost:3000/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
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
        <ContentContainer>
          <Spin spinning={loading}>
            <Row justify="center">
              <Title>Đăng nhập</Title>
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
              <Form.Item style={{ marginBottom: '5px' }}>
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
                Không có tài khoản?
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
    props: {},
  };
};

export default Signin;
