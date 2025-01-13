"use client"

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
  Modal,
  ModalContent,
  Button,
  ModalBody,
  Dropdown,
  ModalFooter,
  DropdownTrigger,
  DropdownMenu,
  ModalHeader,
  DropdownItem,
} from "@nextui-org/react"
import { useState } from "react"
import { useDisclosure } from "@nextui-org/react"
import { SearchIcon } from "lucide-react" // Replace with your preferred icon library
import MutualAidResourceForm from "./MutualAidResourceForm"
import CustomSelect from "./CustomSelect"
export default function CustomNavbar({
  selectedCategories,
  filterItemsCategories,
  categoriesOptions,
  handleFilterChange,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedCategory, setSelectedCategory] = useState("All")

  const handleCategoryChange = (keys) => {
    setSelectedCategory(new Set(keys)) // Update selected categories state
    handleFilterChange(new Set(keys)) // Update the parent state through the handler
  }
  console.log(selectedCategory)
  return (
    <>
      <Navbar>
        <NavbarContent justify="start">
          <NavbarItem>
            <Input
              classNames={{
                base: "max-w-full sm:max-w-[10rem] h-8",
                mainWrapper: "h-full",
                input: "text-xs",
                inputWrapper: "h-full font-normal text-default-500 bg-white",
              }}
              placeholder="Search..."
              size="sm"
              startContent={<SearchIcon size={18} />}
              type="search"
            />
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end">
          {/* <NavbarItem>
            <Dropdown>
              <DropdownTrigger>
                <Button size="sm" className="border-1" variant="bordered">
                  Filter
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Filter options">
                <DropdownItem key="newest">Newest</DropdownItem>
                <DropdownItem key="oldest">Oldest</DropdownItem>
                <DropdownItem key="popular">Popular</DropdownItem>
                <DropdownItem key="alphabetical"></DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
          <NavbarItem>
            {" "}
            <Dropdown>
              <DropdownTrigger>
                <Button size="sm" className="border-1" variant="bordered">
                  {selectedCategories.size > 0
                    ? `${selectedCategories.size} Selected`
                    : "Categories"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Filter options"
                selectionMode="multiple"
                selectedKeys={filterItemsCategories}
                onSelectionChange={(e) => {
                  setSelectedCategory(e.target.value)
                }}>
                {filterItemsCategories.map((category) => (
                  <DropdownItem key={category.value}>
                    {category.label}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </NavbarItem> */}
          <NavbarItem>
            <Button
              color="primary"
              size="sm"
              className="text-xs border-1 p-2"
              onPress={onOpen}
              variant="solid">
              Add Resource +
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <MutualAidResourceForm
        isOpen={isOpen}
        onClose={onClose}
        categoriesOptions={categoriesOptions}
      />
    </>
  )
}
