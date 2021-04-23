import MonthTable from '@components/table/monthTable';
import Breadcrumb from '@components/breadcrumb';
import MainLayout from '@layouts/main';
import { withAuthSSP } from '@utils/auth';
import { Card, Col, Row } from 'antd';
import React, { useMemo } from 'react';

const Estimate = ({ user }) => {
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
        breadcrumbName: 'Thu nhập',
      },
    ],
    []
  );
  const originData = [];

  for (let i = 0; i < 3; i++) {
    originData.push({
      key: i.toString(),
      stt: `${i + 1} `,
      thang1: `Edrward ${i}`,
      thang2: `Edrward ${i}`,
      thang3: `Edrward ${i}`,
      thang4: `Edrward ${i}`,
      thang5: `Edrward ${i}`,
      thang6: `Edrward ${i}`,
      thang7: `Edrward ${i}`,
      thang8: `Edrward ${i}`,
      thang9: `Edrward ${i}`,
      thang10: `Edrward ${i}`,
      thang11: `Edrward ${i}`,
      thang12: `Edrward ${i}`,
    });
  }
  return (
    <>
      <MainLayout user={user}>
        <Row gutter={[15, 15]}>
          <Col span={24}>
            <Breadcrumb routes={routes} />
          </Col>
          <Col span={24}>
            <Card title="Thu nhập">
              <MonthTable originData={originData} />
            </Card>
          </Col>
        </Row>
      </MainLayout>
    </>
  );
};
export default Estimate;
export const getServerSideProps = withAuthSSP();
