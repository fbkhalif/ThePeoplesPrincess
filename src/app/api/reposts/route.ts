import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(request) {
  const { postId, repostedBy } = await request.json()
  console.log(postId, repostedBy)
  try {
    // Create a new repost entry
    const newRepost = await prisma.mp_reposts.create({
      data: {
        postId,
        repostedBy,
      },
    })

    // Update the repost count in the mp_posting table
    const updatedPost = await prisma.mp_posting.update({
      where: { id: postId },
      data: {
        repostNumber: {
          increment: 1, // Increment the repost count by 1
        },
      },
    })
    console.log(updatedPost, "Updated post")
    console.log(newRepost, "Updated post")
    return new Response(JSON.stringify({ newRepost, updatedPost }), {
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
    const reposts = await prisma.mp_reposts.findMany({
      where: { postId: parseInt(postId) },
    })
    return new Response(JSON.stringify(reposts), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch reposts." }), {
      status: 500,
    })
  }
}
