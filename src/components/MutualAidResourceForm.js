"use client"
import { useState } from "react"
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Form,
  Button,
} from "@nextui-org/react"

export default function ResourceForm({ isOpen, onClose }) {
  const [name, setName] = useState("")
  const [link, setLink] = useState("")
  const [desc, setDesc] = useState("")
  const [tags, setTags] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [errors, setErrors] = useState({})
  // Handle form submission
  async function onSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const resourceData = {
      name,
      link,
      tags: tags.split(",").map((tag) => tag.trim()), // Convert comma-separated tags into an array
      desc,
    }
    try {
      const response = await fetch("/api/resources", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resourceData),
      })

      if (response.ok) {
        const newResource = await response.json()
        console.log("New resource created:", newResource)
        // Reset form fields
        setName("")
        setLink("")
        setTags("")
        setDesc("")
        onClose() // Close the modal after successful submission
      } else {
        const errorData = await response.json()
        setError(errorData.error || "Failed to create resource.")
      }
    } catch (error) {
      setError("An error occurred while creating the resource.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex  text-center flex-col gap-1">
          Add Link to Mutual Aid Resource
          <p className="text-slate-500 text-xs py-2 font-light md:px-20 lg:px-32 sm:px-4">
            (list of gofundmes, wear to donate, volunteer, etc.)
          </p>
        </ModalHeader>

        <ModalBody>
          {error && <p className="text-red-500">{error}</p>}
          <Form
            validationErrors={errors}
            onSubmit={onSubmit}
            className="grid gap-2">
            <Input
              label="Name"
              placeholder="Name of resource or Google Sheets name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              label="Link"
              placeholder="URL of resources"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              required
            />
            <Input
              label="Description"
              placeholder="Summary of what the Mutual Aid link links to"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <Input
              label="Tags"
              placeholder="Comma-separated tags e.g. google sheets, LA fires"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
            <ModalFooter className="px-0">
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </ModalFooter>
          </Form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
