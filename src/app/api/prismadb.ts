import {PrismaClient} from '@prisma/client'
import { env } from '../../env.mjs'
//const prisma = new PrismaClient()

const globalForPrisma = global as unknown as {
    prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
 

/*
const startDate = new Date(2022, 8, 1)
const endDate = new Date(2022,9,1)


async function main() {
    const tour = await prisma.events.create({
        data: {
            name: "Test Event 1",
            location: "Seattle, WA",
            venue: "Bar House",
            event_date: startDate
        }
    })
    console.log(tour)
}



main().catch(e => {
    console.error(e.message)
}).finally(async () => {
    await prisma.$disconnect()
}) 

*/