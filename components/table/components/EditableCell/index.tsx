import React, { memo, useState } from 'react';
import { Form, Input, InputNumber, Tooltip } from 'antd';

const EditableCell = ({
  editing,
  dataIndex,
  record,
  style,
  className,
  children,
}: EditableCellProps) => {
  const td = record?.[dataIndex];
  const [numberToolTip, setNumberToolTip] = useState<number>(td);

  const money = numberToolTip?.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  const onChange = (value: number) => {
    setNumberToolTip(value);
  };
  return (
    <td style={style} className={className}>
      {editing ? (
        <>
          {['stt', 'thunhap'].indexOf(dataIndex) === -1 && (
            <Tooltip trigger={['focus']} placement="topLeft" title={money}>
              <Form.Item
                name={dataIndex}
                rules={[
                  { required: true, message: 'Vui lòng nhập số tiền!' },
                  { min: 0, type: 'number', message: 'Số tiền không được âm!' },
                ]}
              >
                <InputNumber onChange={onChange} />
              </Form.Item>
            </Tooltip>
          )}
          {dataIndex === 'thunhap' && (
            <Form.Item
              name={dataIndex}
              rules={[{ required: true, message: 'Vui lòng nhập thu nhập!' }]}
            >
              <Input />
            </Form.Item>
          )}
          {dataIndex === 'stt' && <Form.Item>{record?.stt}</Form.Item>}
        </>
      ) : (
        children
      )}
    </td>
  );
};

export default memo(EditableCell);
