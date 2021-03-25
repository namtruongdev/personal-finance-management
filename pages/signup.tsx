import { FacebookFilled, GoogleOutlined } from '@ant-design/icons';
import {
  ButtonNoBorder,
  CustomButtonForm,
  CustomLayout,
  CustomSider,
  DivIconPlugin,
} from '@components/forms/register/styles';
import {
  Button,
  Checkbox,
  Form,
  Input,
  Layout,
  message,
  Typography,
} from 'antd';
import { providers, signIn } from 'next-auth/client';
import { Provider } from 'next-auth/providers';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import firebaseDb from './firebase';
import 'firebase/auth';

const { Content } = Layout;
const { Title } = Typography;
export interface Props {
  providers?: Provider;
}

export interface Prop {
  margin?: String | Boolean;
  // premier: string
}
export const TitleH1 = styled(Title)`
  text-align: center;
  margin-bottom: 20px;
  margin-bottom: 20px !important;
`;
export const ButtonIcon = styled(Button)<Prop>`
  width: 30px;
  outline: none;
  display: flex;
  justify-content: center;
  align-content: center;
  padding-right: ${(props) => (props.margin ? '5px' : '')};
  margin-right: ${(props) => (props.margin ? '10px' : '')};
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

export const success = () => {
  message.success('done', 1);
};

// eslint-disable-next-line @typescript-eslint/no-shadow
const Signup = ({ providers }: Props) => {
  const [form] = Form.useForm();

  // const [user, setUser] = useState({});
  // const [contactObjects, setContactObjects] = useState({});
  // const [emailError, setEmailError] = useState("");
  // const [passwordError, setPasswordError] = useState("");
  // const [hasAccount, setHasAccount] = useState(false);
  // useEffect(() => {
  //     firebaseDb
  //         .database()
  //         .ref()
  //         .child('datafirebase')
  //         .on('value', (snapshot) => {
  //             if (snapshot.val() != null) {
  //                 // setContactObjects({ ...snapshot.val() });
  //             } else {
  //                 // setContactObjects({});
  //                 success();
  //             }
  //         });
  //     // checkuser();
  // }, []);
  const setFormBlank = () => {
    form.resetFields();
  };
  const onFinish = (values: unknown) => {
    // console.log('Received values of form: ', values);
    // setData(values)
    // handleGetFireBase(values);
    handleSignup(values);
    handleCheckMail(values);
  };
  const formItemLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };

  // eslint-disable-next-line no-console
  console.log(Object.values(providers));

  const handleSignup = (values) => {
    firebaseDb
      .auth()
      .createUserWithEmailAndPassword(values.email, values.password)

      .catch((err) => {
        switch (err.code) {
          case 'auth/email-already-in-use':
          case 'auth/invalid-email':
            form.setFields([
              {
                name: 'email',
                errors: ['Email đã tồn tại !'],
              },
            ]);

            // setEmailError(err.message);
            break;
          case 'auth/weak-password':
            // setPasswordError(err.message);
            break;
        }
        // eslint-disable-next-line no-console
        console.log(err, 'check lỗi ::::::::');
        setFormBlank();
      });
    // checkuser();
  };
  // eslint-disable-next-line @typescript-eslint/no-shadow
  // const checkuser = () => firebaseDb?.auth()?.onAuthStateChanged((user) => {
  //     if (user) {

  //     }
  // })

  const handleCheckMail = (values) => {
    const auth = firebaseDb.auth();
    // console.log(auth.currentUser, "okeeeeee data");

    auth.currentUser
      .sendEmailVerification()

      .then((res) => {
        // console.log(res.emailVerified, "check key");
      })
      .catch((err) => {
        // console.log(err.emailVerified, "check log out");
      });
    // firebaseDb
    //   ?.auth()
    //   ?.sendSignInLinkToEmail('taan300897@gmail.com', actionCodeSettings)
    //   .then(() => {
    //     alert('chay');
    //     window.localStorage.setItem('emailForSignIn', 'taan300897@gmail.com');
    //   })
    //   .catch((error) => {
    //     // ...
    //   });
  };

  // const handleOnFinishFailed = () => {
  //     debugger
  // }

  // const onValuesChange = (changedValues, allValues) => {
  //     console.log('changedValues', changedValues)
  //     console.log('allValues', allValues)
  // }

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
