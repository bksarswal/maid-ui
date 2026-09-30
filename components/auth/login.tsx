"use client";

import { useState } from "react";
import { Form, Input, message } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Card, CardDescription, CardTitle } from "../ui/card";


import HttpInterceptor from "@/lib/http-interseptor";
import { ClientCatchError } from "@/lib/client-catch-error";
import { Button } from "../ui/button";

interface UserInterface {
  name?: string;
  email: string;
  password: string;
  role?: "customer" | "maid";
}

const Login = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values: UserInterface) => {
    try {
      setLoading(true);

      const res = await HttpInterceptor.post("auth/login", values);

      form.resetFields();
      localStorage.setItem("role",res.data.user.role)
      message.success(res.data.message);
            
      if (res.data.user.role === "customer") {
        router.push("/customer/dashboard");
      }

      if (res.data.user.role === "maid") {
        router.push("/maid/dashboard");
      }
    } catch (err) {
      ClientCatchError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gray-100">

      {/* ================= LEFT SIDE ================= */}

      <div className="relative hidden lg:block overflow-hidden">

        <Image
          src="/image/auth.jpg"
          alt="Login"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/55" />

        <div className="absolute inset-0 flex flex-col justify-between p-14">

          <div>
            <h2 className="text-3xl font-bold text-white">
              Maid Hiring
            </h2>
          </div>

          <div className="max-w-lg">

            <h1 className="text-6xl font-bold text-white leading-tight">
              Hire Trusted
              <br />
              Domestic
              <br />
              Helpers
            </h1>

            <p className="mt-6 text-lg text-gray-200 leading-8">
              Find verified maids, babysitters, cooks and housekeepers
              with confidence. Fast, secure and reliable hiring.
            </p>

            <div className="mt-10 flex gap-10">

              <div>
                <h2 className="text-4xl font-bold text-white">
                  10K+
                </h2>

                <p className="text-gray-300">
                  Happy Customers
                </p>
              </div>

              <div>
                <h2 className="text-4xl font-bold text-white">
                  500+
                </h2>

                <p className="text-gray-300">
                  Verified Maids
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ================= RIGHT SIDE ================= */}

      <div className="flex items-center justify-center px-6 py-10">

        <Card className="w-full max-w-md rounded-3xl shadow-2xl border-0 p-8">

          <div className="flex justify-center mb-6">

            <div className="h-16 w-16 rounded-2xl bg-black text-white flex items-center justify-center text-3xl font-bold shadow-lg">
              M
            </div>

          </div>

          <div className="text-center mb-8">

            <CardTitle className="text-3xl font-bold">
              Welcome Back 👋
            </CardTitle>

            <CardDescription className="mt-2 text-gray-500">
              Login to continue your journey
            </CardDescription>

          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleLogin}
            autoComplete="off"
          >

            <Form.Item
              label="Email Address"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please enter your email.",
                },
                {
                  type: "email",
                  message: "Please enter a valid email.",
                },
              ]}
            >
              <Input
                size="large"
                placeholder="example@gmail.com"
                className="rounded-xl"
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter your password.",
                },
              ]}
            >
              <Input.Password
                size="large"
                placeholder="••••••••"
                className="rounded-xl"
              />
            </Form.Item>

            <div className="flex justify-end mb-6">

              <button
                type="button"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot Password?
              </button>

            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl  text-white font-semibold"
            >
              {loading ? "Signing In..." : "Login"}
            </Button>

          </Form>

          <div className="flex items-center gap-4 my-8">

            <div className="flex-1 border-t" />

            <span className="text-gray-400 text-sm">
              OR
            </span>

            <div className="flex-1 border-t" />

          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full h-12 rounded-xl"
          >
            Continue with Google
          </Button>

          <p className="mt-8 text-center text-gray-500">

            Don't have an account?

            <span
              onClick={() => router.push("/auth/signup")}
              className="ml-2 font-semibold text-blue-600 cursor-pointer hover:underline"
            >
              Signup
            </span>

          </p>

        </Card>

      </div>

    </div>
  );
};

export default Login;