import { FacebookFilled, GoogleOutlined } from '@ant-design/icons';
import { FormSignup, Props } from '@components/forms/register/intef';
import {
  ButtonIcon,
  ButtonNoBorder,
  CustomButtonForm,
  CustomLayout,
  CustomSider,
  Div,
  DivIcon,
  DivIconPlugin,
  TitleH1,
} from '@components/forms/register/styles';
import { Button, Checkbox, Form, Input, Layout, message } from 'antd';
import 'firebase/auth';
import jwt from 'jsonwebtoken';
import { providers, signIn, useSession } from 'next-auth/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const { Content } = Layout;

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

const Signup = ({ providers: prd }: Props) => {
  const [session] = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session) {
      router.push('/');
    }
  }, [session]);
  const [form] = Form.useForm();
  // const [isUser, setIsUser] = useState(true);
  // const setFormBlank = () => {
  //   form.resetFields();
  // };
  const onFinish = (values: FormSignup) => {
    // handleSignup(values);
    const codeEncoded = { email: values.email, password: values.password };
    const token = jwt.sign(codeEncoded, 'hieuc');
    // const decoded = jwt.verify(token, 'hieuc');
    // console.log(codeEncoded)
    // console.log(token, 'token');
    localStorage.setItem('myCat', token);
    // const cat = localStorage.getItem('myCat');
  };
  const formItemLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };

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
                        {provider.name === 'GitHub' ? <GhIcons /> : ''}
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
const GhIcons = () => (
  <ButtonIcon>
    <img
      height="22"
      width="22"
      alt="github"
      src="https://unpkg.com/simple-icons@v4/icons/github.svg"
    />
  </ButtonIcon>
);

export async function getStaticProps() {
  return {
    props: { providers: await providers() },
  };
}
