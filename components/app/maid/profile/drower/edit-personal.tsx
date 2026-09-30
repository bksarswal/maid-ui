"use client";

import { useEffect } from "react";
import { Drawer, Form, Input, Button, Space, message } from "antd";
import HttpInterceptor from "@/lib/http-interseptor";

interface EditPersonalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  initialValues?: {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
  };
}

const EditPersonal = ({
  open,
  onClose,
  onSuccess,
  initialValues,
}: EditPersonalProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      form.setFieldsValue(initialValues);
    }
  }, [open, initialValues, form]);

  const onFinish = async (values: any) => {
    try {
      await HttpInterceptor.put("/maid/profile", values);

      message.success("Profile updated successfully");

      onSuccess?.();
      onClose();
    } catch (error: any) {
      console.log(error);

      message.error(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <Drawer
      title="Edit Personal Information"
      placement="right"
      width={450}
      open={open}
      onClose={onClose}
      destroyOnHidden
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          label="Full Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter your name",
            },
          ]}
        >
          <Input placeholder="Enter full name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please enter valid email",
            },
          ]}
        >
          <Input placeholder="Enter email" />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            {
              required: true,
              message: "Please enter phone number",
            },
          ]}
        >
          <Input placeholder="Enter phone number" />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
        >
          <Input.TextArea
            rows={4}
            placeholder="Enter address"
          />
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

export default EditPersonal;