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
import { useDisclosure } from "@nextui-org/react"
import { SearchIcon } from "lucide-react" // Replace with your preferred icon library

export default function CustomNavbar() {
  const { isOpen, onOpen, onClose } = useDisclosure()

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
          <NavbarItem>
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
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
          <NavbarItem>
            <Button
              color="primary"
              size="sm"
              className="text-xs border-1 p-2"
              onPress={onOpen}
              variant="solid">
              Add Post +
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Pop-up Form
              </ModalHeader>
              <ModalBody>
                <Input label="Name" placeholder="Describe the resource" />
                <Input label="Link" placeholder="Url of resources" />
                <Input
                  label="Description"
                  placeholder="Summary of what the Mutual aid resource is for"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
