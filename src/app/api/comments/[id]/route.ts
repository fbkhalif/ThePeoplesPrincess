import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function PATCH({ params, request }) {
  const { id } = params
  const { text } = await request.json()

  try {
    const updatedComment = await prisma.mp_comments.update({
      where: { id: parseInt(id) },
      data: { text },
    })
    return new Response(JSON.stringify(updatedComment), { status: 200 })
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to update comment." }),
      { status: 500 }
    )
  }
}

export async function DELETE({ params }) {
  const { id } = params

  try {
    await prisma.mp_comments.delete({ where: { id: parseInt(id) } })
    return new Response(null, { status: 204 })
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to delete comment." }),
      { status: 500 }
    )
  }
}
