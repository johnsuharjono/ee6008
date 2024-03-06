'use server'

import { revalidatePath } from 'next/cache'

import { prisma } from '@/src/lib/prisma'

export async function registerProjects(projects: { id: string; priority: number }[], studentId: string) {
  try {
    const res = await prisma.registration.createMany({
      data: projects.map((project) => ({
        projectId: project.id,
        studentId,
        priority: project.priority
      })),
      skipDuplicates: true
    })

    revalidatePath('/student/project-plan/')

    return {
      message: `Project successfully registered!`,
      status: 'OK',
      data: res
    }
  } catch (error) {
    return { message: `${error}`, status: 'ERROR' }
  }
}
