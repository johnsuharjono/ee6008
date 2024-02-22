'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function approveProject(id: string) {
  try {
    const data = await prisma.project.update({
      where: {
        id: id
      },
      data: {
        status: 'APPROVED'
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

export async function rejectProject(id: string) {
  try {
    const data = await prisma.project.update({
      where: {
        id: id
      },
      data: {
        status: 'REJECTED'
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
