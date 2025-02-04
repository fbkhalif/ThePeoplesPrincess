import { PrismaClient } from "@prisma/client"
import { NextRequest } from "next/server"
const prisma = new PrismaClient()

export async function PATCH(request: NextRequest) {
  const { id } = await request.json()

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
