"use client";

import { useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Briefcase, IndianRupee, Target } from "lucide-react";
import BookingDrawer from "./drower";
import { useRouter } from "next/navigation";

interface MaidCardInterface {
  maid: any;
  index: number;
}
const MaidCard = ({ maid,index}:MaidCardInterface) => {
  const [openBookingDrawer, setOpenBookingDrawer] = useState(false);
  const router = useRouter()

  // const maid = {
  //   id: "22",
  //   name: "Priya Sharma",
  //   profileImage: "/image/maid.jpg",
  //   experience: 5,
  //   salary: 1200,
  //   rating: 4.8,
  //   availability: true,
  //   skills: ["Cleaning", "Cooking", "Laundry"],
  //   address: "Malviya Nagar, Jaipur",
  // };

  return (
    <div className="mx-auto max-w-sm p-4">
      <Card key={maid._id} className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-md transition-all duration-300 hover:shadow-xl">
        {/* Image on Top */}
       
          <div  className="  relative  w-full h-32  overflow-hidden">
          <Image
            src={maid.profileImage}
            alt={maid.name}
            fill
            className=" w-16 h-16  rounded-full "
          />

          <span
            className={`absolute left-3 top-3 rounded-full px-2 py-1 text-[10px] font-semibold text-white ${
              maid.availability ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {maid.availability ? "Available" : "Busy"}
          </span>
          </div>
       

        {/* Info Bottom */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h2 className="truncate text-lg font-bold text-zinc-900">
                {maid.name}
              </h2>

              <p className="mt-1 flex items-center gap-1 text-sm text-zinc-500">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{maid.address}</span>
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-1 rounded-full bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-700">
              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
              <span>{maid.rating}</span>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-3 text-sm">
            <div className="flex items-center gap-1 text-zinc-700">
              <Briefcase className="h-4 w-4 text-blue-600" />
              <span>{maid.experience} Years</span>
            </div>

            <div className="flex items-center gap-1 font-semibold text-green-600">
              <IndianRupee className="h-4 w-4" />
              <span>{maid.salary}/day</span>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {maid.skills.slice(0, 2).map((skill:any) => (
              <span
                key={skill}
                className="rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] font-medium text-zinc-700"
              >
                {skill}
              </span>
            ))}

            {maid.skills.length > 2 && (
              <span className="rounded-full bg-zinc-200 px-2.5 py-1 text-[11px] font-medium text-zinc-600">
                +{maid.skills.length - 2}
              </span>
            )}
          </div>

          <Button
            onClick={() => router.push(`/customer/maids/${maid._id}`)}
            className="mt-4 h-10 w-full rounded-xl bg-black text-white hover:bg-zinc-800"
          >
            Book Maid
          </Button>
        </div>
      </Card>

      <BookingDrawer
        open={openBookingDrawer}
        onOpenChange={setOpenBookingDrawer}
        maidId={maid.id}
        maidName={maid.name}
        maidSalary={maid.salary}
      />
    </div>
  );
};

export default MaidCard;