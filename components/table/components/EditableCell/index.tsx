import React, { memo } from 'react';
import { Form, InputNumber } from 'antd';

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
  const dom = Number.isInteger(children[1]) ? children[1].toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : children;
  return (

    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          rules={[
            { required: true },
            { min: 0, type: 'number', message: 'Không đượcc nhỏ 0' },
          ]}
        >
          <InputNumber
            min={0}
            formatter={(value) =>
              ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
          />
        </Form.Item>
      ) : (
        dom
      )}
    </td>
  )
};

export default memo(EditableCell);
