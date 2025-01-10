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
  },
  {
    id: "100",
    title: "None",
    imageUrl: "next.svg",
    link: "#",
  },
]

export default function Home() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center justify-center mb-8 mt-6">
        <h1 className="text-2xl text-center font-bold">Mutual Aid Postings</h1>
        <p className="text-slate-500 text-xs py-4 font-light md:px-20 lg:px-32 sm:px-4">
          Click on mutual aid postings, learn more and donate. Anything helps!
          The wildfires are devastating California as we speak, so a lot of
          postings are related to that so far.
        </p>
      </div>

      <div className="grid grid-cols-1 pt-7 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockPostings.map((posting) => (
          <MutualAidCard key={posting.id} posting={posting} />
        ))}
      </div>
    </div>
  )
}
