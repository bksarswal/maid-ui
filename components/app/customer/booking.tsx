"use client"
import { Button } from '@/components/ui/button'
import { CardContent } from '@/components/ui/card'
import React, { useState } from 'react'
import BookingDrawer from '../maid/drower'
import BookingHistoryCard from '../booking/booking-history-card'
import MaidFilterCard from '../maid/maid-filter-card'
import BookingFilterCard from '../booking/booking-filter-card'


const booking = () => {
  const [open,setOpen] = useState(false)

  return (
    <CardContent className='w-full h-full flex flex-col gap-4 '>
      
      <BookingFilterCard/>
      
      {
        Array(20).fill("bk").map(()=>(
              <BookingHistoryCard
          booking={{
            _id: "1",
            serviceDate: "2026-09-28",
            serviceTime: "10:30 AM",
            status: "Completed",
            paymentStatus: "Paid",
            amount: 1200,
            address: "Malviya Nagar, Jaipur",
            notes: "Please come before 11 AM",
            maid: {
              name: "Priya Sharma",
              profileImage: "/image/auth.jpg",
              rating: 4.8,
              experience: 5,
              skills: ["Cleaning", "Cooking", "Laundry"],
            },
          }}
        />
        ))
      
      }
    </CardContent>
  )
}

export default booking