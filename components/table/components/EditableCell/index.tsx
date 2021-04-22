import React, { memo, useState } from 'react';
import { Form, Input, InputNumber, Tooltip } from 'antd';

const EditableCell = ({
  editing,
  dataIndex,
  title,
  record,
  index,
  align,
  children,
  ...restProps
}: EditableCellProps) => {
  const isEditAble = typeof (children[1]) === 'string';
  if (record === undefined) {
    return (
      <td {...restProps}>
        {children}
      </td>
    )
  }
  const dom = record[dataIndex];
  const [num, setNum] = useState(dom);
  const numTooltip = num.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
  const onChange = (value) => {
    setNum(value);
  }
  return (
    <td {...restProps}>
      {editing ? (
        <>
          {!isEditAble ?
            <Tooltip trigger={['focus']} placement="topLeft" title={numTooltip}>
              <Form.Item
                name={dataIndex}
                rules={[
                  { required: true, message: "Hãy nhập số tiền" },
                  { min: 0, type: 'number', message: 'Không đượcc nhỏ 0' },
                ]}
              >
                <InputNumber
                  onChange={onChange}
                // min={0}
                // formatter={(value) =>
                //   ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                // }
                />
              </Form.Item>
            </Tooltip> :
            <Form.Item
              name={dataIndex}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          }
        </>
      ) : (
        children
      )}
    </td>
  )
};

export default memo(EditableCell);
