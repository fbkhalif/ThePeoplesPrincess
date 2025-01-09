import Link from "next/link"
import { MutualAidCard } from "../components/MutualAidCard"
import { MutualAidPosting } from "../types/MutualAidPosting"
import { PrimaryButton } from "../components/PrimaryButton"

// Mock data for mutual aid postings
const mockPostings = [
  {
    id: "1",
    title: "Food Drive for Local Shelter",
    description:
      "Help us collect non-perishable food items for our local shelter. Every donation counts!",
    imageUrl: "/placeholder.svg?height=300&width=400",
    link: "https://example.com/food-drive",
  },
  {
    id: "2",
    title: "Community Garden Volunteers Needed",
    description:
      "Join us in maintaining our community garden. No experience necessary, just a willingness to get your hands dirty!",
    imageUrl: "/placeholder.svg?height=300&width=400",
    link: "https://example.com/garden-volunteers",
  },
  {
    id: "3",
    title: "Free Tech Support for Seniors",
    description:
      "Offering free tech support to seniors in our community. Help with smartphones, computers, and more.",
    imageUrl: "/placeholder.svg?height=300&width=400",
    link: "https://example.com/tech-support",
  },
  {
    id: "4",
    title: "Clothing Donation Drive",
    description:
      "Collecting gently used clothing for families in need. All sizes and types of clothing welcome.",
    imageUrl: "/placeholder.svg?height=300&width=400",
    link: "https://example.com/clothing-drive",
  },
]

export default function Home() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Mutual Aid Postings</h1>
        <Link href="/create-posting">
          <Button>
            <div className="mr-2 h-4 w-4" /> Create New Posting
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockPostings.map((posting) => (
          <MutualAidCard key={posting.id} posting={posting} />
        ))}
      </div>
    </div>
  )
}
