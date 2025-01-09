"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRight, Plus, Trash2 } from "lucide-react"

const steps = ["Personal Info", "Posting Details", "Additional Info", "Review"]

export default function CreatePostingPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({
    creatorName: "",
    location: "",
    forSelf: true,
    title: "",
    description: "",
    imageUrl: "",
    link: "",
    gofundmeUrl: "",
    originalPostingUrl: "",
    additionalLinks: [{ title: "", url: "" }],
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
                <Label htmlFor="creatorName">Your Name</Label>
                <Input
                  type="text"
                  id="creatorName"
                  name="creatorName"
                  value={formData.creatorName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label>This posting is for:</Label>
                <RadioGroup
                  defaultValue="self"
                  onValueChange={handleRadioChange}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="self" id="self" />
                    <Label htmlFor="self">Myself</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Someone else</Label>
                  </div>
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
                <Label htmlFor="title">Title</Label>
                <Input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  type="url"
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="link">External Link</Label>
                <Input
                  type="url"
                  id="link"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </>
        )
      case 2:
        return (
          <>
            <div className="space-y-4">
              <div>
                <Label htmlFor="gofundmeUrl">GoFundMe URL (optional)</Label>
                <Input
                  type="url"
                  id="gofundmeUrl"
                  name="gofundmeUrl"
                  value={formData.gofundmeUrl}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="originalPostingUrl">
                  Original Posting URL (if from another site)
                </Label>
                <Input
                  type="url"
                  id="originalPostingUrl"
                  name="originalPostingUrl"
                  value={formData.originalPostingUrl}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label>Additional Links</Label>
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
                      variant="outline"
                      size="icon"
                      onClick={() => removeLink(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addLink}
                  className="mt-2">
                  <Plus className="h-4 w-4 mr-2" /> Add Link
                </Button>
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
    <div className="container mx-auto py-8 px-4">
      <Link
        href="/"
        className="inline-flex items-center mb-4 text-blue-600 hover:underline">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to all postings
      </Link>
      <h1 className="text-3xl font-bold mb-8">Create New Mutual Aid Posting</h1>
      <div className="mb-8">
        <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
          {steps.map((stepName, index) => (
            <li
              key={stepName}
              className={`flex md:w-full items-center ${
                index < step ? "text-blue-600 dark:text-blue-500" : ""
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
                    className={`mr-2 ${index === step ? "text-blue-600" : ""}`}>
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
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(step - 1)}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
          )}
          <Button type="submit">
            {step < steps.length - 1 ? (
              <>
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </>
            ) : (
              "Create Posting"
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
