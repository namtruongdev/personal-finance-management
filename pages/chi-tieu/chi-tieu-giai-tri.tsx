import Breadcrumb from '@components/breadcrumb';
import Diolog from '@components/table/components/diolog/dialog';
import MonthTable from '@components/table/monthTable';
import MainLayout from '@layouts/main';
import { withAuthSSP } from '@utils/auth';
import { Button, Card, Col, Row } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useMemo, useState } from 'react';

// import { useRouter } from 'next/router';

export default function Estimate({ user, dataUser }) {
  // const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const originData = [];

  const column = { title: 'Chi tiêu giải trí', dataIndex: 'chitieugiaitri' };

  for (let i = 0; i < 3; i++) {
    const randomNum = Math.floor(Math.random() * 10000000 + 1);
    originData.push({
      key: i.toString(),
      stt: `${i + 1}`,
      chitieugiaitri: '',
      thang1: 200000,
      thang2: 600000,
      thang3: 1000000,
      thang4: randomNum,
      thang5: randomNum,
      thang6: randomNum,
      thang7: randomNum,
      thang8: randomNum,
      thang9: randomNum,
      thang10: randomNum,
      thang11: randomNum,
      thang12: randomNum,
    });
  }

  const routes: Routes[] = useMemo(
    () => [
      {
        path: '/',
        breadcrumbName: 'Trang chủ',
      },
      {
        path: '/chi-tieu',
        breadcrumbName: 'Chi tiêu',
      },
      {
        path: '/chi-tieu-giai-tri',
        breadcrumbName: 'Chi tiêu giải trí',
      },
    ],
    []
  );
  const showModalAdd = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <MainLayout user={user}>
        <Row gutter={[15, 15]}>
          <Col span={24}>
            <Breadcrumb routes={routes} />
          </Col>
          <Col span={24}>
            <Card title="Chi tiêu giải trí">
              <Row gutter={[0, 15]} justify="end">
                <Col>
                  <Button type="primary" onClick={showModalAdd}>
                    Thêm
                  </Button>
                  <Modal
                    title="Thêm tài nguyên"
                    visible={isModalVisible}
                    onCancel={handleCancel}
                    footer={null}
                  >
                    <Row justify="space-around">
                      <Col span={16}>
                        <Diolog onCancel={handleCancel} />
                      </Col>
                    </Row>
                  </Modal>
                </Col>
                <MonthTable column={column} originData={originData} />
              </Row>
            </Card>
          </Col>
        </Row>
      </MainLayout>
    </>
  );
}
export const getServerSideProps = withAuthSSP();
