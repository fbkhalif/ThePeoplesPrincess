import { PrismaClient } from "@prisma/client"
import { unstable_cache } from "next/cache"
const prisma = new PrismaClient()

const getPosts = unstable_cache(
  async () => {
    return await prisma.mp_posting.findMany()
  },
  ["posts"],
  { revalidate: 60 }
)
export async function GET() {
  try {
    const posts = await prisma.mp_posting.findMany() // Use cached version
    return new Response(JSON.stringify(posts), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch posts." }), {
      status: 500,
    })
  }
}

export async function POST(request) {
  const {
    title,
    description,
    creatorName,
    location,
    forSelf,
    imageUrl,
    gofundmeUrl,
    amountRaised,
    additionalLinks,
    venmo,
    zelle,
  } = await request.json()

  try {
    const newPost = await prisma.mp_posting.create({
      data: {
        title,
        description,
        creatorName,
        location,
        forSelf,
        imageUrl,
        gofundmeUrl,
        amountRaised,
        additionalLinks,
        venmo,
        zelle,
      },
    })
    return new Response(JSON.stringify(newPost), { status: 201 })
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to create post." }), {
      status: 500,
    })
  }
}
