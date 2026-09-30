"use client";

import Image from "next/image";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
CalendarDays,
IndianRupee,
Clock3,
CheckCircle2,
MapPin,
Star,
Phone,
UserRound,
Bell,
ToggleLeft,
ToggleRight,
ArrowRight,
} from "lucide-react";
import BookingRequestsCard from "./bookig-request-card";

const MaidDashboard = () => {
const [available, setAvailable] = useState(true);

const summaryCards = [
{
title: "Total Earnings",
value: "₹18,400",
icon: IndianRupee,
},
{
title: "Bookings",
value: "24",
icon: CalendarDays,
},
{
title: "Pending Requests",
value: "6",
icon: Bell,
},
{
title: "Completed Jobs",
value: "18",
icon: CheckCircle2,
},
];



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

const upcomingJobs = [
  {
    id: 1,
    customerName: "Ravi Sharma",
    image: "/image/auth.jpg",
    date: "29 Sep 2026",
    time: "9:00 AM",
    address: "Mansarovar, Jaipur",
    status: "Accepted" as const,
  },
  {
    id: 2,
    customerName: "Pooja Verma",
    image: "/image/auth.jpg",
    date: "30 Sep 2026",
    time: "11:00 AM",
    address: "Jagatpura, Jaipur",
    status: "Accepted" as const,
  },
  {
    id: 3,
    customerName: "Neha Singh",
    image: "/image/auth.jpg",
    date: "1 Oct 2026",
    time: "2:30 PM",
    address: "Vaishali Nagar, Jaipur",
    status: "Accepted" as const,
  },
];

const singleBooking : BookingRequest[] = [
  {
    id: 1,
    customerName: "Aman Kumar",
    phone: "9876543210",
    image: "/image/auth.jpg",
    date: "28 Sep 2026",
    time: "10:30 AM",
    address: "Vaishali Nagar, Jaipur",
    amount: "₹1,200",
    status: "Pending",
  },
];

const newRequests : BookingRequest[] = Array.from({ length: 20 }, (_, index) => ({
  ...singleBooking,
  id: index + 1,
}));

const completedJobs = [
{
id: 1,
customerName: "Sunil Meena",
image: "/image/auth.jpg",
date: "25 Sep 2026",
amount: "₹1,000",
},
{
id: 2,
customerName: "Priyanka Jain",
image: "/image/auth.jpg",
date: "24 Sep 2026",
amount: "₹1,500",
},
];

const statusClass = (status: string) => {
switch (status) {
case "Accepted":
return "bg-green-500 text-white";
case "Pending":
return "bg-yellow-500 text-white";
case "Rejected":
return "bg-red-500 text-white";
case "Completed":
return "bg-blue-500 text-white";
default:
return "bg-zinc-200 text-zinc-800";
}
};



return ( 
      <div className="min-h-screen bg-zinc-50 p-4 md:p-6"> <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */} <div className="rounded-3xl bg-black p-6 text-white md:p-8"> <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"> <div> <p className="text-sm text-zinc-400">Welcome back 👋</p> <h1 className="mt-1 text-3xl font-bold md:text-4xl">
      Maid Dashboard </h1> <p className="mt-2 max-w-2xl text-sm text-zinc-300 md:text-base">
      Manage booking requests, track upcoming jobs, and monitor your earnings from one place. </p> </div>


        <div className="flex items-center gap-3">
          <Button
            onClick={() => setAvailable(!available)}
            className="h-11 rounded-xl bg-white text-black hover:bg-zinc-200"
          >
            {available ? (
              <ToggleRight className="mr-2 h-4 w-4" />
            ) : (
              <ToggleLeft className="mr-2 h-4 w-4" />
            )}
            {available ? "Available" : "Busy"}
          </Button>
        </div>
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

              <div className="rounded-2xl bg-black p-3 text-white">
                <Icon className="h-5 w-5" />
              </div>
            </div>
          </Card>
        );
      })}
    </div>

    {/* Main Grid */}
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
      {/* New Booking Requests */}
      
      <BookingRequestsCard
      bookings={newRequests} 
      onAccept={(booking) => console.log("accept", booking)}
      onReject={(booking) => console.log("reject", booking)}
    />
      {/* Right Side */}
      <div className="space-y-6">
        {/* Upcoming Jobs */}
        <Card className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500">Upcoming</p>
              <h2 className="text-2xl font-bold text-zinc-900">
                Today / Future Jobs
              </h2>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            {upcomingJobs.map((job) => (
              <div
                key={job.id}
                className="rounded-2xl border border-zinc-100 p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl">
                    <Image
                      src={job.image}
                      alt={job.customerName}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-bold text-zinc-900">
                      {job.customerName}
                    </h3>
                    <p className="mt-1 text-sm text-zinc-500">
                      {job.date} • {job.time}
                    </p>
                    <p className="mt-1 truncate text-sm text-zinc-600">
                      {job.address}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusClass(
                      job.status
                    )}`}
                  >
                    {job.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Completed Jobs */}
        <Card className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500">Completed</p>
              <h2 className="text-2xl font-bold text-zinc-900">
                Recent Jobs
              </h2>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            {completedJobs.map((job) => (
              <div
                key={job.id}
                className="flex items-center gap-3 rounded-2xl border border-zinc-100 p-3"
              >
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={job.image}
                    alt={job.customerName}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-semibold text-zinc-900">
                    {job.customerName}
                  </h3>
                  <p className="text-sm text-zinc-500">{job.date}</p>
                </div>

                <p className="font-semibold text-green-600">{job.amount}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Profile / Rating */}
        <Card className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl">
              <Image
                src="/image/auth.jpg"
                alt="Maid"
                fill
                className="object-cover"
              />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="truncate text-lg font-bold text-zinc-900">
                Priya Sharma
              </h3>
              <p className="mt-1 flex items-center gap-1 text-sm text-zinc-500">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                4.8 Rating
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>
</div>


);
};

export default MaidDashboard;
