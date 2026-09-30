"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {

  Pencil,
} from "lucide-react";
import { useEffect, useState } from "react";
import EditProfile from "./drower/edit-profile";
import HttpInterceptor from "@/lib/http-interseptor";
import EditInfo from "./drower/edit-info";


const CustomerProfile = () => {
   const [openProfile,setOpenprofile] = useState(false)
   const [openInfo,setOpenInfo] = useState(false)
   
   const [customer,setCustomer] = useState<any>(null)

  const getProfile = async()=>{
    try{

      const res = await HttpInterceptor.get("/customer/profile");

      const profile = res.data.profile
      setCustomer(profile)   
    }
    catch(err:unknown)
    {
      console.log(err)
    }
  }

  useEffect(()=>{
    getProfile()
  },[])


  return (
    <div className="max-w-5xl mx-auto">
      <Card className="rounded-2xl shadow-sm">
        <CardContent>

        <CardHeader className="flex flex-row items-center justify-between shadow rounded p-6 ">
         <CardContent className="flex justifu-center items-center gap-2 ">
              <Avatar className="h-16 w-16">
                <AvatarImage src={"/image/maid.jpg"} />
                <AvatarFallback className="text-3xl">
                  {customer?.auth?.name}
                </AvatarFallback>
              </Avatar>

              <div className="space-x-2">
                <h2 className="text-xl font-semibold">
                {customer?.auth?.name}
                </h2>

                  <Badge className="">
                    {customer?.auth?.role}
                  </Badge>
              </div>
         </CardContent>

          <Button onClick={()=>setOpenprofile(true)} >
            <Pencil className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </CardHeader>
        </CardContent>

        <CardContent>
            <div className="grid flex-1 gap-5 sm:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Manage your personal details.
                  </CardDescription>

                  <Button
                  onClick={()=>setOpenInfo(true)}
                  >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit Info
                </Button>
                </CardHeader>
                
                <CardContent className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="text-sm text-muted-foreground">
                     Name
                    </label>
                    <p className="mt-1 font-medium">{customer?.auth?.name}</p>
                  </div>

                  <div>
                    <label className="text-sm text-muted-foreground">
                      Email
                    </label>
                    <p className="mt-1 font-medium">{customer?.auth?.email}</p>
                  </div>

                  <div>
                    <label className="text-sm text-muted-foreground">
                      Phone
                    </label>
                    <p className="mt-1 font-medium">{customer?.phone}</p>
                  </div>

                  <div>
                    <label className="text-sm text-muted-foreground">
                      Member Since
                    </label>
                    <p className="mt-1 font-medium">{customer?.createdAt}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Address</CardTitle>
                  <CardDescription>
                    {customer?.address}
                  </CardDescription>
                  <Button>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit Addess
                </Button>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground">
                      Address
                    </label>

                    <p className="mt-1 font-medium">
                      123, Malviya Nagar, Jaipur, Rajasthan
                    </p>
                  </div>

                  <div className="grid gap-6 md:grid-cols-3">
                    <div>
                      <label className="text-sm text-muted-foreground">
                        City
                      </label>

                      <p className="mt-1 font-medium">
                        {customer?.address?.distruct}
                      </p>
                    </div>

                    <div>
                      <label className="text-sm text-muted-foreground">
                        State
                      </label>

                      <p className="mt-1 font-medium">
                      {customer?.address?.state}
                      </p>
                    </div>

                    <div>
                      <label className="text-sm text-muted-foreground">
                        PIN Code
                      </label>

                      <p className="mt-1 font-medium">
                         {customer?.address?.pincond}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
              <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>
                  Keep your account secure.
                </CardDescription>

                <Button>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit Password
                </Button>
              </CardHeader>

              <CardContent className="space-y-5">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <h4 className="font-medium">
                      Password
                    </h4>

                    <p className="text-sm text-muted-foreground">
                      Last changed 20 days ago.
                    </p>
                  </div>

                  <Button variant="outline">
                    Change Password
                  </Button>
                </div>

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <h4 className="font-medium">
                      Email Verification
                    </h4>

                    <p className="text-sm text-green-600">
                      Verified
                    </p>
                  </div>

                  <Button variant="outline">
                    Manage
                  </Button>
                </div>

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <h4 className="font-medium">
                      Active Sessions
                    </h4>

                    <p className="text-sm text-muted-foreground">
                      1 active device
                    </p>
                  </div>

                  <Button variant="destructive">
                    Logout All
                  </Button>
                </div>
              </CardContent>
            </Card>
             
          </div>
        </CardContent>
      </Card>

      <EditProfile 
      open={openProfile}
      
      onClose={()=>setOpenprofile(false)}
      onSuccess={()=>{
        getProfile(),
        setOpenprofile(false)
      }}
      initialValues={{name:customer?.auth?.name,email:customer?.auth?.email}}
      />
      <EditInfo
      open={openInfo}
      initialValues={{
        name:customer?.auth?.name,
        email:customer?.auth?.email,
        phone:customer?.phone
      }}
      onClose={()=>setOpenInfo(false)}
      onSuccess={()=>{
        getProfile(),
        setOpenInfo(false)
      }}
      />
      
      
    </div>
  );
};

export default CustomerProfile;