import { Button, Form, Input, InputNumber, Select } from 'antd';
import React, { useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FormNumberAdd } from '@components/table/components/dialog/styles';
import { fetchAPI } from '@utils/services';
import { UPLOAD_DATA } from '@constants/index';

const Dialog = ({ onCancel, year, user, getData }) => {
  const [form] = Form.useForm();
  const incomes = user.thunhap;
  const validateMessages = useMemo(
    () => ({
      required: 'Hãy nhập ${label}!',
      types: {
        number: '${label} is not a valid number!',
      },
      number: {
        range: '${label} phải nằm giữa ${min} và ${max}',
      },
    }),
    []
  );
  const onFinish = async (value) => {
    const { thunhap } = value;
    const obj = {};
    obj[`${value.thang}`] = value.sotien;
    const allData = { ...obj, thunhap, key: thunhap };
    const res = await fetchAPI({
      url: UPLOAD_DATA,
      method: 'POST',
      payload: allData,
    });
    if (res.ok) {
      getData();
    }
    if (value) {
      onCancel();
      form.resetFields();
    }
  };
  const { Option } = Select;

  return (
    <>
      <Form
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
        labelAlign="left"
        form={form}
        layout="vertical"
      >
        <Form.Item
          name="thunhap"
          label="Thu nhập"
          rules={[
            { required: true, message: 'Hãy nhập Thu nhập' },
            {
              validator(_, value) {
                const isRepeat = incomes?.filter(
                  (val) => val.thunhap === value
                );
                if (isRepeat === undefined || isRepeat.length === 0) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Thu nhập đã tồn tại'));
              },
            },
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>
        <FormNumberAdd
          name="sotien"
          label="Số tiền"
          rules={[
            { required: true },
            { min: 0, type: 'number', message: 'Phải lớn hơn 0 ' },
          ]}
          hasFeedback
        >
          <InputNumber
            min={0}
            formatter={(value) =>
              ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
          />
        </FormNumberAdd>
        <Form.Item
          name="thang"
          label="Chọn tháng"
          rules={[{ required: true }]}
          hasFeedback
        >
          <Select placeholder="Chọn tháng">
            <Option value={`thang1`}>01/{year}</Option>
            <Option value={`thang2}`}>02/{year}</Option>
            <Option value={`thang3`}>03/{year}</Option>
            <Option value={`thang4`}>04/{year}</Option>
            <Option value={`thang5`}>05/{year}</Option>
            <Option value={`thang6`}>06/{year}</Option>
            <Option value={`thang7`}>07/{year}</Option>
            <Option value={`thang8`}>08/{year}</Option>
            <Option value={`thang9`}>09/{year}</Option>
            <Option value={`thang10`}>10/{year}</Option>
            <Option value={`thang11`}>11/{year}</Option>
            <Option value={`thang12`}>12/{year}</Option>
          </Select>
        </Form.Item>
        <Form.Item name="">
          <Button type="primary" htmlType="submit" block>
            Thêm
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default Dialog;
