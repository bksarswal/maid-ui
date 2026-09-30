"use client";

import { useEffect } from "react";
import { Button, Drawer, Form, Input, Space } from "antd";
import HttpInterceptor from "@/lib/http-interseptor";

interface EditInfoInterface {
  open: boolean;
  onClose: () => void;
  onSuccess:()=>void;
  initialValues?: {
    name: string;
    email: string;
    phone: string;
  };
}

const EditInfo = ({open,onClose,initialValues}: EditInfoInterface) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      form.setFieldsValue(initialValues);
    }
  }, [open, initialValues, form]);

  const onFinish = async (values: EditInfoInterface["initialValues"]) => {
    try {
      console.log("calause",values);

       await HttpInterceptor.put("/customer/profile", values);

      onClose();
      form.resetFields();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Drawer
      title="Edit Profile"
      placement="right"
      size={450}
      open={open}
      onClose={onClose}
      destroyOnHidden
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          label="Full Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter your full name",
            },
          ]}
        >
          <Input placeholder="Enter your full name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please enter a valid email",
            },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[
            {
              required: true,
              message: "Please enter your phone number",
            },
          ]}
        >
          <Input placeholder="Enter your phone number" />
        </Form.Item>

        <Form.Item>
          <Space className="w-full justify-end">
            <Button onClick={onClose}>
              Cancel
            </Button>

            <Button
              type="primary"
              htmlType="submit"
            >
              Save Changes
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default EditInfo;