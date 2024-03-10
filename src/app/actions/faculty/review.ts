'use server'

import { revalidatePath } from 'next/cache'

import { prisma } from '@/src/lib/prisma'

export async function approveProject(id: string) {
  try {
    const data = await prisma.project.update({
      where: {
        id: id
      },
      data: {
        status: 'APPROVED',
        reviewMessage: null
      }
    })

    revalidatePath('/faculty/review-projects/')

    return {
      message: `Project proposal successfully approved!`,
      status: 'OK',
      data
    }
  } catch (error) {
    return { message: `${error}`, status: 'ERROR' }
  }
}

export async function rejectProject(id: string, message: string) {
  try {
    const data = await prisma.project.update({
      where: {
        id: id
      },
      data: {
        status: 'REJECTED',
        reviewMessage: message
      }
    })
    revalidatePath('/faculty/review-projects/')

    return {
      message: `Project proposal successfully rejected!`,
      status: 'OK',
      data
    }
  } catch (error) {
    return { message: `${error}`, status: 'ERROR' }
  }
}
