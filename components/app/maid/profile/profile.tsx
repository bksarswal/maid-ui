// Profile.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Pencil, Star } from "lucide-react";
import HttpInterceptor from "@/lib/http-interseptor";
import EditPersonal from "./drower/edit-personal";
import EditProfessional from "./drower/edit-professional";
import EditProfile from "./drower/edit-profile";



export default function Profile() {
  const [maid, setMaid] = useState<any>(null);
  const [openPersonal, setOpenPersonal] = useState(false);
  const [openProfessional, setOpenProfessional] = useState(false);
  const [openPhoto, setOpenPhoto] = useState(false);

  const getProfile = async () => {
    try {
      const res = await HttpInterceptor.get("/maid/profile");
      setMaid(res.data.profile);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => { getProfile(); }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-3xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 p-8 text-white">
          <h1 className="text-4xl font-bold">My Profile</h1>
          <p className="mt-2 text-white/80">Update your personal and professional details.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="rounded-3xl">
            <CardContent className="flex flex-col items-center p-8">
              <div className="relative">
                <Image
                  src={maid?.profileImage || "/image/maid.jpg"}
                  alt="profile"
                  width={180}
                  height={180}
                  className="rounded-full border-4 border-white object-cover shadow-lg"
                />
                <button
                  onClick={() => setOpenPhoto(true)}
                  className="absolute bottom-2 right-2 rounded-full bg-blue-600 p-3 text-white"
                >
                  <Camera size={18}/>
                </button>
              </div>

              <h2 className="mt-5 text-2xl font-bold">{maid?.auth?.name}</h2>
              <p className="text-gray-500">{maid?.auth?.email}</p>

              <span className="mt-4 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                {maid?.availability ? "Available for Work" : "Busy"}
              </span>

              <Button className="mt-6 w-full" onClick={()=>setOpenPhoto(true)}>
                Change Profile Photo
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-6 lg:col-span-2">
            <Card className="rounded-3xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Personal Information</CardTitle>
                <Button size="sm" onClick={()=>setOpenPersonal(true)}>
                  <Pencil className="mr-2 h-4 w-4"/>Edit
                </Button>
              </CardHeader>
              <CardContent className="grid gap-5 md:grid-cols-2">
                <div><p className="text-sm text-muted-foreground">Name</p><p>{maid?.auth?.name}</p></div>
                <div><p className="text-sm text-muted-foreground">Email</p><p>{maid?.auth?.email}</p></div>
                <div><p className="text-sm text-muted-foreground">Phone</p><p>{maid?.phone}</p></div>
                <div><p className="text-sm text-muted-foreground">Address</p><p>{maid?.address}</p></div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Professional Details</CardTitle>
                <Button size="sm" onClick={()=>setOpenProfessional(true)}>
                  <Pencil className="mr-2 h-4 w-4"/>Edit
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid gap-5 md:grid-cols-2">
                  <div><p className="text-sm text-muted-foreground">Experience</p><p>{maid?.experience} Years</p></div>
                  <div><p className="text-sm text-muted-foreground">Salary</p><p>₹ {maid?.salary}</p></div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-muted-foreground">Skills</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {maid?.skills?.map((s:string)=>(
                        <span key={s} className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl">
              <CardHeader><CardTitle>Your Performance</CardTitle></CardHeader>
              <CardContent>
                <div className="rounded-2xl bg-yellow-50 p-6 text-center">
                  <Star className="mx-auto mb-2 text-yellow-500"/>
                  <h2 className="text-3xl font-bold">{maid?.rating ?? 0}</h2>
                  <p className="text-gray-500">Rating</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <EditPersonal
          open={openPersonal}
          onClose={()=>setOpenPersonal(false)}
          onSuccess={getProfile}
          initialValues={{
            name: maid?.auth?.name,
            email: maid?.auth?.email,
            phone: maid?.phone,
            address: maid?.address
          }}
        />

        <EditProfessional
          open={openProfessional}
          onClose={()=>setOpenProfessional(false)}
          onSuccess={getProfile}
          initialValues={{
            experience: maid?.experience,
            salary: maid?.salary,
            skills: maid?.skills,
            availability: maid?.availability
          }}
        />

        <EditProfile
          open={openPhoto}
          onClose={()=>setOpenPhoto(false)}
          onSuccess={getProfile}
          initialImage={maid?.profileImage}
        />
      </div>
    </div>
  );
}
