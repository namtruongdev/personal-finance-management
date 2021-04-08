import { Layout } from 'antd';
import styled from 'styled-components';

const { Sider, Content } = Layout;
export const FormLayout = styled(Layout)`
  min-height: 100vh;
`;
export const FormContent = styled(Content)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.9375rem;
`;
export const ContentContainer = styled(Content)`
  width: 100%;
  max-width: 400px;
`;
export const FormSider = styled(Sider)`
  min-width: 500px !important;
  @media (max-width: 992px) {
    display: none;
  }
`;
