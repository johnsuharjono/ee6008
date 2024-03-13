import { prisma } from '@/src/lib/prisma'

export const getRegistrations = async () => {
  return await prisma.registration.findMany({
    include: {
      student: {
        select: {
          matriculationNumber: true,
          user: {
            select: {
              name: true
            }
          }
        }
      },
      project: {
        select: {
          title: true
        }
      }
    }
  })
}
