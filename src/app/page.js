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
    setFilteredPosts(results)
  }, [searchQuery, posts])

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center justify-center mb-8 mt-6">
        <h1 className="text-2xl text-center font-bold">Mutual Aid Postings</h1>
        <p className="text-slate-500 text-xs py-4 font-light md:px-20 lg:px-32 sm:px-4">
          Mutual aid postings are a quick, personal way to support communities,
          inspired by how people use Instagram stories to share urgent needs of
          people they know or know of who are in need of help. Unlike GoFundMe
          or nonprofits, they skip the red tape, sending help directly to those
          who need it most. We are also aiming to try to make sure fraud doesn't
          happen, by using AI. From wildfire relief in California to covering
          rent, these postings create real-time, local impact. Just click, learn
          more, and donate—anything helps! It’s a heartfelt way to show
          solidarity and make a difference, one post at a time.
        </p>
      </div>
      <SearchField value={searchQuery} onChange={handleSearchChange} />
      <div className="grid grid-cols-1 pt-7 md:grid-cols-2  gap-6">
        {filteredPosts.map((posting) => (
          <MutualAidCard key={posting.id} posting={posting} />
        ))}
      </div>
    </div>
  )
}
