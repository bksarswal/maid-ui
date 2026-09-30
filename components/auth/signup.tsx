"use client";

import { Form, Input, message, Radio } from "antd";
import { Card, CardDescription, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import HttpInterceptor from "@/lib/http-interseptor";
import { ClientCatchError } from "@/lib/client-catch-error";
import { useRouter } from "next/navigation";


const Signup = () => {
  const router = useRouter();
  const [form] = Form.useForm();

  interface UserInterface {
    name: string;
    email: string;
    password: string;
    role: "customer" | "maid";
  }

  const handleSignup = async (values: UserInterface) => {
    try {
      const res = await HttpInterceptor.post("auth/signup", values);

      form.resetFields();
      message.success(res.data.message);

      setTimeout(() => {
        router.push("/auth/login");
      }, 1500);
    } catch (err) {
      ClientCatchError(err);
    }
  };

  return (
    <div className="w-full flex justify-center items-center p">

      

      {/* Right Side */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6">
        <Card className="w-full max-w-lg rounded-3xl border-0 bg-white shadow-2xl p-10">
          <CardTitle className="text-3xl font-bold text-slate-900">
            Create Account
          </CardTitle>

          <CardDescription className="mt-2 mb-8 text-gray-500">
            Join our platform and get started in a few minutes.
          </CardDescription>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSignup}
            size="large"
          >
            {/* Name */}
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
              <Input
                placeholder="John Doe"
                className="px-3 py-2 rounded-xl"
              />
            </Form.Item>

            {/* Email */}
            <Form.Item
              label="Email Address"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please enter your email",
                },
                {
                  type: "email",
                  message: "Enter a valid email",
                },
              ]}
            >
              <Input
                placeholder="example@gmail.com"
                className="px-3 py-2 rounded-xl"
              />
            </Form.Item>

            {/* Password */}
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter your password",
                },
              ]}
            >
              <Input.Password
                placeholder="Create a password"
                className="px-3 py-2 rounded-xl"
              />
            </Form.Item>

            {/* Role */}
            <Form.Item
              label="Select Role"
              name="role"
              rules={[
                {
                  required: true,
                  message: "Please select your role",
                },
              ]}
            >
              <Radio.Group className="flex gap-8">
                <Radio value="customer">Customer</Radio>
                <Radio value="maid">Maid</Radio>
              </Radio.Group>
            </Form.Item>

            {/* Button */}
            <Form.Item className="mb-4">
              <Button
                type="submit"
                className="w-full px-3 py-2 rounded-xl bg-black text-white hover:bg-neutral-800"
              >
                Signup
              </Button>
            </Form.Item>
          </Form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="px-4 text-sm text-gray-400">OR</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Login */}
          <p className="text-center text-sm text-gray-500">
            Already have an account?
            <button
              onClick={() => router.push("/auth/login")}
              className="ml-2 font-semibold text-black hover:underline"
            >
              Login
            </button>
          </p>
        </Card>
      </div>
    </div>
 
    
  );
};

export default Signup;