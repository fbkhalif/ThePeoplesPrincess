"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Input,
  Textarea,
  Button,
  Card,
  RadioGroup,
  Radio,
  CardFooter,
} from "@nextui-org/react"
import { ArrowLeft, Sparkle } from "lucide-react"
import Link from "next/link"
import Form from "next/form"
import SubHeading from "../../components/SubHeading"
export default function CreatePostingPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    creatorName: "",
    location: "",
    forSelf: false,
    imageUrl: "",
    amountRaised: 0,
    additionalLinks: [],
    gofundmeUrl: "",
    venmo: "",
    zelle: "",
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value) => {
    setFormData((prev) => ({ ...prev, forSelf: value === "self" }))
  }

  const handleSubmit = async (e) => {
    setLoading(true)

    try {
      await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      alert("Successfully created post")
      router.push("/")
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setLoading(false)
    }
  }
  const handleAutoGenerate = async () => {
    const url = formData.gofundmeUrl
    if (!url) {
      alert("Please enter a GoFundMe URL")
      return
    }

    try {
      const response = await fetch(
        `/api/gofundme?url=${encodeURIComponent(url)}`
      )
      const data = await response.json()
      const amountRaised = parseFloat(data.amountRaised)
      const goalAmount = parseFloat(data.goalAmount)

      setFormData((prev) => ({
        ...prev,
        title: data.title || prev.title,
        description: data.description || prev.description,
        amountRaised: amountRaised || prev.amountRaised,
      }))
    } catch (error) {
      console.error("Error fetching GoFundMe data:", error)
    }
  }
  return (
    <div className="container max-w-2xl mx-auto py-8 px-4">
      <Link
        href="/"
        className="inline-flex items-center mb-4 text-sm text-accent hover:text-accent-dark">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to all postings
      </Link>

      <Card className="px-8 sm:px-4 py-6 border border-gray-300">
        <h2 className="text-xl text-center  font-new-spirit  text-secondary py-2 pb-8 font-light">
          Create a Posting
        </h2>
        <Form
          // onSubmit={handleSubmit}
          action={handleSubmit}
          className="space-y-6 px-6">
          <div className="flex gap-2">
            <Input
              isRequired
              name="creatorName"
              label="Name"
              placeholder="Your name"
              labelPlacement="outside"
              value={formData.creatorName}
              onChange={handleChange}
            />
            <Input
              isRequired
              name="location"
              label="Location"
              placeholder="City, State"
              labelPlacement="outside"
              value={formData.location}
              onChange={handleChange}
            />
          </div>
          <RadioGroup
            label="This posting is for"
            orientation="horizontal"
            className="text-sm"
            value={formData.forSelf ? "self" : "other"}
            onValueChange={handleRadioChange}>
            <Radio className="text-xs" size="sm" value="self">
              Myself
            </Radio>
            <Radio size="sm" value="other">
              Someone else
            </Radio>
          </RadioGroup>
          <div className="flex mt-3 pt-2 pb-3 gap-2">
            <Input
              name="gofundmeUrl"
              label="Auto-populate fields from go fund me link!"
              placeholder="https://www.gofundme.com/f/..."
              labelPlacement="outside"
              value={formData.gofundmeUrl}
              onChange={handleChange}
            />
            <Button
              color="success"
              className="mt-6 text-white"
              endContent={<Sparkle height={50} width={50} />}
              onPress={handleAutoGenerate}>
              Generate
            </Button>
          </div>

          <Input
            isRequired
            name="title"
            label="Title"
            placeholder="Title of the posting"
            className="mt-4"
            labelPlacement="outside"
            value={formData.title}
            onChange={handleChange}
          />
          <Textarea
            isRequired
            name="description"
            labelPlacement="outside"
            label="Description"
            placeholder="Description of the posting. Include details like why you need help, how the funds will be used, etc."
            value={formData.description}
            onChange={handleChange}
          />

          <div className="grid md:grid-cols-2 m-0 gap-2 lg:grid-cols-3">
            <Input
              type="url"
              className="mt-0"
              name="gofundmeUrl"
              label="GoFundMe link"
              labelPlacement="outside"
              value={formData.gofundmeUrl}
              onChange={handleChange}
            />
            <Input
              type="url"
              name="venmo"
              label="Venmo link"
              labelPlacement="outside"
              value={formData.venmo}
              onChange={handleChange}
            />
            <Input
              type="url"
              name="zelle"
              label="Zelle link"
              placeholder=""
              labelPlacement="outside"
              value={formData.zelle}
              onChange={handleChange}
            />
          </div>
          <div className="pt-1">
            <Input
              type="text"
              name="additionalLinks"
              label="Additional Links"
              labelPlacement="outside"
              placeholder="other link info separated by commas"
              value={formData.additionalLinks}
              onChange={handleChange}
            />
          </div>
          <CardFooter className="flex justify-end">
            <Button color="primary" type="submit" isLoading={loading}>
              Create Posting
            </Button>
          </CardFooter>
        </Form>
      </Card>
    </div>
  )
}
