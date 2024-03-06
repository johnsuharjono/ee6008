import { prisma } from '@/src/lib/prisma'

export const getActiveSemester = async () => {
  return await prisma.semester.findFirst({
    where: {
      active: true
    },
    select: {
      maximumGroupSize: true,
      minimumGroupSize: true
    }
  })
}
