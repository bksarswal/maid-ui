"use client"
import React from 'react'
import CustomerBookingCard from '../booking/customer-booking-card'

const Booking = () => {
  return (
    <div>

        {
           <CustomerBookingCard
            booking={{
                _id: "1",
                customer: {
                name: "Aman Kumar",
                phone: "9876543210",
                profileImage: "/image/auth.jpg",
                },
                serviceDate: "2026-09-28",
                serviceTime: "10:30 AM",
                address: "Vaishali Nagar, Jaipur",
                notes: "Please bring cleaning supplies.",
                amount: 1200,
                status: "Pending",
                paymentStatus: "Pending",
            }}
            onAccept={(id) => console.log("accept", id)}
            onReject={(id) => console.log("reject", id)}
            onView={(id) => console.log("view", id)}
            />
        }
    </div>
  )
}

export default Booking