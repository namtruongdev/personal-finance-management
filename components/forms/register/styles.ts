import styled from 'styled-components';
import { Layout, Form, Button, Typography } from 'antd';
import { Span } from 'interface/formInterface';

const { Sider, Content } = Layout;
const { Title } = Typography;

export const CustomLayout = styled(Layout)`
  min-height: 100vh;
`;
export const CustomContent = styled(Content)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;
export const CustomSider = styled(Sider)`
  min-width: 700px !important ;
  background-image: url('https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png');

  background-color: #e5eef7;
  @media (max-width: 1110px) {
    display: none;
  }
`;
export const CustomButtonForm = styled(Form.Item)`
  .ant-form-item-control-input-content {
    display: flex;
    justify-content: flex-end;
  }
`;
export const CustomButtonForm2 = styled(Form.Item)`
  margin-bottom: 5px;
  .ant-form-item-control-input-content {
    margin-left: 0%;

    display: flex;
    justify-content: space-between;
  }
  .ant-form-item {
    margin-bottom: 0;
  }
`;
export const DivIconPlugin = styled.div`
  max-width: 150px;
  max-height: 150px;
  min-height: 50px;
  min-width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ButtonNoBorder = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
`;
export interface Prop {
  margin?: String | Boolean;
}
export const SignTitle = styled(Title)`
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
export const ButtonSubmit = styled(Button)<Prop>`
  margin-left: 6px;
`;
export const DivIcon = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;
export const DivUser = styled.div`
  display: flex;
  float: right;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

export const Div = styled.div`
  width: 350px;
`;
export const SpanImg = styled.span`
  border-radius: 50%;
  float: left;
  height: 1.6rem;
  width: 1.6rem;
  background-color: #dde1e5;
  background-size: cover;
  background-repeat: no-repeat;
  border: 0.3px solid #d0d5db;
`;
export const StrongName = styled.strong`
  margin-right: 3px;
  margin-left: 5px;
`;
export const SpanText = styled.span`
  position: absolute;
  padding-top: 0.8rem;
  left: 1rem;
  right: 6.5rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  display: inherit;
  z-index: 1;
  line-height: 1.3rem;
`;
export const MissPass = styled.a`
  float: right;
`;
export const SignOutProfile = styled.a``;
export const IconAnt = styled.span<Span>`
  font-size: 1.5rem;
  margin-top: -5px;
  padding-right: 8px;
  margin-left: 54px;
  margin-left: ${(props) => (props.right ? '59px' : '')};
  margin-left: ${(props) => (props.left ? '-12px' : '')};
  margin-top: ${(props) => (props.left ? '-7px' : '')};
`;
export const NameIcon = styled.span`
  font-size: 16px;
`;
