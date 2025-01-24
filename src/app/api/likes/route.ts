import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(request) {
  const { postId, likedBy } = await request.json()
  console.log(postId, likedBy)
  try {
    // Create a new repost entry
    const newLike = await prisma.mp_likes.create({
      data: {
        postId,
        likedBy,
      },
    })

    // Update the repost count in the mp_posting table
    const updatedPost = await prisma.mp_posting.update({
      where: { id: postId },
      data: {
        likesNumber: {
          increment: 1, // Increment the repost count by 1
        },
      },
    })
    return new Response(JSON.stringify({ newLike, updatedPost }), {
      status: 201,
    })
  } catch (error) {
    console.error("Error creating repost:", error)
    return new Response(JSON.stringify({ error: "Failed to create repost." }), {
      status: 500,
    })
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const postId = searchParams.get("postId")
  try {
    const reposts = await prisma.mp_likes.findMany({
      where: { postId: parseInt(postId) },
    })
    return new Response(JSON.stringify(reposts), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch likes." }), {
      status: 500,
    })
  }
}
