"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, DatePicker } from "antd";
import { Search, SlidersHorizontal, X } from "lucide-react";

const { RangePicker } = DatePicker;

type BookingFilterValues = {
  search: string;
  status: string;
  paymentStatus: string;
  dateRange: any[];
};

type BookingFilterCardProps = {
  onFilterChange?: (filters: BookingFilterValues) => void;
  onClear?: () => void;
};

const BookingFilterCard = ({
  onFilterChange,
  onClear,
}: BookingFilterCardProps) => {
  const [filters, setFilters] = useState<BookingFilterValues>({
    search: "",
    status: "",
    paymentStatus: "",
    dateRange: [],
  });

  const bookingStatusOptions = [
    "Pending",
    "Accepted",
    "Rejected",
    "Cancelled",
    "Completed",
  ];

  const paymentStatusOptions = [
    "Pending",
    "Paid",
    "Failed",
    "Refunded",
  ];

  const handleChange = (key: keyof BookingFilterValues, value: any) => {
    const next = { ...filters, [key]: value };
    setFilters(next);
    onFilterChange?.(next);
  };

  const handleClear = () => {
    const cleared = {
      search: "",
      status: "",
      paymentStatus: "",
      dateRange: [],
    };

    setFilters(cleared);
    onFilterChange?.(cleared);
    onClear?.();
  };

  return (
    <Card className="w-full rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
          <SlidersHorizontal className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-lg font-bold text-zinc-900">
            Filter Bookings
          </h2>
          <p className="text-sm text-zinc-500">
            Search and refine your booking history
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        {/* Search */}
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <Input
            value={filters.search}
            onChange={(e) => handleChange("search", e.target.value)}
            placeholder="Search maid / address..."
            className="h-11 pl-10"
          />
        </div>

        {/* Booking Status */}
        <select
          value={filters.status}
          onChange={(e) => handleChange("status", e.target.value)}
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none transition focus:border-zinc-400"
        >
          <option value="">All Booking Status</option>
          {bookingStatusOptions.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        {/* Payment Status */}
        <select
          value={filters.paymentStatus}
          onChange={(e) => handleChange("paymentStatus", e.target.value)}
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none transition focus:border-zinc-400"
        >
          <option value="">All Payment Status</option>
          {paymentStatusOptions.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        {/* Date Range */}
        <RangePicker
          value={filters.dateRange as any}
          onChange={(dates) => handleChange("dateRange", dates || [])}
          className="h-11 w-full rounded-xl"
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <Button
          onClick={() => onFilterChange?.(filters)}
          className="h-11 rounded-xl bg-black px-5 text-white hover:bg-zinc-800"
        >
          Apply Filters
        </Button>

        <Button
          onClick={handleClear}
          variant="outline"
          className="h-11 rounded-xl border-zinc-300 px-5"
        >
          <X className="mr-2 h-4 w-4" />
          Clear
        </Button>
      </div>
    </Card>
  );
};

export default BookingFilterCard;