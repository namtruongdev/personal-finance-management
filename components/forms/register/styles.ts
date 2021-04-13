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
  margin-right: 15px;
`;
export const SpanImg = styled.img`
  border-radius: 50%;
  float: left;
  height: 1.9rem;
  width: 1.9rem;
  background-color: #e2ebf4;
  background-size: cover;
  background-repeat: no-repeat;
`;
export const StrongName = styled.strong`
  margin-left: 8px;
`;
export const SignOutProfile = styled.a``;
