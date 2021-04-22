import styled from 'styled-components';
import { Button, Menu } from 'antd'

const { Item } = Menu;


export const NameAcc = styled.span`
  font-weight: 600;
  margin-left: 10px;
`;
export const AvatarIcon = styled.span`
  cursor: pointer;
`;


export const Items = styled(Item)`
padding: 18px;
font-weight: 600;
border-bottom: 0.1px solid #D7D9DD;
text-align: center;
&:hover {
background-color: white;
color: orange;
font-weight: 600;
border-bottom: 0.1px solid orange;
}
`;
export const Menus = styled(Menu)`
border:0;
margin: 5px;
border-radius: 4px;
padding: 0;
`;

export const NameUser = styled.div`

display:flex;
margin-right:13px;
justify-content:center;
align-items:center

`;