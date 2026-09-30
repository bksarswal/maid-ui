"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Search, SlidersHorizontal, X } from "lucide-react";

type FilterValues = {
  search: string;
  skill: string;
  location: string;
  rating: string;
  availability: string;
  experience: string;
};

type MaidFilterCardProps = {
  onFilterChange?: (filters: FilterValues) => void;
  onClear?: () => void;
};

const MaidFilterCard = ({ onFilterChange, onClear }: MaidFilterCardProps) => {
  const [filters, setFilters] = useState<FilterValues>({
    search: "",
    skill: "",
    location: "",
    rating: "",
    availability: "",
    experience: "",
  });

  const skills = ["Cleaning", "Cooking", "Babysitting", "Laundry"];
  const ratings = ["4+", "4.5+", "5"];
  const availabilityOptions = ["Available", "Busy"];
  const experienceOptions = ["1+ Years", "3+ Years", "5+ Years"];

  const handleChange = (key: keyof FilterValues, value: string) => {
    const next = { ...filters, [key]: value };
    setFilters(next);
    onFilterChange?.(next);
  };

  const handleClear = () => {
    const cleared: FilterValues = {
      search: "",
      skill: "",
      location: "",
      rating: "",
      availability: "",
      experience: "",
    };

    setFilters(cleared);
    onFilterChange?.(cleared);
    onClear?.();
  };

  return (
    <Card className="w-full rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
          <SlidersHorizontal className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-lg font-bold text-zinc-900">
            Find the Right Maid
          </h2>
          <p className="text-sm text-zinc-500">
            Filter maid listings before booking
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {/* Search */}
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <Input
            value={filters.search}
            onChange={(e) => handleChange("search", e.target.value)}
            placeholder="Search maid name..."
            className="h-11 pl-10"
          />
        </div>

        {/* Location */}
        <div className="relative">
          <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <Input
            value={filters.location}
            onChange={(e) => handleChange("location", e.target.value)}
            placeholder="Enter location..."
            className="h-11 pl-10"
          />
        </div>

        {/* Skill */}
        <select
          value={filters.skill}
          onChange={(e) => handleChange("skill", e.target.value)}
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none transition focus:border-zinc-400"
        >
          <option value="">All Skills</option>
          {skills.map((skill) => (
            <option key={skill} value={skill}>
              {skill}
            </option>
          ))}
        </select>

        {/* Rating */}
        <select
          value={filters.rating}
          onChange={(e) => handleChange("rating", e.target.value)}
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none transition focus:border-zinc-400"
        >
          <option value="">Any Rating</option>
          {ratings.map((rating) => (
            <option key={rating} value={rating}>
              {rating}
            </option>
          ))}
        </select>

        {/* Availability */}
        <select
          value={filters.availability}
          onChange={(e) => handleChange("availability", e.target.value)}
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none transition focus:border-zinc-400"
        >
          <option value="">Any Availability</option>
          {availabilityOptions.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        {/* Experience */}
        <select
          value={filters.experience}
          onChange={(e) => handleChange("experience", e.target.value)}
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none transition focus:border-zinc-400"
        >
          <option value="">Any Experience</option>
          {experienceOptions.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
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

export default MaidFilterCard;