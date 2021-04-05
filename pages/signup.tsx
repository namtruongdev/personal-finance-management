import {
  ButtonSubmit,
  CustomButtonForm,
  CustomContent,
  CustomLayout,
  CustomSider,
  Div,
  SignTitle,
} from '@components/forms/register/styles';
import { Checkbox, Form, Input, Layout, message, notification } from 'antd';
import { verify } from 'jsonwebtoken';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

export const success = () => {
  message.success('done', 1);
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

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const Signup = () => {
  const router = useRouter();
  verify(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MTYyMzkxMTF9.SD48xJhVoTZPfOj3WN9jq8um5Fdp7TM-ZMI8OrMTsS4',
    'your-256-bit-secre',
    (err, decoded) => {
      // console.log(err.message);
    }
  );

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const rep = await fetch('http://localhost:3000/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    const repData = await rep.json();
    if (rep.status === 200) {
      if (repData.error) {
        notification.warning({
          message: '',
          description: repData.message,
        });
      } else {
        notification.success({
          message: '',
          description: 'Đăng kí thành công',
        });
        router.push('/signin');
      }
    }
  };

  return (
    <CustomLayout>
      <Layout>
        <CustomContent>
          <Div>
            <SignTitle>Đăng ký</SignTitle>

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
                name="username"
                label="Tên người dùng"
                rules={[
                  {
                    required: true,
                    message: 'Hãy nhập tên người dùng!',
                  },
                  {
                    pattern: /^[a-zA-Z0-9_]+$/,
                    message: 'Không nhập kí tự đặc biệt',
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
                  Tôi đã đọc <a href="#">điểu khoản</a>
                </Checkbox>
              </Form.Item>
              <CustomButtonForm>
                <ButtonSubmit type="primary" htmlType="submit">
                  Đăng ký
                </ButtonSubmit>
                <Link href="/login">
                  <a>
                    <ButtonSubmit type="primary">Đăng nhập</ButtonSubmit>
                  </a>
                </Link>
              </CustomButtonForm>
            </Form>
          </Div>
        </CustomContent>
      </Layout>
      <CustomSider>Sider</CustomSider>
    </CustomLayout>
  );
};

export default Signup;
