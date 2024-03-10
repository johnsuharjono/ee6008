import { prisma } from '@/src/lib/prisma'

export const getRegistrations = async () => {
  return await prisma.registration.findMany({
    include: {
      Student: {
        select: {
          matriculationNumber: true,
          User: {
            select: {
              name: true
            }
          }
        }
      },
      Project: {
        select: {
          title: true
        }
      }
    }
  })
}
