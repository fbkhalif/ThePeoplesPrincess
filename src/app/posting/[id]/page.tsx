import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ExternalLink,
  ArrowLeft,
  MapPin,
  User,
  DollarSign,
  LinkIcon,
} from "lucide-react"

// Mock data (in a real app, this would come from a database or API)
const mockPostings = [
  {
    id: "1",
    title: "Food Drive for Local Shelter",
    description:
      "Help us collect non-perishable food items for our local shelter. Every donation counts! We are particularly in need of canned vegetables, rice, pasta, and baby food. This drive will run for the next two weeks, and all donations can be dropped off at the community center between 9 AM and 5 PM, Monday through Saturday.",
    imageUrl: "/placeholder.svg?height=300&width=400",
    link: "https://example.com/food-drive",
    creatorName: "Jane Doe",
    location: "Springfield, IL",
    forSelf: false,
    gofundmeUrl: "https://gofundme.com/example-food-drive",
    originalPostingUrl: "https://mutualaid.example.com/food-drive",
    additionalLinks: [
      { title: "Volunteer Sign-up", url: "https://example.com/volunteer" },
      { title: "Donation Guidelines", url: "https://example.com/guidelines" },
    ],
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

export default function PostingPage({ params }: { params: { id: string } }) {
  const posting = mockPostings.find((p) => p.id === params.id)

  if (!posting) {
    notFound()
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Link
        href="/"
        className="inline-flex items-center mb-4 text-secondary hover:underline">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to all postings
      </Link>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-primary">
        <div className="relative h-64 w-full">
          <Image
            src={posting.imageUrl}
            alt={posting.title}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="p-6 bg-secondary/10">
          <h1 className="text-3xl font-bold mb-4 text-primary">
            {posting.title}
          </h1>
          <div className="flex items-center mb-4 text-muted-foreground">
            <User className="mr-2 h-4 w-4" />
            <span>{posting.creatorName}</span>
            <MapPin className="ml-4 mr-2 h-4 w-4" />
            <span>{posting.location}</span>
          </div>
          <p className="text-foreground mb-6">{posting.description}</p>
          <p className="text-sm text-muted-foreground mb-6">
            This posting is{" "}
            {posting.forSelf
              ? "for the creator themselves"
              : "on behalf of someone else"}
          </p>
          <div className="space-y-4">
            <button>
              <a href={posting.link} target="_blank" rel="noopener noreferrer">
                Learn More <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </button>
            {posting.gofundmeUrl && (
              <button>
                <a
                  href={posting.gofundmeUrl}
                  target="_blank"
                  rel="noopener noreferrer">
                  GoFundMe <DollarSign className="ml-2 h-4 w-4" />
                </a>
              </button>
            )}
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
            {posting.additionalLinks && posting.additionalLinks.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-2 text-primary">
                  Additional Resources
                </h2>
                <ul className="space-y-2">
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
      </div>
    </div>
  )
}
