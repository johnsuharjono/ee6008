import { prisma } from '@/src/lib/prisma'

export const handleAllocation = async (studentProjectData: { projectId: string; studentId: string }[]) => {
  'use server'
  try {
    const operations = studentProjectData.map((studentProject) =>
      prisma.student.update({
        where: {
          id: studentProject.studentId
        },
        data: {
          projectId: studentProject.projectId
        }
      })
    )

    await prisma.$transaction(operations)
    return { message: 'Allocation successful', status: 'SUCCESS' }
  } catch (error) {
    console.error(error)
    return { message: `An error occurred: ${error}`, status: 'ERROR' }
  }
}
