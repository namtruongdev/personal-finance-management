import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import {
  ContentContainer,
  FormContent,
  FormLayout,
  FormSider,
} from '@components/forms';
import {
  Button,
  Checkbox,
  Form,
  Input,
  notification,
  Row,
  Col,
  Spin,
  Typography,
} from 'antd';
import { FormSignup } from 'interface/formInterface';
import { SIGNUP_API } from '@constants/api';
import { fetchAPI } from '@utils/services';

const { Title, Paragraph } = Typography;

const ParticlesBg = dynamic(() => import('particles-bg'), {
  ssr: false,
});

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
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [form] = Form.useForm();

  const onFinish = async (values: FormSignup) => {
    setLoading(true);
    const res = await fetchAPI({
      url: SIGNUP_API,
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
    return router.push('/login');
  };

  return (
    <>
      <FormLayout>
        <FormContent>
          <ParticlesBg type="cobweb" bg={true} />
          <ContentContainer>
            <Spin spinning={loading}>
              <Row justify="center">
                <Title>Đăng ký</Title>
              </Row>
              <Form
                {...formItemLayout}
                layout="vertical"
                form={form}
                name="register"
                onFinish={onFinish}
                scrollToFirstError
              >
                <Row gutter={[15, 15]}>
                  <Col span={12}>
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
                  </Col>
                  <Col span={12}>
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
                  </Col>
                </Row>
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
                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Đăng ký
                  </Button>
                </Form.Item>
                <Paragraph>
                  Đã có tài khoản?
                  <Link href="/login">
                    <a> Đăng nhập</a>
                  </Link>
                </Paragraph>
              </Form>
            </Spin>
          </ContentContainer>
        </FormContent>
        <FormSider>Sider</FormSider>
      </FormLayout>
    </>
  );
};

export default Signup;
