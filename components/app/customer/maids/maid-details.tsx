"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import HttpInterceptor from "@/lib/http-interseptor";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, IndianRupee, Briefcase } from "lucide-react";
import BookingDrawer from "../../maid/drower";

interface Maid {
  _id: string;
  auth: {
    name: string;
    email: string;
  };
  profileImage?: string;
  phone?: string;
  address?: string;
  experience?: number;
  salary?: number;
  rating?: number;
  skills?: string[];
  availability?: boolean;
}

const  MaidDetails = ()=> {
  const { id } = useParams<{ id: string }>();
  const [maid, setMaid] = useState<Maid | null>(null);
  const [openDrower,setOpenDrower] = useState(false)

  useEffect(() => {
    const getMaid = async () => {
      try {
        const { data } = await HttpInterceptor.get(`/maid/maids/${id}`);
        console.log("ddd",data.data)
        setMaid(data.data);
      } catch (err) {
        console.log(err);
      }
    };

    if (id) getMaid();
  }, [id]);

  if (!maid) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Card>
        <CardContent className="grid md:grid-cols-2 gap-8 p-6">

          <Image
            src={maid.profileImage || "/image/maid.jpg"}
            alt={maid.auth.name}
            width={500}
            height={500}
            className="w-full h-96 rounded-xl object-cover"
          />

          <div className="space-y-4">
            <div>
              <h1 className="text-3xl font-bold">{maid.auth.name}</h1>
              <p className="text-muted-foreground">{maid.auth.email}</p>
            </div>

            <Badge>
              {maid.availability ? "Available" : "Busy"}
            </Badge>

            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <Star size={18} />
                {maid.rating ?? 0}
              </p>

              <p className="flex items-center gap-2">
                <Briefcase size={18} />
                {maid.experience ?? 0} Years
              </p>

              <p className="flex items-center gap-2">
                <IndianRupee size={18} />
                ₹{maid.salary ?? 0}/day
              </p>

              <p className="flex items-center gap-2">
                <MapPin size={18} />
                {maid.address || "Address not available"}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {maid.skills?.length ? (
                maid.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No skills added
                </p>
              )}
            </div>

            <Button 
            onClick={()=>setOpenDrower(true)}
            className="w-full">
              Book Now
            </Button>
          </div>
    <BookingDrawer
        open={openDrower}
        onOpenChange={setOpenDrower}
        maidId={maid._id}
        maidName={maid.auth.name}
        maidSalary={maid.salary || 0}
        />
        </CardContent>
      </Card>

      
    </div>


  );
}

export default MaidDetails