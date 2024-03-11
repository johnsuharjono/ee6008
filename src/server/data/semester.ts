import { prisma } from '@/src/lib/prisma'

export const getActiveSemester = async () => {
  return await prisma.semester.findFirst({
    where: {
      active: true
    },
    select: {
      id: true,
      maximumGroupSize: true,
      minimumGroupSize: true,
      projectApplicationsLimit: true
    }
  })
}

export const getAllSemesters = async () => {
  return await prisma.semester.findMany({
    select: {
      id: true,
      name: true,
      active: true
    }
  })
}
