import { LOGOUT_API } from '@constants/api';
import { AvatarIcon, Items, Menus } from '@layouts/headerRight/styles';
import { fetchAPI } from '@utils/services';
import { Avatar, Dropdown, notification } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const getRandomInt = (max: number) => Math.floor(Math.random() * max);
const LogoutButton = ({ data }) => {
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
      url: LOGOUT_API,
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
    <Menus>
      <Items>Thông tin cá nhân </Items>
      <Items onClick={logout}> Đăng xuất </Items>
    </Menus>
  );

  return (
    <>
      <Dropdown
        overlay={menu}
        placement="bottomCenter"
        arrow
        trigger={['click']}
      >
        <AvatarIcon>
          <Avatar
            style={{ backgroundColor: colorRender, verticalAlign: 'middle' }}
            size={30}
            gap={2}
          >
            {data.username.charAt(0).toUpperCase()}
          </Avatar>
        </AvatarIcon>
      </Dropdown>
    </>
  );
};
export default LogoutButton;
