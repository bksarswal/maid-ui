"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, CalendarDays, Clock3, IndianRupee, Star } from "lucide-react";

type BookingHistoryCardProps = {
  booking: {
    _id?: string;
    serviceDate: string;
    serviceTime: string;
    status: "Pending" | "Accepted" | "Rejected" | "Cancelled" | "Completed";
    paymentStatus: "Pending" | "Paid" | "Failed" | "Refunded";
    amount: number;
    address: string;
    notes?: string;
    maid: {
      name: string;
      profileImage?: string;
      rating?: number;
      experience?: number;
      skills?: string[];
    };
  };
};

const BookingHistoryCard = ({ booking }: BookingHistoryCardProps) => {
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
    <Card className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-md transition-all duration-300 hover:shadow-xl">
      <div className="flex flex-col gap-4 p-4 sm:flex-row">
        {/* Image */}
        <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-xl sm:h-32 sm:w-32">
          <Image
            src={booking.maid.profileImage || "/image/auth.jpg"}
            alt={booking.maid.name}
            fill
            className="object-cover"
          />

          <div className="absolute left-2 top-2 rounded-full bg-black/80 px-2 py-1 text-[10px] font-semibold text-white">
            Booking
          </div>
        </div>

        {/* Details */}
        <div className="flex min-w-0 flex-1 flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="truncate text-lg font-bold text-zinc-900">
                  {booking.maid.name}
                </h2>

                <div className="mt-1 flex items-center gap-2 text-xs text-zinc-500">
                  <CalendarDays className="h-3.5 w-3.5" />
                  <span>{booking.serviceDate}</span>

                  <Clock3 className="ml-2 h-3.5 w-3.5" />
                  <span>{booking.serviceTime}</span>
                </div>
              </div>

              {typeof booking.maid.rating === "number" && (
                <div className="flex shrink-0 items-center gap-1 rounded-full bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-700">
                  <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                  <span>{booking.maid.rating}</span>
                </div>
              )}
            </div>

            <p className="mt-2 flex items-center gap-1 text-sm text-zinc-500">
              <MapPin className="h-4 w-4 shrink-0" />
              <span className="truncate">{booking.address}</span>
            </p>

            {booking.notes && (
              <p className="mt-2 line-clamp-2 text-sm text-zinc-600">
                <span className="font-medium text-zinc-800">Note:</span>{" "}
                {booking.notes}
              </p>
            )}

            <div className="mt-3 flex flex-wrap gap-2">
              <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${getStatusStyle(booking.status)}`}>
                {booking.status}
              </span>

              <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${getPaymentStyle(booking.paymentStatus)}`}>
                {booking.paymentStatus}
              </span>

              {booking.maid.experience !== undefined && (
                <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] font-medium text-zinc-700">
                  {booking.maid.experience} Years
                </span>
              )}

              {booking.maid.skills?.slice(0, 2).map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] font-medium text-zinc-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-zinc-50 px-4 py-3">
            <div className="flex items-center gap-1 text-sm text-zinc-600">
              <IndianRupee className="h-4 w-4" />
              <span className="font-medium">Amount</span>
            </div>

            <div className="text-right">
              <p className="text-lg font-bold text-green-600">₹{booking.amount}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BookingHistoryCard;