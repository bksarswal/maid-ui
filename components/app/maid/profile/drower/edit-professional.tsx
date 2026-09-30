"use client";

import { useEffect } from "react";
import {
  Button,
  Drawer,
  Form,
  InputNumber,
  Select,
  Space,
  Switch,
  message,
} from "antd";
import HttpInterceptor from "@/lib/http-interseptor";

interface EditProfessionalInterface {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  initialValues?: {
    experience?: number;
    salary?: number;
    skills?: string[];
    availability?: boolean;
  };
}

const EditProfessional = ({
  open,
  onClose,
  onSuccess,
  initialValues,
}: EditProfessionalInterface) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      form.setFieldsValue(initialValues);
    }
  }, [open, initialValues, form]);

  const onFinish = async (values: EditProfessionalInterface["initialValues"]) => {
    try {
      await HttpInterceptor.put("/maid/profile", values);

      message.success("Professional details updated successfully.");

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
      title="Edit Professional Details"
      placement="right"
      width={500}
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
          label="Experience (Years)"
          name="experience"
          rules={[
            {
              required: true,
              message: "Please enter experience",
            },
          ]}
        >
          <InputNumber
            className="w-full"
            min={0}
            placeholder="Experience"
          />
        </Form.Item>

        <Form.Item
          label="Monthly Salary"
          name="salary"
          rules={[
            {
              required: true,
              message: "Please enter salary",
            },
          ]}
        >
          <InputNumber
            className="w-full"
            min={0}
            placeholder="Salary"
            addonBefore="₹"
          />
        </Form.Item>

        <Form.Item
          label="Skills"
          name="skills"
        >
          <Select
            mode="tags"
            placeholder="Add skills"
            tokenSeparators={[","]}
          />
        </Form.Item>

        <Form.Item
          label="Availability"
          name="availability"
          valuePropName="checked"
        >
          <Switch
            checkedChildren="Available"
            unCheckedChildren="Busy"
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

export default EditProfessional;