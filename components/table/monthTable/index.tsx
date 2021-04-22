import React, { memo, useCallback, useMemo, useState } from 'react';
import { Table, Popconfirm, Form, Col, Row, Button } from 'antd';
import EditableCell from '@components/table/components/EditableCell';

const EditableTable = ({ originData }) => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record: { key: string }) => record.key === editingKey;

  const handleDelete = (key: string) => {
    setData([...data.filter((item: { key: string }) => item.key !== key)]);
  };
  const edit = useCallback(
    (record: { key: string }) => {
      form.setFieldsValue({
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
        ...record,
      });
      setEditingKey(record.key);
    },
    [form]
  );

  const cancel = useCallback(() => setEditingKey(''), []);

  const save = useCallback(
    async (key: string) => {
      try {
        const row = await form.validateFields();
        const newData = [...data];
        const index = newData.findIndex((item) => key === item.key);

        if (index > -1) {
          const item = newData[index];
          newData.splice(index, 1, { ...item, ...row });
          setData(newData);
          setEditingKey('');
        } else {
          newData.push(row);
          setData(newData);
          setEditingKey('');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    [data, form]
  );
  const columns = useMemo(
    () => [
      {
        title: '#',
        dataIndex: 'stt',
        align: 'center' as 'center',
        width: '3%',
      },
      {
        title: '01/2021',
        dataIndex: 'thang1',
        align: 'center' as 'center',
        editable: true,
      },
      {
        title: '02/2021',
        dataIndex: 'thang2',
        align: 'center' as 'center',
        editable: true,
      },
      {
        title: '03/2021',
        dataIndex: 'thang3',
        align: 'center' as 'center',

        editable: true,
      },
      {
        title: '04/2021',
        dataIndex: 'thang4',
        align: 'center' as 'center',

        editable: true,
      },
      {
        title: '05/2021',
        dataIndex: 'thang5',
        align: 'center' as 'center',

        editable: true,
      },
      {
        title: '06/2021',
        dataIndex: 'thang6',
        align: 'center' as 'center',

        editable: true,
      },
      {
        title: '07/2021',
        dataIndex: 'thang7',
        align: 'center' as 'center',

        editable: true,
      },
      {
        title: '08/2021',
        dataIndex: 'thang8',
        align: 'center' as 'center',

        editable: true,
      },
      {
        title: '09/2021',
        dataIndex: 'thang9',
        align: 'center' as 'center',

        editable: true,
      },
      {
        title: '10/2021',
        dataIndex: 'thang10',
        align: 'center' as 'center',

        editable: true,
      },
      {
        title: '11/2021',
        dataIndex: 'thang11',
        align: 'center' as 'center',

        editable: true,
      },
      {
        title: '12/2021',
        align: 'center' as 'center',

        dataIndex: 'thang12',
        editable: true,
      },

      {
        title: 'Chức năng',
        dataIndex: 'operation',
        align: 'center' as 'center',
        fixed: 'right' as 'right',
        width: '6%',
        render: (_: unknown, record: { key: string }) => {
          const editable = isEditing(record);
          return originData.length >= 1 ? (
            <Row>
              <Col span={24}>
                <Popconfirm
                  cancelText="Xóa"
                  title="Bạn muốn xóa?"
                  onConfirm={() => handleDelete(record.key)}
                >
                  <Button type="link">Xoá</Button>
                </Popconfirm>
              </Col>
              <Col span={24}>
                {editable ? (
                  <Row>
                    <Col span={24}>
                      <Button onClick={() => save(record.key)} type="link">
                        Lưu
                      </Button>
                    </Col>
                    <Col span={24}>
                      <Popconfirm
                        cancelText="Hủy"
                        title="Bạn muốn hủy?"
                        onConfirm={cancel}
                      >
                        <Button type="link">Hủy</Button>
                      </Popconfirm>
                    </Col>
                  </Row>
                ) : (
                  <Button
                    disabled={editingKey !== ''}
                    onClick={() => edit(record)}
                    type="link"
                  >
                    Sửa
                  </Button>
                )}
              </Col>
            </Row>
          ) : null;
        },
      },
    ],
    [editingKey, isEditing, originData.length]
  );
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: { key: string }) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        scroll={{ x: 1800 }}
      />
    </Form>
  );
};
export default memo(EditableTable);
