"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
ArrowRight,
CalendarDays,
Clock3,
IndianRupee,
MapPin,
Phone,
} from "lucide-react";

type BookingRequest = {
id: string | number;
customerName: string;
phone?: string;
image?: string;
date: string;
time: string;
address: string;
amount: string | number;
status: "Pending" | "Accepted" | "Rejected" | "Cancelled" | "Completed";
};

type BookingRequestsCardProps = {
bookings?: BookingRequest[];
onViewAll?: () => void;
onAccept?: (booking: BookingRequest) => void;
onReject?: (booking: BookingRequest) => void;
};

const BookingRequestsCard = ({
bookings = [],
onViewAll,
onAccept,
onReject,
}: BookingRequestsCardProps) => {
const statusClass = (status: BookingRequest["status"]) => {
switch (status) {
case "Accepted":
return "bg-green-500 text-white";
case "Pending":
return "bg-yellow-500 text-white";
case "Rejected":
return "bg-red-500 text-white";
case "Cancelled":
return "bg-zinc-500 text-white";
case "Completed":
return "bg-blue-500 text-white";
default:
return "bg-zinc-200 text-zinc-800";
}
};

return ( <Card className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm xl:col-span-2"> <div className="flex items-center justify-between"> <div> <p className="text-sm text-zinc-500">New Requests</p> <h2 className="text-2xl font-bold text-zinc-900">
Booking Requests </h2> </div>


    <Button
      variant="ghost"
      className="text-sm"
      onClick={onViewAll}
    >
      View All
      <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  </div>

  <div className="mt-5 space-y-4">
    {bookings.length === 0 ? (
      <div className="rounded-2xl border border-dashed border-zinc-200 p-6 text-center text-sm text-zinc-500">
        No booking requests found.
      </div>
    ) : (
      bookings.map((booking) => (
        <div
          key={booking.id}
          className="rounded-2xl border border-zinc-100 p-4"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex min-w-0 items-center gap-4">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl">
                <Image
                  src={booking.image || "/image/auth.jpg"}
                  alt={booking.customerName || "booking"}
                  fill
                  className="object-cover"
                  
                />
              </div>

              <div className="min-w-0">
                <h3 className="truncate text-lg font-bold text-zinc-900">
                  {booking.customerName}
                </h3>

                {booking.phone && (
                  <p className="mt-1 flex items-center gap-1 text-sm text-zinc-500">
                    <Phone className="h-4 w-4" />
                    {booking.phone}
                  </p>
                )}
              </div>
            </div>

            <span
              className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${statusClass(
                booking.status
              )}`}
            >
              {booking.status}
            </span>
          </div>

          <div className="mt-4 grid gap-2 text-sm text-zinc-600 md:grid-cols-3">
            <p className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-zinc-500" />
              {booking.date}
            </p>

            <p className="flex items-center gap-2">
              <Clock3 className="h-4 w-4 text-zinc-500" />
              {booking.time}
            </p>

            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-zinc-500" />
              <span className="truncate">{booking.address}</span>
            </p>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-1 font-semibold text-green-600">
              <IndianRupee className="h-4 w-4" />
              {booking.amount}
            </p>

            <div className="flex gap-2">
              <Button
                className="h-10 rounded-xl bg-red-600 text-white hover:bg-red-700"
                onClick={() => onReject?.(booking)}
              >
                Reject
              </Button>

              <Button
                className="h-10 rounded-xl bg-black text-white hover:bg-zinc-800"
                onClick={() => onAccept?.(booking)}
              >
                Accept
              </Button>
            </div>
          </div>
        </div>
      ))
    )}
  </div>
</Card>


);
};

export default BookingRequestsCard;
