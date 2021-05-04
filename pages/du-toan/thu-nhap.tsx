import Breadcrumb from '@components/breadcrumb';
import Dialog from '@components/table/components/dialog/dialog';
import MonthTable from '@components/table/monthTable';
import { GET_DATA } from '@constants/api';
import { yearCrr } from '@constants/year';
import MainLayout from '@layouts/main';
import { withAuthSSP } from '@utils/auth';
import { fetchAPI } from '@utils/services';
import { Button, Card, Col, DatePicker, Row, Space } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useEffect, useMemo, useState } from 'react';

export default function Estimate({ user }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [year, setYear] = useState(`${yearCrr}`);
  const [datePicker, setDatePicker] = useState('2021')
  const [userData, setUserData] = useState({ thunhap: [] });
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
  const getData = async () => {
    const res = await fetchAPI({
      url: GET_DATA,
      method: 'POST',
      payload: `nam${year}`
    });
    console.log(res)
    if (!res.ok) {
      setUserData({ thunhap: [] });
      return 0;
    }
    const result = await res.json();
    setUserData(result.data);
    return 0;
  };
  useEffect(() => {
    getData();
  }, [year]);
  const data1 = userData?.thunhap.map((val, index) => ({
    ...dataInitial,
    ...val,
    stt: index + 1,
  }));
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
  const onChangeDate = (_, dateString) => {
    setDatePicker(dateString)
  }
  const onConfirmDate = async () => {
    setYear(datePicker)
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
              <Row gutter={[0, 15]} justify="space-between">
                <Col>
                  <Space>
                    <DatePicker onChange={onChangeDate} picker="year" />
                    <Button onClick={onConfirmDate}>Chọn</Button>
                  </Space>
                </Col>
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
                        <Dialog
                          onCancel={handleCancel}
                          user={userData}
                          getData={getData}
                          year={year}
                        />
                      </Col>
                    </Row>
                  </Modal>
                </Col>
                <MonthTable
                  getData={getData}
                  originData={data1}
                  year={year}
                />
              </Row>
            </Card>
          </Col>
        </Row>
      </MainLayout>
    </>
  );
}
export const getServerSideProps = withAuthSSP();
