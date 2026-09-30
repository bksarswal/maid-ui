"use client";

import { useState } from "react";
import {
  Form,
  Input,
  DatePicker,
  TimePicker,
  InputNumber,
  message,
} from "antd";
import dayjs from "dayjs";
import { X } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import HttpInterceptor from "@/lib/http-interseptor";
import { ClientCatchError } from "@/lib/client-catch-error";

type BookingDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  maidId: string;
  maidName?: string;
  maidSalary?: number;
};

const BookingDrawer = ({
  open,
  onOpenChange,
  maidId,
  maidName = "Maid",
  maidSalary = 0,
}: BookingDrawerProps) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleBooking = async (values: any) => {
    try {
      setLoading(true);

      const payload = {
        maidId,
        serviceDate: values.serviceDate.format("YYYY-MM-DD"),
        serviceTime: values.serviceTime.format("hh:mm A"),
        address: values.address,
        notes: values.notes || "",
        amount: maidSalary || values.amount,
      };

      const res = await HttpInterceptor.post("/booking", payload);

      message.success(res.data.message);
      form.resetFields();
      onOpenChange(false);
    } catch (err) {
      ClientCatchError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full max-w-[520px] p-0 overflow-hidden"
      >
        <div className="flex h-full flex-col bg-white">
          {/* Header */}
          <div className="flex items-center justify-between border-b bg-black px-6 py-4 text-white">
            <SheetHeader className="space-y-1 text-left">
              <SheetTitle className="text-xl font-bold text-white">
                Book Maid
              </SheetTitle>
              <p className="text-sm text-zinc-300">
                Fill the booking details for {maidName}.
              </p>
            </SheetHeader>

            <SheetClose >
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full text-white hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </Button>
            </SheetClose>
          </div>

          {/* Form */}
          <div className="flex-1 overflow-y-auto p-6">
            <Form
              form={form}
              layout="vertical"
              onFinish={handleBooking}
              className="space-y-2"
            >
              <Form.Item
                label="Service Date"
                name="serviceDate"
                rules={[
                  {
                    required: true,
                    message: "Please select service date",
                  },
                ]}
              >
                <DatePicker
                  className="h-11 w-full"
                  disabledDate={(current) =>
                    current && current < dayjs().startOf("day")
                  }
                />
              </Form.Item>

              <Form.Item
                label="Service Time"
                name="serviceTime"
                rules={[
                  {
                    required: true,
                    message: "Please select service time",
                  },
                ]}
              >
                <TimePicker
                  className="h-11 w-full"
                  format="hh:mm A"
                  use12Hours
                />
              </Form.Item>

              <Form.Item
                label="Service Address"
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Please enter address",
                  },
                ]}
              >
                <Input.TextArea
                  rows={3}
                  placeholder="Enter complete address"
                />
              </Form.Item>

              <Form.Item label="Additional Notes" name="notes">
                <Input.TextArea
                  rows={3}
                  placeholder="Any instructions for maid..."
                />
              </Form.Item>

              <Form.Item
                label="Amount (₹)"
                name="amount"
                initialValue={maidSalary}
                rules={[
                  {
                    required: true,
                    message: "Please enter amount",
                  },
                ]}
              >
                <InputNumber
                  className="h-11 w-full"
                  min={0}
                  placeholder="Enter amount"
                  disabled={maidSalary > 0}
                />
              </Form.Item>

              <Button
                type="submit"
                className="h-11 w-full bg-black text-white hover:bg-zinc-800"
                disabled={loading}
              >
                {loading ? "Booking..." : "Confirm Booking"}
              </Button>
            </Form>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BookingDrawer;