"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AdminStatusFilterProps {
  value: string;
  onChange: (value: string) => void;
  options?: { label: string; value: string }[];
  placeholder?: string;
  className?: string;
}

const defaultOptions = [
  { label: "Semua Status", value: "all" },
  { label: "Published", value: "published" },
  { label: "Draft", value: "draft" },
];

export function AdminStatusFilter({
  value,
  onChange,
  options = defaultOptions,
  placeholder = "Filter status",
  className,
}: AdminStatusFilterProps) {
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
