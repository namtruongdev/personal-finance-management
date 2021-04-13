import { fetchAPI } from '@utils/services';
import { Avatar, Button, Dropdown, Menu, notification } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { AvarIcon, Hr } from './forms/logout';

const getRandomInt = (max: number) => Math.floor(Math.random() * max);
const Autoset = ({ data }) => {
  const colorRender = localStorage.getItem('color');
  const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
  const colorNum = getRandomInt(ColorList.length);
  const [color] = useState(ColorList[colorNum]);
  const router = useRouter();
  useEffect(() => {
    if (!colorRender) {
      localStorage.setItem('color', color);
    }
  }, []);

  const logout = async () => {
    const res = await fetchAPI({
      url: 'http://localhost:3000/api/logout',
      method: 'GET',
      payload: '',
    });
    const results = await res.json();

    if (res.ok) {
      notification.success({
        message: results.message,
      });
      router.push('/login');
    }
  };
  const menu = (
    <Menu>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          Thêm ảnh
        </a>
      </Menu.Item>
      <Hr />
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          Thông tin cá nhân
        </a>
      </Menu.Item>
      <Hr />
      <Menu.Item>
        <Button onClick={logout}>Log out</Button>
      </Menu.Item>
    </Menu>
  );
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
