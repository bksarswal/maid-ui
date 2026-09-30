"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  CalendarDays,
  Clock3,
  IndianRupee,
  UserRound,
  Phone,
} from "lucide-react";

type CustomerBookingCardProps = {
  booking: {
    _id: string;
    customer: {
      name: string;
      phone?: string;
      profileImage?: string;
    };
    serviceDate: string;
    serviceTime: string;
    address: string;
    notes?: string;
    amount: number;
    status: "Pending" | "Accepted" | "Rejected" | "Cancelled" | "Completed";
    paymentStatus: "Pending" | "Paid" | "Failed" | "Refunded";
  };
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
  onView?: (id: string) => void;
};

const CustomerBookingCard = ({
  booking,
  onAccept,
  onReject,
  onView,
}: CustomerBookingCardProps) => {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Accepted":
      case "Completed":
        return "bg-green-500 text-white";
      case "Pending":
        return "bg-yellow-500 text-white";
      case "Rejected":
      case "Cancelled":
        return "bg-red-500 text-white";
      default:
        return "bg-zinc-200 text-zinc-800";
    }
  };

  const getPaymentStyle = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-500 text-white";
      case "Pending":
        return "bg-yellow-500 text-white";
      case "Failed":
      case "Refunded":
        return "bg-red-500 text-white";
      default:
        return "bg-zinc-200 text-zinc-800";
    }
  };

  return (
    <Card className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg">
      <div className="flex flex-col gap-4 p-4 sm:flex-row">
        {/* Customer Image */}
        <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-xl sm:h-32 sm:w-32">
          <Image
            src={booking.customer.profileImage || "/image/auth.jpg"}
            alt={booking.customer.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Details */}
        <div className="flex min-w-0 flex-1 flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="truncate text-lg font-bold text-zinc-900">
                  {booking.customer.name}
                </h2>

                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-500">
                  <span className="flex items-center gap-1">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {booking.serviceDate}
                  </span>

                  <span className="flex items-center gap-1">
                    <Clock3 className="h-3.5 w-3.5" />
                    {booking.serviceTime}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${getStatusStyle(
                    booking.status
                  )}`}
                >
                  {booking.status}
                </span>

                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${getPaymentStyle(
                    booking.paymentStatus
                  )}`}
                >
                  {booking.paymentStatus}
                </span>
              </div>
            </div>

            <div className="mt-3 space-y-2 text-sm text-zinc-600">
              <p className="flex items-center gap-1">
                <MapPin className="h-4 w-4 shrink-0 text-zinc-500" />
                <span className="truncate">{booking.address}</span>
              </p>

              {booking.customer.phone && (
                <p className="flex items-center gap-1">
                  <Phone className="h-4 w-4 shrink-0 text-zinc-500" />
                  <span>{booking.customer.phone}</span>
                </p>
              )}

              {booking.notes && (
                <p className="line-clamp-2 text-zinc-500">
                  <span className="font-medium text-zinc-700">Note:</span>{" "}
                  {booking.notes}
                </p>
              )}
            </div>

            <div className="mt-3 flex flex-wrap gap-3 text-sm">
              <div className="flex items-center gap-1 font-semibold text-green-600">
                <IndianRupee className="h-4 w-4" />
                <span>{booking.amount}</span>
              </div>

              <div className="flex items-center gap-1 text-zinc-700">
                <UserRound className="h-4 w-4 text-blue-600" />
                <span>Customer Booking</span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Button
              onClick={() => onView?.(booking._id)}
              variant="outline"
              className="h-9 rounded-xl border-zinc-300"
            >
              View
            </Button>

            {booking.status === "Pending" && (
              <>
                <Button
                  onClick={() => onReject?.(booking._id)}
                  className="h-9 rounded-xl bg-red-600 text-white hover:bg-red-700"
                >
                  Reject
                </Button>

                <Button
                  onClick={() => onAccept?.(booking._id)}
                  className="h-9 rounded-xl bg-black text-white hover:bg-zinc-800"
                >
                  Accept
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CustomerBookingCard;