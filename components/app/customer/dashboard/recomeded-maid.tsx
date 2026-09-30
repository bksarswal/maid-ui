"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Briefcase, IndianRupee, ArrowRight } from "lucide-react";
import HttpInterceptor from "@/lib/http-interseptor";

interface MaidInterface  {
_id?: string;
auth:{name: string};
profileImage?: string;
rating?: number;
experience?: number;
salary?: number;
address?: string;
skills?: string[];
availability?: boolean;
};

interface RecommendedMaidsInterface {
maids?: MaidInterface[];
onBookAgain?: (maid: MaidInterface) => void;
onSeeMore?: () => void;
};



const RecommendedMaids = ({onBookAgain,onSeeMore}: RecommendedMaidsInterface) => {

const [maids,setMaid] = useState<MaidInterface[]>([])

const getMaids = async()=>{
  try{
    const {data} =   await HttpInterceptor.get('/maid/maids')
    const maids =  data.data
    setMaid(maids)
  }
  catch(err)
  {
    console.log(err)
  }
}

useEffect(()=>{
  getMaids()
},[]) 

return ( <Card className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"> <div className="flex items-center justify-between"> <div> <p className="text-sm text-zinc-500">Recommended</p> <h2 className="text-2xl font-bold text-zinc-900">
Maids for You </h2> </div>


    <Button
      variant="ghost"
      className="text-sm"
      onClick={onSeeMore}
    >
      See More
      <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  </div>

  <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
    {maids.map((maid) => (
      <div
        key={maid._id || maid?.auth?.name}
        className="rounded-2xl border border-zinc-100 p-4 transition hover:shadow-md"
      >
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-2xl">
            <Image
              src={maid.profileImage || "/image/auth.jpg"}
              alt={maid?.auth?.name || "dfd"}
              fill
              className="object-cover"
            />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="truncate font-bold text-zinc-900">
              {maid?.auth?.name}
            </h3>

            <p className="mt-1 flex items-center gap-1 text-sm text-zinc-500">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              {maid.rating || 0}
            </p>

            <p className="mt-1 flex items-center gap-1 text-xs text-zinc-500">
              <MapPin className="h-3.5 w-3.5" />
              <span className="truncate">{maid.address}</span>
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <span className="flex items-center gap-1 rounded-full bg-zinc-100 px-3 py-1 text-zinc-700">
            <Briefcase className="h-3.5 w-3.5" />
            {maid.experience || 0} Years
          </span>

          <span className="flex items-center gap-1 rounded-full bg-zinc-100 px-3 py-1 text-green-600">
            <IndianRupee className="h-3.5 w-3.5" />
            {maid.salary || 0}/day
          </span>

          <span
            className={`rounded-full px-3 py-1 font-medium ${
              maid.availability
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {maid.availability ? "Available" : "Busy"}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {maid.skills?.slice(0, 2).map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] font-medium text-zinc-700"
            >
              {skill}
            </span>
          ))}

          {maid.skills && maid.skills.length > 2 && (
            <span className="rounded-full bg-zinc-200 px-2.5 py-1 text-[11px] font-medium text-zinc-600">
              +{maid.skills.length - 2}
            </span>
          )}
        </div>

        <Button
          onClick={() => onBookAgain?.(maid)}
          className="mt-4 h-10 w-full rounded-xl bg-black text-white hover:bg-zinc-800"
        >
          Book Again
        </Button>
      </div>
    ))}
  </div>
</Card>


);
};

export default RecommendedMaids;
