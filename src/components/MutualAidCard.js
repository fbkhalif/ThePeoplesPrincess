import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, User, DollarSign, LinkIcon } from "lucide-react"
import { MutualAidPosting } from "@/types/MutualAidPosting"

export function MutualAidCard({ posting }) {
  return (
    <Card className="overflow-hidden border-2 border-primary">
      <div className="relative h-48 w-full">
        <Image
          src={posting.imageUrl}
          alt={posting.title}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <CardContent className="p-4 bg-secondary/10">
        <h2 className="text-xl font-bold mb-2 text-primary">{posting.title}</h2>
        <div className="flex items-center mb-2 text-muted-foreground text-sm">
          <User className="mr-2 h-4 w-4" />
          <span>{posting.creatorName}</span>
          <MapPin className="ml-4 mr-2 h-4 w-4" />
          <span>{posting.location}</span>
        </div>
        <p className="text-foreground line-clamp-3">{posting.description}</p>
        {posting.gofundmeUrl && (
          <div className="mt-2">
            <a
              href={posting.gofundmeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:underline inline-flex items-center">
              <DollarSign className="mr-1 h-4 w-4" /> GoFundMe
            </a>
          </div>
        )}
        {posting.additionalLinks && posting.additionalLinks.length > 0 && (
          <div className="mt-2">
            <p className="text-sm font-semibold text-primary">
              Additional Resources:
            </p>
            <ul className="text-sm text-muted-foreground">
              {posting.additionalLinks.slice(0, 2).map((link, index) => (
                <li key={index} className="inline-flex items-center mr-4">
                  <LinkIcon className="mr-1 h-3 w-3" />
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-secondary">
                    {link.title}
                  </a>
                </li>
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
      </CardContent>
      <CardFooter className="bg-primary">
        <Button asChild variant="secondary" className="w-full">
          <Link href={`/posting/${posting.id}`}>
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
