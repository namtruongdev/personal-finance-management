import { Provider } from 'next-auth/providers';

export interface Btn {
  logout?: String | boolean;
  margin?: String | boolean;
}
export interface FormSignup {
  email: String;
  name: String;
  password: String;
  confirm: String;
  agreement: Boolean;
}
export interface Props {
  providers?: Provider;
}
