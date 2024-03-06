'use server'

import { revalidatePath } from 'next/cache'

import { prisma } from '@/src/lib/prisma'

export async function addProjectPlan(projectsId: string[], studentId: string) {
  try {
    const res = await prisma.projectPlan.createMany({
      data: projectsId.map((projectId) => ({
        projectId,
        studentId
      })),
      skipDuplicates: true
    })

    revalidatePath('/student/project-plan/')

    return {
      message: `Project plan successfully created!`,
      status: 'OK',
      data: res
    }
  } catch (error) {
    return { message: `${error}`, status: 'ERROR' }
  }
}
