"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  Input,
  Card,
  Textarea,
  RadioGroup,
  Button,
  Radio,
} from "@nextui-org/react"
import { ArrowLeft, ArrowRight, Plus, Trash2 } from "lucide-react"
const steps = ["Personal Info", "Posting Details", "Additional Info", "Review"]

export default async function CreatePostingPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({
    title: "Posting",
    description: "",
    creatorName: "Anonymous",
    location: "",
    forSelf: false,
    imageUrl: "",
    gofundmeUrl: "",
    amountRaised: 0,
    additionalLinks: [],
    venmo: "",
    zelle: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value) => {
    setFormData((prev) => ({ ...prev, forSelf: value === "self" }))
  }

  const handleLinkChange = (index, field, value) => {
    const newLinks = [...formData.additionalLinks]
    newLinks[index][field] = value
    setFormData((prev) => ({ ...prev, additionalLinks: newLinks }))
  }

  const addLink = () => {
    setFormData((prev) => ({
      ...prev,
      additionalLinks: [...prev.additionalLinks, { title: "", url: "" }],
    }))
  }

  const removeLink = (index) => {
    setFormData((prev) => ({
      ...prev,
      additionalLinks: prev.additionalLinks.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (step < steps.length - 1) {
      setStep(step + 1)
    } else {
      // In a real application, you would send this data to your backend
      console.log("Submitting:", formData)
      // For now, we'll just redirect to the home page
      router.push("/")
    }
  }

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <>
            <div className="space-y-4">
              <div>
                <Input
                  type="text"
                  size="sm"
                  className="max-w-32"
                  id="creatorName"
                  name="creatorName"
                  label="Your Name"
                  value={formData.creatorName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Input
                  type="text"
                  id="location"
                  size="sm"
                  className="max-w-32"
                  name="location"
                  label="Location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <RadioGroup
                  size="sm"
                  className="text-sm"
                  label="This posting is for">
                  <Radio value="buenos-aires">Myself</Radio>
                  <Radio value="sydney">Someone else</Radio>
                </RadioGroup>
              </div>
            </div>
          </>
        )
      case 1:
        return (
          <>
            <div className="space-y-4">
              <div>
                <Input
                  type="text"
                  id="title"
                  name="title"
                  label="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Textarea
                  id="description"
                  name="description"
                  label="Description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                />
              </div>
              <div></div>
            </div>
          </>
        )
      case 2:
        return (
          <>
            <div className="space-y-4">
              <div>
                <Input
                  type="url"
                  id="gofundmeUrl"
                  name="gofundmeUrl"
                  size="sm"
                  label="GoFundMe URL"
                  value={formData.gofundmeUrl}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Input
                  type="url"
                  id="zellurl"
                  name="zellurl"
                  size="sm"
                  label="Zelle URL"
                  value={formData.zelle}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Input
                  type="url"
                  id="venmoUrl"
                  size="sm"
                  name="venmoUrl"
                  label="Venmo URL"
                  value={formData.venmo}
                  onChange={handleChange}
                />
              </div>
              <div>
                <div className="flex align-center mb-4  items-center justify-between">
                  <p>Additional Links</p>
                  <Button
                    variant="solid"
                    color="primary"
                    onPress={addLink}
                    size="sm"
                    startContent={<Plus className="h-4 w-4 mr-2" />}>
                    Add Link
                  </Button>
                </div>
                {formData.additionalLinks.map((link, index) => (
                  <div key={index} className="flex items-center space-x-2 mt-2">
                    <Input
                      type="text"
                      placeholder="Link Title"
                      value={link.title}
                      onChange={(e) =>
                        handleLinkChange(index, "title", e.target.value)
                      }
                      required
                    />
                    <Input
                      type="url"
                      placeholder="URL"
                      value={link.url}
                      onChange={(e) =>
                        handleLinkChange(index, "url", e.target.value)
                      }
                      required
                    />
                    <Button
                      type="button"
                      color="danger"
                      variant="flat"
                      size="sm"
                      onPress={() => removeLink(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Review Your Posting</h2>
            <p>
              <strong>Name:</strong> {formData.creatorName}
            </p>
            <p>
              <strong>Location:</strong> {formData.location}
            </p>
            <p>
              <strong>Posting for:</strong>{" "}
              {formData.forSelf ? "Myself" : "Someone else"}
            </p>
            <p>
              <strong>Title:</strong> {formData.title}
            </p>
            <p>
              <strong>Description:</strong> {formData.description}
            </p>
            <p>
              <strong>Image URL:</strong> {formData.imageUrl}
            </p>
            <p>
              <strong>External Link:</strong> {formData.link}
            </p>
            <p>
              <strong>GoFundMe URL:</strong> {formData.gofundmeUrl || "N/A"}
            </p>
            <p>
              <strong>Original Posting URL:</strong>{" "}
              {formData.originalPostingUrl || "N/A"}
            </p>
            <div>
              <strong>Additional Links:</strong>
              <ul className="list-disc list-inside">
                {formData.additionalLinks.map((link, index) => (
                  <li key={index}>
                    {link.title}: {link.url}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="container max-w-3xl mx-auto py-8 px-4">
      <Link
        href="/"
        className="inline-flex items-center mb-4 text-sm text-accent-light hover:text-accent-dark">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to all postings
      </Link>
      <h1 className="text-xl text-center text-secondary font-bold mb-8">
        Create New Mutual Aid Posting
      </h1>
      <Card className="p-4">
        <div className="mb-8">
          <ol className="flex items-center w-full text-sm font-medium text-left whitespace-nowrap text-gray-500 dark:text-gray-400 sm:text-base">
            {steps.map((stepName, index) => (
              <li
                key={stepName}
                className={`flex md:w-full items-center ${
                  index < step ? "text-accent dark:text-accent-dark" : ""
                } ${
                  index <= step
                    ? 'after:content-[""] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700'
                    : ""
                }`}>
                <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                  {index < step ? (
                    <svg
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                  ) : (
                    <span
                      className={`mr-2 ${
                        index === step ? "text-accent-light" : ""
                      }`}>
                      {index + 1}
                    </span>
                  )}
                  {stepName}
                </span>
              </li>
            ))}
          </ol>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
          {renderStep()}
          <div className="flex justify-between">
            {step > 0 && (
              <button
                type="button"
                variant="outline"
                onClick={() => setStep(step - 1)}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </button>
            )}
            <button type="submit">
              {step < steps.length - 1 ? (
                <>
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </>
              ) : (
                "Create Posting"
              )}
            </button>
          </div>
        </form>
      </Card>
    </div>
  )
}
