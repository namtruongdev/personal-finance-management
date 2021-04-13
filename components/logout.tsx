import { Avatar, Button, Dropdown, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { AvarIcon, Hr } from './forms/logout';

const getRandomInt = (max: number) => Math.floor(Math.random() * max);
const menu = (
  <Menu>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        1st menu item
      </a>
    </Menu.Item>
    <Hr />
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        2nd menu item
      </a>
    </Menu.Item>
    <Hr />
    <Menu.Item>
      <Button>Log out</Button>
    </Menu.Item>
  </Menu>
);
const Autoset = ({ data }) => {
  const colorRender = localStorage.getItem('color');
  const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
  const colorNum = getRandomInt(ColorList.length);
  const [color] = useState(ColorList[colorNum]);
  useEffect(() => {
    if (!colorRender) {
      localStorage.setItem('color', color);
    }
  }, []);

  return (
    <>
      <Dropdown
        overlay={menu}
        placement="bottomCenter"
        arrow
        trigger={['click']}
      >
        <AvarIcon style={{ cursor: 'pointer' }}>
          <Avatar
            style={{ backgroundColor: colorRender, verticalAlign: 'middle' }}
            size="large"
            gap={2}
          >
            {data.username.charAt(0).toUpperCase()}
          </Avatar>
        </AvarIcon>
      </Dropdown>
    </>
  );
};
export default Autoset;
