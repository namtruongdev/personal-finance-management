import { Button, Form, Input, InputNumber } from 'antd';
import React from 'react';

const Diolog = ({ onCancel }) => {
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };
  const onFinish = (value) => {
    console.log(value)
  }
  return (
    <>

      <Form
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
        labelAlign="left"
        layout="vertical"
      >
        <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]} hasFeedback>
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'email']} label="Tiền" rules={[
          { required: true }]} hasFeedback>
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'Mục đích']}
          label="Mục đích" rules={[{ type: 'number', min: 0, max: 99 }, { required: true }]} hasFeedback>
          <InputNumber />
        </Form.Item>
        <Form.Item name={['user', 'Ngân hàng']} label="Ngân hàng" rules={[{ required: true }]} hasFeedback>
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'Di chúc']} label="Di chúc" rules={[{ required: true }]} hasFeedback>
          <Input />
        </Form.Item>
        <Form.Item
          wrapperCol={{ offset: 8 }}
        >
          <Button type="primary" htmlType="submit" className="btn" onClick={() => onCancel()}
          >
            Submit
        </Button>
        </Form.Item>
      </Form>
    </>
  );
}
export default Diolog;
