"use client"
import Image from "next/image"
import Link from "next/link"
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from "@nextui-org/react"
import { PrimaryButton } from "../components/PrimaryButton"
import {
  ArrowRight,
  XCircleIcon,
  MapPin,
  User,
  DollarSign,
  LinkIcon,
} from "lucide-react"
import { MutualAidPosting } from "../types/MutualAidPosting"

export function MutualAidCard({ posting }) {
  const defaultImageUrl = "favicon.ico"
  return (
    <Card shadow="lg" style={{}} className="rounded-md p-2 ">
      <CardBody>
        <CardHeader className="text-md mb-1 font-bold p-0 text-secondary">
          <p>{posting.title || "No title"}</p>
        </CardHeader>
        <div className="flex text-gray-500 items-center mb-4 text-muted-foreground text-xs">
          <User className="mr-1 h-4 w-4" />
          <span>{posting.creatorName || "Anonymous"}</span>
          <MapPin className="ml-4 mr-1 h-4 w-4" />
          <span>{posting.location || "Unknown"}</span>
        </div>
        <p className="text-foreground text-xs mb-4 line-clamp-3">
          {posting.description || "No description"}
        </p>
        <div className="bg-pink-100/50 p-3 rounded-xl">
          <p className="text-xs text-secondary/50">Links</p>
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
      <CardFooter className="float-right text-right text-white inline-block text-xs pt-3 text-primary">
        <Link className="align-middle" href={`/posting/${posting.id}`}>
          View Details →
        </Link>
      </CardFooter>
    </Card>
  )
}
