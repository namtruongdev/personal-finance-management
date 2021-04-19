import styled from 'styled-components';
import { Button } from 'antd'

export const NameAcc = styled.span`
  font-weight: 600;
  margin-left: 10px;
`;
export const AvatarIcon = styled.span`
  cursor: pointer;
`;

export const ButtonLogout = styled(Button)`

border:0;
padding:6px;
font-weight:600;
margin-top:5px;
margin-bottom:3px;
&:hover {
background-color:black;
color: white;
font-weight:600
}
`;