import React from "react"
import { Input } from "@nextui-org/react"
export default function SearchField({ value, onChange }) {
  return (
    <Input
      type="text"
      size="sm"
      className="w-1/4"
      value={value}
      onChange={onChange}
      placeholder="Search postings..."
    />
  )
}
