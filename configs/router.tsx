import React from 'react';
import { Route } from '@ant-design/pro-layout/lib/typings';

import { SmileOutlined, PlaySquareOutlined } from '@ant-design/icons';

export const ROUTES: Route = {
  path: '/',
  routes: [
    {
      path: '/',
      name: 'Bảng điều khiển',
      icon: <SmileOutlined />,
    },
    {
      path: '/example',
      name: 'Example Page',
      icon: <PlaySquareOutlined />,
    },
    {
      path: '/du-toan',
      name: 'Dự toán',
      icon: <PlaySquareOutlined />,
      routes: [
        {
          path: '/chi-tieu/chi-tieu-thiet-yeu',
          name: 'Chi tiêu thiết yếu',
        },
        {
          path: '/chi-tieu/chi-tieu-ko-thiet-yeu',
          name: 'Chi tiêu không thiết yếu',
        },
        {
          path: '/chi-tieu/chi-tieu-dot-xuat',
          name: 'Chi tiêu đột xuất',
        },
        {
          path: '/chi-tieu/ke-hoach-chi-tieu',
          name: 'Kế hoạch chi tiêu',
        },
      ],
    },
    {
      path: '/chi-tieu',
      name: 'Chi tiêu',
      icon: <PlaySquareOutlined />,
      routes: [
        {
          path: '/chi-tieu/chi-tieu-thiet-yeu',
          name: 'Chi tiêu thiết yếu',
        },
        {
          path: '/chi-tieu/chi-tieu-ko-thiet-yeu',
          name: 'Chi tiêu không thiết yếu',
        },
        {
          path: '/chi-tieu/chi-tieu-dot-xuat',
          name: 'Chi tiêu đột xuất',
        },
        {
          path: '/chi-tieu/ke-hoach-chi-tieu',
          name: 'Kế hoạch chi tiêu',
        },
      ],
    },
    {
      path: '/thu-nhap',
      name: 'Thu nhập',
      icon: <PlaySquareOutlined />,
    },
    {
      path: '/thong-ke',
      name: 'Thống kê',
      icon: <PlaySquareOutlined />,
    },
  ],
};
