import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(request) {
  const { postId, text, commenter } = await request.json()
  if (!postId) {
    return new Response(JSON.stringify({ error: "postId is required" }), {
      status: 400,
    })
  }
  try {
    const newComment = await prisma.mp_comments.create({
      data: {
        text,
        commenter,
        postId,
      },
    })
    return new Response(JSON.stringify(newComment), { status: 201 })
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to create comment." }),
      { status: 500 }
    )
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const postId = searchParams.get("postId")

  try {
    const comments = await prisma.mp_comments.findMany({
      where: { postId: parseInt(postId) },
    })
    return new Response(JSON.stringify(comments), { status: 200 })
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch comments." }),
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
