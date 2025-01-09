import Link from "next/link"
import { Button } from "@/components/ui/button"

const mutualAidResources = [
  { name: "Mutual Aid Hub", url: "https://www.mutualaidhub.org/" },
  { name: "COVID-19 Mutual Aid UK", url: "https://covidmutualaid.org/" },
  {
    name: "Mutual Aid Disaster Relief",
    url: "https://mutualaiddisasterrelief.org/",
  },
  { name: "National Mutual Aid Network", url: "https://www.mutualaidhub.org/" },
]

export function Navbar() {
  return (
    <nav className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold">
            Mutual Aid Postings
          </Link>
          <div className="relative group">
            <Button variant="secondary">Mutual Aid Resources</Button>
            <div className="absolute right-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out">
              <div className="bg-secondary text-secondary-foreground rounded-md shadow-lg overflow-hidden">
                {mutualAidResources.map((resource) => (
                  <a
                    key={resource.name}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-sm hover:bg-secondary-foreground hover:text-secondary">
                    {resource.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
