import React from "react"
import { Input } from "@nextui-org/react"
import { SearchIcon } from "lucide-react"
export default function SearchField({ value, onChange }) {
  return (
    <Input
      type="text"
      size="sm"
      className="w-1/4 text-[10px] max-content text-xs"
      value={value}
      onChange={onChange}
      variant="bordered"
      placeholder="Search"
      startContent={<SearchIcon color="gray" size={18} />}
    />
  )
}
