import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(req) {
  try {
    // Fetch all resources from the database
    const resources = await prisma.ma_resources.findMany()

    // Return the resources as JSON
    return new Response(JSON.stringify(resources), { status: 200 })
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to retrieve resources" }),
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

export async function POST(req) {
  try {
    // Parse the incoming JSON data from the request
    const { name, link, tags, desc } = await req.json()

    // Input validation
    if (!name || !link) {
      return new Response(
        JSON.stringify({ error: "Name and Link are required fields" }),
        { status: 400 }
      )
    }

    // Check if the resource with the same name or link already exists
    const existingResource = await prisma.ma_resources.findFirst({
      where: {
        OR: [
          { name: name }, // Check for duplicate name
          { link: link }, // Check for duplicate link
        ],
      },
    })

    if (existingResource) {
      return new Response(
        JSON.stringify({
          error: "A resource with the same name or link already exists.",
        }),
        { status: 400 }
      )
    }

    // Create the new resource
    const newResource = await prisma.ma_resources.create({
      data: {
        name,
        link,
        tags,
        desc, // Optional description field
      },
    })

    return new Response(JSON.stringify(newResource), { status: 201 })
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to create resource" }),
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
