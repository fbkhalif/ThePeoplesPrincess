import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET() {
  try {
    const posts = await prisma.mp_posting.findMany()
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
