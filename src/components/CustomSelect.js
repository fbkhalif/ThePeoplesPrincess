import React from "react"
import { Select, SelectItem, CheckboxGroup, Checkbox } from "@nextui-org/react"

const CustomSelect = ({ items, label, placeholder, onChange, ...props }) => {
  return (
    <CheckboxGroup
      label={label}
      defaultValue={items[0].value}
      placeholder={placeholder}
      onChange={onChange}
      {...props}>
      {items.map((item, index) => (
        <Checkbox key={index} value={item.value}>
          {item.label}
        </Checkbox>
      ))}
    </CheckboxGroup>
  )
}

export default CustomSelect
