"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import { MutualAidCard } from "../components/MutualAidCard"
import { PrimaryButton } from "../components/PrimaryButton"
import { ShuffleIcon } from "lucide-react"
// Mock data for mutual aid postings
import SearchField from "../components/SearchField"
import { unstable_cache } from "next/cache"
import { Navbar } from "@nextui-org/react"

export default function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredPosts, setFilteredPosts] = useState([])
  const [sortCriteria, setSortCriteria] = useState("createdAt") // default sorting by createdAt
  const [sortOrder, setSortOrder] = useState("asc") // default to ascending order

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch("/api/posts", {
        cache: "force-cache", // Static caching for performance
        // cache: "no-store", // Use this if posts need to be fresh
      })
      if (response.ok) {
        const data = await response.json()
        setPosts(data)
      } else {
        console.error("Failed to fetch posts")
      }
      setLoading(false)
    }

    fetchPosts()
  }, [])

  useEffect(() => {
    const results = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.creatorName.toLowerCase().includes(searchQuery.toLowerCase())
    )

    // Sort filtered posts based on the selected sort criteria and order
    const sortedPosts = results.sort((a, b) => {
      let compareValue = 0

      if (sortCriteria === "createdAt") {
        compareValue = new Date(b.createdAt) - new Date(a.createdAt) // Sort by most recent first
      }
      if (sortCriteria === "urgencyLevel") {
        compareValue = b.urgencyLevel - a.urgencyLevel // Sort by urgency level, assuming it's a numeric value
      }
      if (sortCriteria === "Location") {
        compareValue = a.location.localeCompare(b.location) // Sort by location alphabetically
      }
      if (sortCriteria === "name") {
        compareValue = a.creatorName.localeCompare(b.creatorName) // Sort by creator name alphabetically
      }
      if (sortCriteria === "likes") {
        compareValue = a.likesNumber - b.likesNumber // Sort by likes
      }
      if (sortCriteria === "reposts") {
        compareValue = a.repostNumber - b.repostNumber // Sort by reposts
      }

      return sortOrder === "asc" ? compareValue : -compareValue // Reverse for descending order
    })

    setFilteredPosts(sortedPosts)
  }, [searchQuery, posts, sortCriteria, sortOrder])

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleSortChange = (e) => {
    setSortCriteria(e.target.value)
  }

  const handleOrderChange = (e) => {
    setSortOrder(e.target.value)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center justify-center mb-8 mt-6">
        <h1 className="text-2xl text-center font-new-spirit font-normal">
          Mutual Aid Postings
        </h1>
        <p className="text-slate-500 text-xs py-4 font-light md:px-20 lg:px-32 sm:px-4">
          Mutual aid postings are a quick, personal way to support communities,
          inspired by how people use Instagram stories to share urgent needs of
          people they know or know of who are in need of help. From wildfire
          relief in California to covering rent for people in need, these
          postings create real-time, local impact. Anything helps!
          <b>
            {" "}
            TLDR, our goal is to centralize mutual aid postings that typically
            circulate on social media!
          </b>
        </p>
        <nav className="flex flex-col md:flex-row text-[10px] justify-between items-center mb-4">
          <SearchField
            variant="outlined"
            value={searchQuery}
            className="text-xs text-accent-light"
            onChange={handleSearchChange}
          />
          <div className="mt-4 mb-4">
            <span>Sort by: </span>
            <select
              value={sortCriteria}
              onChange={handleSortChange}
              className="text-[10px] p-1.5 pr-3 border-neutral-100 border-2 shadow-sm text-neutral-500 rounded-lg">
              <option value="createdAt">Date</option>
              <option value="urgencyLevel">Urgency Level</option>
              <option value="Location">by Location</option>
              <option value="name">by Name</option>
              <option value="likes">by Likes</option>
              <option value="reposts">by Reposts</option>
            </select>
          </div>
        </nav>

        <div className="grid grid-cols-1 pt-7 md:grid-cols-2 gap-6">
          {filteredPosts.map((posting) => (
            <MutualAidCard key={posting.id} posting={posting} />
          ))}
        </div>
      </div>
    </div>
  )
}
