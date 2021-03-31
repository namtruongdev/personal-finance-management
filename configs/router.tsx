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
      path: '/typeAction/estimate',
      name: 'Dự toán',
      icon: <PlaySquareOutlined />,
      routes: [
        {
          path: '/typeAction/estimate/requiredCst',
          name: 'Chi tiêu thiết yếu',
        },
        {
          path: '/typeAction/estimate/norequiredCst',
          name: 'Chi tiêu không thiết yếu',
        },
        {
          path: '/typeAction/estimate/spendingPlans',
          name: 'Kế hoạch chi tiêu',
        },
        {
          path: '/typeAction/estimate/unspectedCst',
          name: 'Chi tiêu đột xuất',
        },
      ],
    },
    {
      path: '/typeAction/consumption',
      name: 'Chi tiêu',
      icon: <PlaySquareOutlined />,
      routes: [
        {
          path: '/typeAction/consumption/requiredCst',
          name: 'Chi tiêu thiết yếu',
        },
        {
          path: '/typeAction/consumption/norequiredCst',
          name: 'Chi tiêu không thiết yếu',
        },
        {
          path: '/typeAction/consumption/spendingPlans',
          name: 'Kế hoạch chi tiêu',
        },
        {
          path: '/typeAction/consumption/unspectedCst',
          name: 'Chi tiêu đột xuất',
        },
      ],
    },
    {
      path: '/typeAction/income',
      name: 'Thu nhập',
      icon: <PlaySquareOutlined />,
    },
    {
      path: '/typeAction/statistical',
      name: 'Thống kê',
      icon: <PlaySquareOutlined />,
    },
  ],
};
