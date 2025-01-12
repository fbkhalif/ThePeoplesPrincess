"use client"
import Image from "next/image"
import Link from "next/link"
import { notFound, useParams } from "next/navigation"

import {
  ExternalLink,
  ArrowLeft,
  MapPin,
  User,
  DollarSign,
  LinkIcon,
} from "lucide-react"
import { Card, CardHeader, CardBody, Button } from "@nextui-org/react"
// Mock data (in a real app, this would come from a database or API)
const mockPostings = [
  {
    id: "1",
    title: "Food Drive for Local Shelter",
    description:
      "Help us collect non-perishable food items for our local shelter. Every donation counts!",
    imageUrl: "/placeholder.svg?height=300&width=400",
    additionalLinks: [
      { url: "https://example.com/food-drive", title: "original" },
      { url: "https://example.com/food-drive", title: "resources" },
    ],
    creatorName: "John Doe",
    gofundmeUrl:
      "https://www.gofundme.com/f/help-uncle-trini-rebuild-after-fire/donate?attribution_id=undefined&utm_campaign=unknown&utm_medium=customer&utm_source=website_widget",
    location: "EX",
    forSelf: "no",
    venmo: "https://www.gofundme.com/",
    zelle: "https://www.zelle.com/",
    contactLink: "https://www.instagram.com/",
  },
  {
    id: "2",
    title: "Community Garden Volunteers Needed",
    description:
      "Join us in maintaining our community garden. No experience necessary, just a willingness to get your hands dirty! We meet every Saturday morning from 8 AM to 12 PM. Tasks include planting, weeding, watering, and harvesting. All produce grown is donated to local food banks and soup kitchens.",
    imageUrl: "/placeholder.svg?height=300&width=400",
    link: "https://example.com/garden-volunteers",
    creatorName: "John Smith",
    location: "Greenville, SC",
    forSelf: true,
    additionalLinks: [
      { title: "Garden Layout", url: "https://example.com/garden-layout" },
      {
        title: "Planting Schedule",
        url: "https://example.com/planting-schedule",
      },
    ],
  },
  {
    id: "3",
    title: "Free Tech Support for Seniors",
    description:
      "Offering free tech support to seniors in our community. Help with smartphones, computers, and more. Sessions are held every Tuesday and Thursday from 2 PM to 4 PM at the local library. Volunteers are also needed to assist with one-on-one tutoring.",
    imageUrl: "/placeholder.svg?height=300&width=400",
    link: "https://example.com/tech-support",
    creatorName: "Tech Helpers Association",
    location: "Silicon Valley, CA",
    forSelf: false,
    gofundmeUrl: "https://gofundme.com/example-tech-support",
    originalPostingUrl: "https://techhelpers.org/senior-support",
    additionalLinks: [
      {
        title: "Volunteer Application",
        url: "https://example.com/tech-volunteer",
      },
      { title: "Tech Support FAQ", url: "https://example.com/tech-faq" },
    ],
  },
  {
    id: "4",
    title: "Clothing Donation Drive",
    description:
      "Collecting gently used clothing for families in need. All sizes and types of clothing welcome. We are especially in need of winter coats, boots, and children's clothing. Donations can be dropped off at any fire station in the city throughout the month of November.",
    imageUrl: "/placeholder.svg?height=300&width=400",
    link: "https://example.com/clothing-drive",
    creatorName: "Sarah Johnson",
    location: "Minneapolis, MN",
    forSelf: false,
    gofundmeUrl: "https://gofundme.com/example-clothing-drive",
    additionalLinks: [
      {
        title: "Donation Locations",
        url: "https://example.com/donation-locations",
      },
      { title: "Most Needed Items", url: "https://example.com/needed-items" },
    ],
  },
]

export default function PostingPage() {
  const params = useParams()
  const posting = mockPostings.find((p) => p.id === params.id)

  if (!posting) {
    notFound()
  }

  return (
    <div className="container py-8 px-10">
      <Link
        href="/"
        className="inline-flex items-center mb-4 text-xs text-secondary hover:underline">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to all postings
      </Link>
      <Card className="bg-white p-4 mx-10 rounded-lg shadow-lg overflow-hidden border-1">
        <CardBody className="grid gap-4 sm:grid-cols-1  md:grid-cols-3">
          <div className="">
            <Image
              src={"/diana3.avif"}
              alt={posting.title}
              layout="responsive"
              className={"object-cover"}
              width={400}
              height={300}
            />
          </div>
          <div className="col-span-2">
            <CardHeader className="flex px-0 py-0 pb-1 justify-between w-full">
              <p className="text-md font-bold text-secondary">
                {posting.title}
              </p>
              <div className="flex items-center text-xs text-slate-500 text-sm text-muted-foreground">
                <User className="mr-2 h-4 w-4" />
                <span className="whitespace-nowrap">{posting.creatorName}</span>
                <MapPin className="ml-4 mr-2 h-4 w-4" />
                <span>{posting.location}</span>
              </div>
            </CardHeader>

            <p className="text-slate-800 text-sm mt-2 mb-2">
              {posting.description}
            </p>
            <p className="text-slate-800 text-sm mt-2 mb-2">
              Contact me at{" "}
              <a
                href={posting.contactLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:underline">
                link
              </a>{" "}
              for more information.
            </p>
            <hr></hr>
            <div className="space-y-4 mt-2">
              {posting.originalPostingUrl && (
                <p className="text-sm text-muted-foreground">
                  Original posting:{" "}
                  <a
                    href={posting.originalPostingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary hover:underline">
                    View here
                  </a>
                </p>
              )}
              <p className="text-md font-semibold  text-secondary">
                Donation links
              </p>
              {posting.gofundmeUrl && (
                <Button
                  variant="solid"
                  color="secondary"
                  size="sm"
                  style={{ backgroundColor: " var(--gofundme)" }}
                  startContent={<DollarSign className="text-xs h-4 w-4" />}>
                  <a
                    href={posting.gofundmeUrl}
                    target="_blank"
                    rel="noopener noreferrer">
                    GoFundMe
                  </a>
                </Button>
              )}
              {posting.venmo && (
                <Button
                  className="text-white ml-1"
                  size="sm"
                  style={{ backgroundColor: "var(--venmo)" }}
                  startContent={<DollarSign className="h-4 w-4" />}>
                  <a
                    href={posting.venmo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Venmo">
                    Venmo
                  </a>
                </Button>
              )}
              {posting.zelle && (
                <Button
                  className="text-white mb-2 ml-1 mt-1"
                  size="sm"
                  style={{ backgroundColor: "var(--zelle)" }}
                  startContent={<DollarSign className="h-4 w-4" />}>
                  <a
                    href={posting.zelle}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Zelle">
                    Zelle
                  </a>
                </Button>
              )}
              {posting.additionalLinks &&
                posting.additionalLinks.length > 0 && (
                  <div>
                    <h2 className="text-md font-semibold mb-2 text-secondary">
                      Additional Links
                    </h2>
                    <ul className="space-y-2 text-sm">
                      {posting.additionalLinks.map((link, index) => (
                        <li key={index}>
                          <a
                            href={link.url}
                            key={index}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-secondary hover:underline inline-flex items-center">
                            <LinkIcon className="mr-2 h-4 w-4" />
                            {link.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
