import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Table, Popconfirm, Form, Col, Row, Button, Typography, Tooltip } from 'antd';
import EditableCell from '@components/table/components/EditableCell';
import { v4 as uuidv4 } from 'uuid';
import { fetchAPI } from '@utils/services';
import { GET_DATA, EDIT_DATA } from '@constants/api';
import { useRouter } from 'next/router';

const { Text } = Typography;
const EditableTable = ({ originData, columnss }) => {
  const d = new Date();
  const year = d.getFullYear()
  const [form] = Form.useForm();
  // const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record: DataTableMonth) => record.key === editingKey;
  const router = useRouter()

  const reFreshPage = () => {
    router.replace(router.asPath)
  }
  const handleDelete = async (key: string) => {
    const res = await fetchAPI({
      url: GET_DATA,
      payload: key,
      method: "POST"
    })
    if (res.ok) {
      reFreshPage();
    }
  };
  useEffect(() => {
    columnss(columns);
  }, []);
  const edit = useCallback(
    (record: DataTableMonth) => {
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
      setEditingKey(record.key); 1
    },
    [form]
  );
  const cancel = useCallback(() => setEditingKey(''), []);

  const save = useCallback(
    async (key: string) => {
      try {
        const row = await form.validateFields();
        const newData = [...originData];
        const index = newData.findIndex((item) => key === item.key);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setEditingKey('');
        const res = await fetchAPI({
          url: EDIT_DATA,
          payload: newData,
          method: "POST"
        })
        console.log(res)
        if (res.ok) {
          reFreshPage();
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    [originData, form]
  );
  const columns = useMemo(
    () => [
      {
        title: '#',
        dataIndex: 'stt',
        align: 'center' as 'center',
        fixed: true,
        width: '4%',
      },
      {
        title: 'Thu nhập',
        dataIndex: 'thunhap',
        align: 'center' as 'center',
        width: '8%',
        fixed: true,
        editable: true,
      },
      {
        title: `01/${year}`,
        dataIndex: 'thang1',
        align: 'center' as 'center',
        editable: true,
        ellipsis: {
          showTitle: false,
        },
        render: (a) => {
          const toLocal = a.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
          return (<>
            {toLocal.length > 13 ? <Tooltip placement="topLeft" title={toLocal}>
              {toLocal.substring(0, 11)}...
            </Tooltip> : toLocal}
          </>
          )
        },
      },
      {
        title: `02/${year}`,
        dataIndex: 'thang2',
        align: 'center' as 'center',
        editable: true,
        ellipsis: {
          showTitle: false,
        },
        render: (a) => {
          const toLocal = a.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
          return (<>
            {toLocal.length > 13 ? <Tooltip placement="topLeft" title={toLocal}>
              {toLocal.substring(0, 11)}...
            </Tooltip> : toLocal}
          </>
          )
        },
      },
      {
        title: `03/${year}`,
        dataIndex: 'thang3',
        align: 'center' as 'center',

        editable: true,
        ellipsis: {
          showTitle: false,
        },
        render: (a) => {
          const toLocal = a.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
          return (<>
            {toLocal.length > 13 ? <Tooltip placement="topLeft" title={toLocal}>
              {toLocal.substring(0, 11)}...
            </Tooltip> : toLocal}
          </>
          )
        },
      },
      {
        title: `04/${year}`,
        dataIndex: 'thang4',
        align: 'center' as 'center',

        editable: true,
        ellipsis: {
          showTitle: false,
        },
        render: (a) => {
          const toLocal = a.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
          return (<>
            {toLocal.length > 13 ? <Tooltip placement="topLeft" title={toLocal}>
              {toLocal.substring(0, 11)}...
            </Tooltip> : toLocal}
          </>
          )
        },
      },
      {
        title: `05/${year}`,
        dataIndex: 'thang5',
        align: 'center' as 'center',
        ellipsis: {
          showTitle: false,
        },
        render: (a) => {
          const toLocal = a.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
          return (<>
            {toLocal.length > 13 ? <Tooltip placement="topLeft" title={toLocal}>
              {toLocal}
            </Tooltip> : toLocal}
          </>
          )
        },
        editable: true,
      },
      {
        title: `06/${year}`,
        dataIndex: 'thang6',
        align: 'center' as 'center',
        ellipsis: {
          showTitle: false,
        },
        render: (a) => {
          const toLocal = a.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
          return (<>
            {toLocal.length > 13 ? <Tooltip placement="topLeft" title={toLocal}>
              {toLocal.substring(0, 11)}...
            </Tooltip> : toLocal}
          </>
          )
        },
        editable: true,
      },
      {
        title: `07/${year}`,
        dataIndex: 'thang7',
        align: 'center' as 'center',
        ellipsis: {
          showTitle: false,
        },
        render: (a) => {
          const toLocal = a.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
          return (<>
            {toLocal.length > 13 ? <Tooltip placement="topLeft" title={toLocal}>
              {toLocal.substring(0, 11)}...
            </Tooltip> : toLocal}
          </>
          )
        },
        editable: true,
      },
      {
        title: `08/${year}`,
        dataIndex: 'thang8',
        align: 'center' as 'center',
        ellipsis: {
          showTitle: false,
        },
        render: (a) => {
          const toLocal = a.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
          return (<>
            {toLocal.length > 13 ? <Tooltip placement="topLeft" title={toLocal}>
              {toLocal.substring(0, 11)}...
            </Tooltip> : toLocal}
          </>
          )
        },
        editable: true,
      },
      {
        title: `09/${year}`,
        dataIndex: 'thang9',
        align: 'center' as 'center',
        ellipsis: {
          showTitle: false,
        },
        render: (a) => {
          const toLocal = a.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
          return (<>
            {toLocal.length > 13 ? <Tooltip placement="topLeft" title={toLocal}>
              {toLocal.substring(0, 11)}...
            </Tooltip> : toLocal}
          </>
          )
        },
        editable: true,
      },
      {
        title: `10/${year}`,
        dataIndex: 'thang10',
        align: 'center' as 'center',
        ellipsis: {
          showTitle: false,
        },
        render: (a) => {
          const toLocal = a.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
          return (<>
            {toLocal.length > 14 ? <Tooltip placement="topLeft" title={toLocal}>
              {toLocal.substring(0, 12)}...
            </Tooltip> : toLocal}
          </>
          )
        },
        editable: true,
      },
      {
        title: `11/${year}`,
        dataIndex: 'thang11',
        align: 'center' as 'center',
        ellipsis: {
          showTitle: false,
        },
        render: (a) => {
          const toLocal = a.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
          return (<>
            {toLocal.length > 14 ? <Tooltip placement="topLeft" title={toLocal}>
              {toLocal.substring(0, 12)}...
            </Tooltip> : toLocal}
          </>
          )
        },
        editable: true,
      },
      {
        title: `12/${year}`,
        align: 'center' as 'center',
        ellipsis: {
          showTitle: false,
        },
        render: (a) => {
          const toLocal = a.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
          return (<>
            {toLocal.length > 14 ? <Tooltip placement="topLeft" title={toLocal}>
              {toLocal.substring(0, 12)}...
            </Tooltip> : toLocal}
          </>
          )
        },
        dataIndex: 'thang12',
        editable: true,
      },
      {
        title: 'Chức năng',
        dataIndex: 'operation',
        align: 'center' as 'center',
        fixed: 'right' as 'right',
        width: '6%',
        render: (_: unknown, record: DataTableMonth) => {
          const editable = isEditing(record);
          return originData.length >= 1 ? (
            <Row>
              <Col span={24}>
                <Popconfirm
                  cancelText="Không"
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
      onCell: (record: DataTableMonth) => ({
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
        dataSource={originData}
        pagination={{ pageSize: 4 }}
        columns={mergedColumns}
        scroll={{ x: 1800 }}
        summary={() => {
          const arrTotal = [
            originData.reduce((total, curr) => total + curr.thang1, 0),
            originData.reduce((total, curr) => total + curr.thang2, 0),
            originData.reduce((total, curr) => total + curr.thang3, 0),
            originData.reduce((total, curr) => total + curr.thang4, 0),
            originData.reduce((total, curr) => total + curr.thang5, 0),
            originData.reduce((total, curr) => total + curr.thang6, 0),
            originData.reduce((total, curr) => total + curr.thang7, 0),
            originData.reduce((total, curr) => total + curr.thang8, 0),
            originData.reduce((total, curr) => total + curr.thang9, 0),
            originData.reduce((total, curr) => total + curr.thang10, 0),
            originData.reduce((total, curr) => total + curr.thang11, 0),
            originData.reduce((total, curr) => total + curr.thang12, 0),
          ];
          return (
            <>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={2} align="center">
                  <strong>Tổng</strong>
                </Table.Summary.Cell>
                {arrTotal.map((total, index) => {
                  const totalTolocal = total.toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  })
                  return (
                    <Table.Summary.Cell
                      align="center"
                      index={index + 2}
                      key={uuidv4()}
                    >
                      <Text>
                        <strong>
                          {total.toString().length > 9 ?
                            <Tooltip placement="topLeft" title={totalTolocal}>
                              {totalTolocal.substring(0, 11)}...
                        </Tooltip>
                            : totalTolocal}
                        </strong>
                      </Text>
                    </Table.Summary.Cell>
                  )
                })}
                <Table.Summary.Cell align="center" index={14}>
                  <Text> </Text>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </>
          );
        }}
      />
    </Form>
  );
};
export default memo(EditableTable);
