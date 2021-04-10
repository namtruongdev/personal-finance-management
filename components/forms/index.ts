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
  position: relative;
  .particles-bg-canvas-self {
    z-index: 1 !important;
  }
`;
export const ContentContainer = styled.div`
  width: 100%;
  max-width: 400px;
  z-index: 2;
`;
export const FormSider = styled(Sider)`
  min-width: 500px !important;
  @media (max-width: 992px) {
    display: none;
  }
`;
