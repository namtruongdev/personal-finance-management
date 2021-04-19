import MonthTable from '@components/table/monthTable';
import Breadcrumb from '@components/breadcrumb';
import MainLayout from '@layouts/main';
import { withAuthSSP } from '@utils/auth';
import { Card, Col, Row } from 'antd';
import React, { useMemo } from 'react';

export default function Estimate({ user }) {
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
        breadcrumbName: 'Chi tiêu đột xuất',
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
            <Card title="Chi tiêu đột xuất">
              <MonthTable />
            </Card>
          </Col>
        </Row>
      </MainLayout>
    </>
  );
}
export const getServerSideProps = withAuthSSP();
