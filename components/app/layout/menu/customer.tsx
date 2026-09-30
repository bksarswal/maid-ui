import {
  LayoutDashboard,
  Search,
  CalendarDays,
  CreditCard,
  Star,
  User,

} from "lucide-react";

export const customerMenu = [
  {
    title: "Dashboard",
    href: "/customer/dashboard",
    icon: LayoutDashboard,
  },

  {
    title: "Bookings",
    href: "/customer/booking",
    icon: CalendarDays,
  },
  {
    title: "Payments",
    href: "/customer/payment",
    icon: CreditCard,
  },
  {
    title: "Reviews",
    href: "/customer/review",
    icon: Star,
  },
  {
    title: "Profile",
    href: "/customer/profile",
    icon: User,
  },
 
];