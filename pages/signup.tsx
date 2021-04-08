import { CustomSider } from '@components/forms/register/styles';
import {
  Button,
  Checkbox,
  Form,
  Input,
  Layout,
  notification,
  Row,
  Col,
  Typography,
} from 'antd';
import { FormSignup } from 'interface/formInterface';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const { Content } = Layout;
const { Title } = Typography;

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

const Signup = () => {
  const router = useRouter();

  const [form] = Form.useForm();

  const onFinish = async (values: FormSignup) => {
    const resp = await fetch('http://localhost:3000/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    const data: RESP = await resp.json();

    if (!resp.ok) {
      return notification.error({
        message: data.message,
      });
    }

    notification.success({
      message: data.message,
    });

    return router.push('/login');
  };

  return (
    <>
      <Layout>
        <Content>
          <Title>Đăng ký</Title>

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
              label="Email"
              rules={[
                {
                  type: 'email',
                  message: 'Email không hợp lệ!',
                },
                {
                  required: true,
                  message: 'Vui lòng nhập Email!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="username"
              label="Tên người dùng"
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

            <Form.Item
              name="rePassword"
              label="Xác nhận mật khẩu"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập lại mật khẩu!',
                },

                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        'Mật khẩu không trùng với mật khẩu bạn đã nhập!'
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
              name="rules"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chấp nhận điều khoản!',
                },
              ]}
              {...tailFormItemLayout}
            >
              <Checkbox>
                Tôi đã đọc <a href="#">điểu khoản</a>
              </Checkbox>
            </Form.Item>
            <Row gutter={[15, 15]} justify="end">
              <Col>
                <Button type="primary" htmlType="submit">
                  Đăng ký
                </Button>
              </Col>
              <Col>
                <Button type="primary">
                  <Link href="/login">
                    <a aria-hidden="true">Đăng nhập</a>
                  </Link>
                </Button>
              </Col>
            </Row>
          </Form>
        </Content>
      </Layout>
      <CustomSider>Sider</CustomSider>
    </>
  );
};

export default Signup;
