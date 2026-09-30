"use client";

import { useEffect } from "react";
import { Button, Drawer, Form, Input, Space } from "antd";
import HttpInterceptor from "@/lib/http-interseptor";

interface EditProfileInterface {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialValues?: {
    name: string;
    email: string;
  };
}

const EditProfile = ({open,onClose,initialValues,onSuccess}: EditProfileInterface) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      form.setFieldsValue(initialValues);
    }
  }, [open, initialValues, form]);

  const onFinish = async (values: EditProfileInterface["initialValues"]) => {
    try {
    

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

export default EditProfile;