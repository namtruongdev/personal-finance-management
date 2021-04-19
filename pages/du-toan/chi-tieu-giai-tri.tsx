import MonthTable from '@components/table/monthTable';
import Breadcrumb from '@components/breadcrumb';
import MainLayout from '@layouts/main';
import { withAuthSSP } from '@utils/auth';
import { Card, Col, Row } from 'antd';
import React, { useMemo } from 'react';

// import { useRouter } from 'next/router';

export default function Estimate({ user, dataUser }) {
  // const router = useRouter();
  const originData = [];

  for (let i = 0; i < 5; i++) {
    originData.push({
      key: i.toString(),
      name: `Edrward ${i}`,
      age: 32,
      address: `London Park no. ${i}`,
    });
  }
  const routes: Routes[] = useMemo(
    () => [
      {
        path: '/',
        breadcrumbName: 'Trang chủ',
      },
      {
        path: '/du-toan',
        breadcrumbName: 'Dự toán',
      },
      {
        path: '/phan-bo-thu-nhap',
        breadcrumbName: 'Chi tiêu giải trí',
      },
    ],
    []
  );
  return (
    <>
      <MainLayout user={user}>
        <Row gutter={[15, 15]}>
          <Col span={24}>
            <Breadcrumb routes={routes} />
          </Col>
          <Col span={24}>
            <Card title="Chi tiêu giải trí">
              <MonthTable originData={originData} />
            </Card>
          </Col>
        </Row>
      </MainLayout>
    </>
  );
}
export const getServerSideProps = withAuthSSP();
