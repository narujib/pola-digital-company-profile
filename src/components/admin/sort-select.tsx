"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AdminSortSelectProps {
  value: string;
  onChange: (value: string) => void;
  options?: { label: string; value: string }[];
  placeholder?: string;
  className?: string;
}

const defaultOptions = [
  { label: "Terbaru", value: "-createdAt" },
  { label: "Terlama", value: "createdAt" },
  { label: "Judul (A-Z)", value: "title" },
  { label: "Judul (Z-A)", value: "-title" },
];

export function AdminSortSelect({
  value,
  onChange,
  options = defaultOptions,
  placeholder = "Urutkan",
  className,
}: AdminSortSelectProps) {
  return (
    <div className={className}>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
