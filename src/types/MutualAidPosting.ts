export interface MutualAidPosting {
  id: string
  title: string
  description: string
  imageUrl: string
  link: string
  creatorName: string
  location: string
  forSelf: boolean
  gofundmeUrl?: string
  originalPostingUrl?: string
  additionalLinks: { title: string; url: string }[]
}
