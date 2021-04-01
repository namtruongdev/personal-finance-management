import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { ROUTES } from '@configs/router';

import type { MenuDataItem } from '@ant-design/pro-layout/lib/typings';
import { ProSettings } from '@ant-design/pro-layout';

import { MoneyBag } from '@components/Icons/index';
import PageAuth from '@components/forms/auth/authention';

const SettingDrawer = dynamic(
  () => import('@ant-design/pro-layout/lib/components/SettingDrawer'),
  {
    ssr: false,
  }
);
const ProLayout = dynamic(() => import('@ant-design/pro-layout'), {
  ssr: false,
});

const DefautFooter = dynamic(
  () => import('@ant-design/pro-layout/lib/Footer'),
  { ssr: false }
);

const menuHeaderRender = (logo: React.ReactNode, title: React.ReactNode) => (
  <Link href="/">
    <a href="/">
      {logo}
      {title}
    </a>
  </Link>
);

const footerRender = () => (
  <DefautFooter
    links={[]}
    copyright={`${new Date().getFullYear()} Personal Finance Management`}
  />
);

const Main = ({ children }) => {
  const router = useRouter();

  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
    title: 'PFM',
  });
  const [pathname, setPathname] = useState(router.pathname);

  const menuItemRender = (options: MenuDataItem, element: React.ReactNode) => (
    <Link href={options.path}>
      <a
        href={options.path}
        onClick={() => setPathname(options.path || '/')}
        aria-hidden="true"
      >
        {element}
      </a>
    </Link>
  );
  const Div = () => <PageAuth />;
  return (
    <>
      <ProLayout
        location={{ pathname }}
        title="PFM"
        logo={<MoneyBag width="32" height="32" />}
        style={{ minHeight: '100vh' }}
        route={ROUTES}
        menuItemRender={menuItemRender}
        menuHeaderRender={menuHeaderRender}
        footerRender={footerRender}
        rightContentRender={Div}
        {...settings}
      >
        {children}
      </ProLayout>
      <SettingDrawer
        pathname={pathname}
        getContainer={() => document.getElementById('__next')}
        settings={settings}
        onSettingChange={(changeSetting) => setSetting(changeSetting)}
        disableUrlParams
      />
    </>
  );
};

export default Main;
