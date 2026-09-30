"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
CalendarDays,
Clock3,
IndianRupee,
MapPin,
Star,
ArrowRight,
Plus,
} from "lucide-react";
import RecommendedMaids from "./recomeded-maid";
import { useRouter } from "next/navigation";

const CustomerDashboard = () => {
  const router  = useRouter()

const summaryCards = [
{
title: "Total Bookings",
value: "12",
icon: CalendarDays,
bg: "bg-zinc-900",
},
{
title: "Upcoming",
value: "3",
icon: Clock3,
bg: "bg-zinc-800",
},
{
title: "Completed",
value: "8",
icon: Star,
bg: "bg-zinc-700",
},
{
title: "Pending Payments",
value: "₹2,400",
icon: IndianRupee,
bg: "bg-zinc-600",
},
];

const nextBooking = {
maidName: "Priya Sharma",
image: "/image/auth.jpg",
date: "28 Sep 2026",
time: "10:30 AM",
address: "Malviya Nagar, Jaipur",
status: "Accepted",
amount: "₹1,200",
};

const recentBookings = [
{
id: 1,
maidName: "Priya Sharma",
image: "/image/auth.jpg",
date: "25 Sep 2026",
status: "Completed",
amount: "₹1,200",
},
{
id: 2,
maidName: "Sunita Devi",
image: "/image/auth.jpg",
date: "22 Sep 2026",
status: "Pending",
amount: "₹900",
},
{
id: 3,
maidName: "Rani Kumari",
image: "/image/auth.jpg",
date: "18 Sep 2026",
status: "Cancelled",
amount: "₹1,000",
},
];





const statusStyle = (status: string) => {
switch (status) {
case "Completed":
return "bg-green-500 text-white";
case "Accepted":
return "bg-blue-500 text-white";
case "Pending":
return "bg-yellow-500 text-white";
case "Cancelled":
return "bg-red-500 text-white";
default:
return "bg-zinc-200 text-zinc-800";
}
};

return ( 
<div className="min-h-screen bg-zinc-50 p-4 md:p-6"> 
 <div className="mx-auto max-w-7xl space-y-6">
    {/* Top Header */} <div className="rounded-3xl bg-black p-6 text-white md:p-8"> <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"> <div> <p className="text-sm text-zinc-400">Welcome back 👋</p> <h1 className="mt-1 text-3xl font-bold md:text-4xl">
    Customer Dashboard </h1> <p className="mt-2 max-w-2xl text-sm text-zinc-300 md:text-base">
    Manage your bookings, track upcoming services, and book trusted maids from one place. </p> </div>

        <Button className="h-11 rounded-xl bg-white text-black hover:bg-zinc-200">
          <Plus className="mr-2 h-4 w-4" />
          Book Maid
        </Button>
      </div>
    </div>

    {/* Summary Cards */}
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {summaryCards.map((item) => {
        const Icon = item.icon;
        return (
          <Card
            key={item.title}
            className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-zinc-500">{item.title}</p>
                <h2 className="mt-2 text-3xl font-bold text-zinc-900">
                  {item.value}
                </h2>
              </div>

              <div className={`rounded-2xl p-3 text-white ${item.bg}`}>
                <Icon className="h-5 w-5" />
              </div>
            </div>
          </Card>
        );
      })}
    </div>

    {/* Main Grid */}
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
      {/* Next Booking */}
      <Card className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm xl:col-span-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-zinc-500">Next Booking</p>
            <h2 className="text-2xl font-bold text-zinc-900">
              Upcoming service
            </h2>
          </div>

          <span className="rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white">
            {nextBooking.status}
          </span>
        </div>

        <div className="mt-6 flex flex-col gap-5 md:flex-row">
          <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl">
            <Image
              src={nextBooking.image}
              alt={nextBooking.maidName}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-bold text-zinc-900">
              {nextBooking.maidName}
            </h3>

            <div className="mt-3 space-y-2 text-sm text-zinc-600">
              <p className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-zinc-500" />
                {nextBooking.date}
              </p>

              <p className="flex items-center gap-2">
                <Clock3 className="h-4 w-4 text-zinc-500" />
                {nextBooking.time}
              </p>

              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-zinc-500" />
                {nextBooking.address}
              </p>

              <p className="flex items-center gap-2 font-semibold text-green-600">
                <IndianRupee className="h-4 w-4" />
                {nextBooking.amount}
              </p>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <Button className="h-10 rounded-xl bg-black text-white hover:bg-zinc-800">
                View Details
              </Button>
              <Button variant="outline" className="h-10 rounded-xl">
                Cancel Booking
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Recent Bookings */}
      <Card className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-zinc-500">Recent Bookings</p>
            <h2 className="text-2xl font-bold text-zinc-900">
              History
            </h2>
          </div>

          <Button variant="ghost" className="text-sm">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="mt-5 space-y-4">
          {recentBookings.map((booking) => (
            <div
              key={booking.id}
              className="flex items-center gap-3 rounded-2xl border border-zinc-100 p-3"
            >
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl">
                <Image
                  src={booking.image}
                  alt={booking.maidName}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="truncate font-semibold text-zinc-900">
                  {booking.maidName}
                </h3>
                <p className="text-sm text-zinc-500">{booking.date}</p>
                <p className="text-sm font-medium text-green-600">
                  {booking.amount}
                </p>
              </div>

              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusStyle(
                  booking.status
                )}`}
              >
                {booking.status}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>

    {/* Recommended Maids */}
    <RecommendedMaids 
    onSeeMore={()=>router.push("/customer/maids")}
    />
  </div>
</div>


);
};

export default CustomerDashboard;
