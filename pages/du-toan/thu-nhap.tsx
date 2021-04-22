import Breadcrumb from '@components/breadcrumb';
import Diolog from '@components/table/components/diolog/dialog';
import MonthTable from '@components/table/monthTable';
import MainLayout from '@layouts/main';
import { withAuthSSP } from '@utils/auth';
import { Button, Card, Col, Row } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useMemo, useState } from 'react';

export default function Estimate({ user }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [columnsMonth, setColumnsMonth] = useState('');
  const dataInitial = {
    thunhap: 'Tiền xăng',
    thang1: 0,
    thang2: 0,
    thang3: 0,
    thang4: 0,
    thang5: 0,
    thang6: 0,
    thang7: 0,
    thang8: 0,
    thang9: 0,
    thang10: 0,
    thang11: 0,
    thang12: 0,
  };
  const data = user.dutoan?.thunhap ? user.dutoan.thunhap : [dataInitial];
  const data1 = data.map((val, key) => ({ ...dataInitial, ...val, stt: (key + 1).toString() }))
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
  const showModalAdd = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const columns = (param) => {
    setColumnsMonth(param);
  };
  return (
    <>
      <MainLayout user={user}>
        <Row gutter={[15, 15]}>
          <Col span={24}>
            <Breadcrumb routes={routes} />
          </Col>
          <Col span={24}>
            <Card title="Thu nhập">
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
                      <Col span={24}>
                        <Diolog
                          onCancel={handleCancel}
                          columnsMonth={columnsMonth}
                          user={user}
                        />
                      </Col>
                    </Row>
                  </Modal>
                </Col>
                <MonthTable originData={data1} columnss={columns} />
              </Row>
            </Card>
          </Col>
        </Row>
      </MainLayout>
    </>
  );
}
export const getServerSideProps = withAuthSSP();
