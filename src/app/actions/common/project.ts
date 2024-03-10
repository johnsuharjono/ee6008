'use server'

import { z } from 'zod'

import { prisma } from '@/src/lib/prisma'
import { AddProjectFormSchema, EditProjectFormSchema } from '@/src/lib/schema'

export async function addProject(data: z.infer<typeof AddProjectFormSchema>) {
  const { description, programme, semesterId, title, facultyId } = data

  try {
    const data = await prisma.project.create({
      data: {
        title,
        description,
        status: 'PENDING',
        Faculty: {
          connect: {
            id: facultyId
          }
        },
        Programme: {
          connect: {
            name_semesterId: {
              name: programme,
              semesterId
            }
          }
        }
      }
    })

    return {
      message: `Project proposal successfully created!`,
      status: 'OK',
      data
    }
  } catch (error) {
    return { message: `${error}`, status: 'ERROR' }
  }
}

export async function editProject(data: z.infer<typeof EditProjectFormSchema>) {
  const { description, programme, semesterId, title, projectId } = data

  try {
    const data = await prisma.project.update({
      where: {
        id: projectId
      },
      data: {
        title,
        description,
        status: 'PENDING',
        Programme: {
          connect: {
            name_semesterId: {
              name: programme,
              semesterId
            }
          }
        }
      }
    })

    return {
      message: `Project successfully updated!`,
      status: 'OK',
      data
    }
  } catch (error) {
    return { message: `${error}`, status: 'ERROR' }
  }
}

export async function deleteProject(id: string) {
  try {
    await prisma.project.delete({
      where: {
        id
      }
    })

    return {
      message: `Project successfully deleted!`,
      status: 'OK'
    }
  } catch (error) {
    return { message: `${error}`, status: 'ERROR' }
  }
}
