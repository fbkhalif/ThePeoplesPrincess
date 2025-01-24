"use client"
import Image from "next/image"
import Link from "next/link"
import { notFound, useParams } from "next/navigation"
import { useState, useEffect } from "react"
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

export default function PostingPage({ postings }) {
  const params = useParams()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch("/api/posts")
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

  const posting = posts.find((p) => p.id === params.id)
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
              {posting?.additionalLinks && (
                <p className="text-sm text-muted-foreground">
                  Original posting:{" "}
                  <a
                    //href={posting.originalPostingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary hover:underline">
                    View here
                  </a>
                </p>
              )}
              <p className="text-md font-semibold  text-secondary">Donate!</p>
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
