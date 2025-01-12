//You'll use a single PrismaClient instance that you can import into any file where it's needed. The instance will be created in a prisma.ts file inside the lib/ directory. Go ahead and create the missing directory and file:
//Now, whenever you need access to your database you can import the prisma instance into the file where it's needed.

import { PrismaClient } from "@prisma/client"

let prisma: PrismaClient

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}

export default prisma
