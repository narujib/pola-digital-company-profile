"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface AdminSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounce?: number;
}

export function AdminSearchInput({
  value,
  onChange,
  placeholder = "Cari data...",
  debounce = 400,
}: AdminSearchInputProps) {
  const [localValue, setLocalValue] = useState(value);

  // Sync internal state if prop value changes externally
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue);
    }, debounce);
    return () => clearTimeout(timer);
  }, [localValue, onChange, debounce]);

  return (
    <div className="relative w-full sm:w-[300px]">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder={placeholder}
        className="pl-9"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
      />
    </div>
  );
}
