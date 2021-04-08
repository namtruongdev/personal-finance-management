import { Image } from 'antd';
import styled from 'styled-components';

export const CarouselImg = styled(Image)`
  min-height: 100vh;
`;

export const DivUser = styled.div`
  display: flex;
  float: right;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;
export const SpanImg = styled.span`
  border-radius: 50%;
  float: left;
  height: 2rem;
  width: 2rem;
  background-color: #e2ebf4;
  background-size: cover;
  background-repeat: no-repeat;
`;
export const StrongName = styled.strong`
  margin-right: 3px;
  margin-left: 5px;
`;
export const SignOutProfile = styled.a``;
