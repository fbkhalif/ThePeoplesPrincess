import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function PATCH({ params }) {
  const { id } = params

  try {
    const updatedPost = await prisma.mp_posting.update({
      where: { id: parseInt(id) },
      data: { views: { increment: 1 } },
    })
    return new Response(JSON.stringify(updatedPost), { status: 200 })
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to increment views." }),
      { status: 500 }
    )
  }
}
