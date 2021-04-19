import Link from 'next/link';
import React, { memo } from 'react';
import { Breadcrumb, BreadcrumbProps } from 'antd';
import { Route } from 'antd/lib/breadcrumb/Breadcrumb';

const itemRender = (route: Route, params: unknown, routes: Route[]) => {
  const first = routes.indexOf(route) === 0;
  return first ? (
    <Link href="/">{route.breadcrumbName}</Link>
  ) : (
    <span>{route.breadcrumbName}</span>
  );
};

const BreadCrumb = ({ routes }: BreadcrumbProps) => (
  <Breadcrumb itemRender={itemRender} routes={routes} />
);

export default memo(BreadCrumb);
