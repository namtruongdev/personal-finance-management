import styled from 'styled-components';
import { Menu } from 'antd';

const { Item } = Menu;

export const Items = styled(Item)`
  padding: 18px;
  font-weight: 600;
  border-bottom: 0.1px solid #d7d9dd;
  text-align: center;
  &:hover {
    background-color: white;
    color: orange;
    font-weight: 600;
    border-bottom: 0.1px solid orange;
  }
`;
export const Menus = styled(Menu)`
  margin: 5px;
  border-radius: 4px;
  padding: 0;
`;
export const NameAcc = styled.span`
  font-weight: 600;
  margin-left: 10px;
`;
export const AvatarIcon = styled.span`
  cursor: pointer;
`;
