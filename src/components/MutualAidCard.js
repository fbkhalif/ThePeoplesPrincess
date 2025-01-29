"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Chip,
  Input,
  Button,
} from "@nextui-org/react"
import moment from "moment"

import { PrimaryButton } from "../components/PrimaryButton"
import {
  ArrowRight,
  XCircleIcon,
  MapPin,
  User,
  Clock10Icon,
  DollarSign,
  ArrowBigRight,
  CheckCircleIcon,
  StarIcon,
  ExternalLinkIcon,
  GlobeIcon,
  ArrowRightFromLine,
  ClockIcon,
  CopyIcon,
  ClipboardCopy,
  ShareIcon,
  LinkIcon,
} from "lucide-react"
import CommentCard from "./CommentCard"
import { ShuffleIcon } from "lucide-react"

export function MutualAidCard({ posting: initialPosting }) {
  const [posting, setPosting] = useState(initialPosting)

  const [isStarFilled, setIsStarFilled] = useState(false)
  const [isGlobeFilled, setIsGlobeFilled] = useState(false)
  const [isShuffleFilled, setIsShuffleFilled] = useState(false)
  const [comments, setComments] = useState(posting.comments || [])
  const [newComment, setNewComment] = useState("")
  const [amountRaised, setAmountRaised] = useState(0)

  const handleToggleStar = async () => {
    setIsStarFilled(!isStarFilled)
    if (!isStarFilled) {
      setPosting((prevPosting) => ({
        ...prevPosting,
        likesNumber: prevPosting.likesNumber + 1,
      }))
      const response = await fetch(`/api/likes?postId=${posting.id}`, {
        method: "POST",
        body: JSON.stringify({
          postId: posting.id,
          likedBy: "anonymous",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (response.ok) {
        const { newPost, updatedPost } = await response.json()
        setPosting(updatedPost)
      } else {
        console.error("Failed to fetch comments")
      }
    }
  }
  const handleToggleShuffle = async () => {
    setIsShuffleFilled(!isShuffleFilled)
    if (!isShuffleFilled) {
      setPosting((prevPosting) => ({
        ...prevPosting,
        repostNumber: prevPosting.repostNumber + 1,
      }))
      const response = await fetch(`/api/reposts?postId=${posting.id}`, {
        method: "POST",
        body: JSON.stringify({
          postId: posting.id,
          repostedBy: "anonymous",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (response.ok) {
        const { newPost, updatedPost } = await response.json()
        console.log(updatedPost)
        setPosting(updatedPost)
      } else {
        console.error("Failed to fetch comments")
      }
    }
  }

  useEffect(() => {
    async function fetchComments() {
      const response = await fetch(`/api/comments?postId=${posting.id}`)
      if (response.ok) {
        const data = await response.json()
        setComments(data)
      } else {
        console.error("Failed to fetch comments")
      }
    }

    fetchComments()
  }, [posting.id])

  /* useEffect(() => {
    async function fetchAmountRaised() {
      if (posting.gofundmeUrl) {
        try {
          const response = await fetch(
            `/api/gofundme?url=${encodeURIComponent(posting.gofundmeUrl)}`
          )
          if (response.ok) {
            const data = await response.json()
            setAmountRaised(data.parsedAmount || 0)
            //console.log("Amount raised:", amountRaised)
          } else {
            console.error("Failed to fetch GoFundMe data")
          }
        } catch (error) {
          console.error("Error fetching GoFundMe data:", error)
        }
      }
    }

    fetchAmountRaised()
  }, []) */

  const handleShare = async () => {
    const detailsUrl = `${window.location.origin}/posting/${posting.id}`

    if (navigator.share) {
      try {
        await navigator.share({
          url: detailsUrl,
          title: posting.title,
          text: posting.description,
        })
        // console.log("Content shared successfully")
      } catch (error) {
        console.error("Error sharing content:", error)
      }
    } else {
      //console.log("Web Share API is not supported in this browser")
    }
  }

  const handleAddComment = async () => {
    if (newComment.trim() === "") return

    const newCommentData = {
      text: newComment,
      commenter: "Anonymous",
    }

    setComments([...comments, newCommentData])
    setNewComment("")

    try {
      // Make a POST request to create a new comment in the backend
      const response = await fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify({
          postId: posting.id,
          ...newCommentData,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to create comment.")
      }

      // Get the new comment from the backend (in case there are any additional fields added on the backend)
      const newCommentFromBackend = await response.json()

      // Update the state with the newly added comment
      setComments([...comments, newCommentFromBackend])
    } catch (error) {
      console.error("Error adding comment:", error)
    }
  }

  return (
    <Card shadow="lg" style={{}} className="rounded-md p-2 ">
      <CardBody>
        <CardHeader className="text-md mb-1 grid grid-cols-5 font-bold p-0 text-secondary">
          <p className="col-span-4">{posting.title || "No title"}</p>
          <div className="flex flex-row gap-2 ml-auto">
            <ShareIcon
              onClick={handleShare}
              className=" text-gray-400 hover:text-slate-500 cursor-pointer h-5 w-5"
            />
          </div>
        </CardHeader>
        <div className="flex text-gray-500 items-center mb-4 text-muted-foreground text-[12px]">
          <Clock10Icon className="mr-1 h-3 w-3" />
          {posting.updatedAt ? (
            <span>
              {moment(posting.updatedAt).format("MMMM Do YYYY") ||
                "Last updated: N/A"}
            </span>
          ) : (
            <span className="text-slate-500">
              {moment(posting.createdAt).format("MMMM Do YYYY") ||
                "Created: N/A"}
            </span>
          )}
          <User className="ml-2 mr-1 h-3 w-3" />
          <span>{posting.creatorName || "Anonymous"}</span>
          <MapPin className="ml-2 mr-1 h-3 w-3" />
          <span>{posting.location || "Unknown"}</span>
        </div>
        <div className="grid grid-rows-1">
          <p className="text-foreground text-xs mb-2 overflow-scroll max-h-24">
            {posting.description || "No description"}
          </p>
          {posting.gofundmeUrl && posting.amountRaised != 0 && (
            <Chip color="success" variant="flat" className="text-xs  mb-8">
              Go fund me amount raised: ${posting.amountRaised || "unknown"}
            </Chip>
          )}
        </div>
        <div className="flex flex-row  mb-2">
          <div className="flex text-xs items-center">
            <Button
              startContent={
                <StarIcon
                  fill={isStarFilled ? "#B70E60FF" : "none"}
                  className="h-4 w-4"
                />
              }
              size="sm"
              className={isStarFilled ? "p1 text-secondary" : "p1 text-primary"}
              color={isStarFilled ? "#B70E60FF" : "none"}
              variant="light"
              onPress={handleToggleStar}>
              <span>{posting.likesNumber || 0} Likes</span>
            </Button>
          </div>
          <div className="flex text-xs items-center gap-1">
            <Button
              startContent={<ShuffleIcon className="h-4 w-4" />}
              size="sm"
              className={isShuffleFilled ? " text-secondary" : " text-primary"}
              color={isShuffleFilled ? "#B70E60FF" : "none"}
              variant="light"
              onPress={handleToggleShuffle}>
              <span>{posting.repostNumber || 0} Reposts</span>
            </Button>
          </div>
          <div className="flex text-xs  text-primary items-center gap-1">
            <Button
              startContent={<GlobeIcon className="h-4 w-4" />}
              size="sm"
              className="p-1"
              disabled
              color="primary-light"
              variant="light">
              <span>{posting.views || 0} Views</span>
            </Button>
          </div>
        </div>
        <div className="bg-secondary/10 border p-2 rounded-xl">
          <p className="text-xs text-secondary mb-1">Donate below!</p>
          {posting.gofundmeUrl && (
            <Button
              className="text-white ml-1"
              size="sm"
              style={{ backgroundColor: "var(--gofundme)" }}
              startContent={<DollarSign className="h-4 w-4" />}>
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
              className="text-white ml-1"
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
          {!posting.additionalLinks &&
            !posting.gofundmeUrl &&
            !posting.zelle &&
            !posting.venmo && (
              <a
                href="#"
                rel="noopener noreferrer"
                className="text-slate-400 px-2 text-center rounded-lg py-1 text-xs pointer-events-none hover:none inline-flex items-center">
                <XCircleIcon className="mr-1 h-4 w-4" /> No links available
              </a>
            )}

          {posting.additionalLinks && posting.additionalLinks.length > 0 && (
            <div className="mt-2 flex flex-col">
              <p className="text-xs text-secondary/50 ">Additional Links</p>
              <ul className="text-sm text-muted-foreground">
                {posting.additionalLinks.slice(0, 2).map((link, index) => (
                  <Button
                    size="sm"
                    color="secondary"
                    variant={"light"}
                    key={index}
                    className="ml-1"
                    startContent={<LinkIcon className=" h-3 w-3" />}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline">
                      {link.title}
                    </a>
                  </Button>
                ))}
                {posting.additionalLinks.length > 2 && (
                  <li className="inline-flex items-center">
                    <span className="text-muted-foreground">
                      +{posting.additionalLinks.length - 2} more
                    </span>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </CardBody>

      <CardFooter className="inline-block text-xs pt-3 text-right text-primary">
        <Link href={`/post/${posting.id}`} passHref>
          <Button
            className="text-xs"
            size="small"
            //  href={`/posting/${posting.id}`}
            color="primary"
            variant="light"
            endContent={<ArrowRightFromLine className="h-4 w-4" />}>
            View Details
          </Button>
        </Link>
      </CardFooter>
      <hr></hr>
      <CardFooter className="grid max-h-48 overflow-scroll grid-cols-1">
        <p className="col-span-1 mb-1 text-sm max-h-24 overflow-scroll text-slate-600">
          Comments
        </p>
        {/* Textarea for adding a comment */}
        {/* Comments List */}
        <div className="mt-4 mb-4 ">
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <CommentCard
                key={index}
                user={{ name: comment.commenter }}
                comment={comment.text}
              />
            ))
          ) : (
            <p className="text-xs text-muted-foreground">No comments yet.</p>
          )}
        </div>
        <div className="flex text-xs gap-2 justify-between">
          <Input
            type="text"
            size="sm"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
          />
          <Button
            onPress={handleAddComment}
            size="sm"
            className="text-xs p-4 px-6"
            color="primary"
            variant="solid">
            Post Comment
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
