'use server'

import { hash } from 'bcrypt'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { prisma } from '@/src/lib/prisma'
import { AddFacultyFormSchema, AddStudentFormSchema } from '@/src/lib/schema'

export async function editName(prevState: any, data: FormData) {
  const schema = z.object({
    name: z.string(),
    userId: z.string()
  })

  const formData = schema.parse({
    name: data.get('name'),
    userId: data.get('userId')
  })

  try {
    const user = await prisma.user.update({
      where: {
        id: formData.userId
      },
      data: {
        name: formData.name
      }
    })
    revalidatePath('/admin/users/manage-students/')

    return { message: `${user.name} updated successfully!`, status: 'OK' }
  } catch (err) {
    return { message: `${err}`, status: 'ERROR' }
  }
}

export async function editEmail(prevState: any, formData: FormData) {
  const schema = z.object({
    email: z.string().email(),
    userId: z.string()
  })

  const data = schema.parse({
    email: formData.get('email'),
    userId: formData.get('userId')
  })

  try {
    const user = await prisma.user.update({
      where: {
        id: data.userId
      },
      data: {
        email: data.email
      }
    })
    revalidatePath('/admin/users/manage-students/')

    return { message: `${user.email} updated successfully!`, status: 'OK' }
  } catch (err) {
    return { message: `${err}`, status: 'ERROR' }
  }
}

export async function editPassword(prevState: any, formData: FormData) {
  const schema = z.object({
    userId: z.string().uuid(),
    password: z.string()
  })

  const data = schema.parse({
    userId: formData.get('userId'),
    password: formData.get('userId')
  })

  const password = data.password
  const userId = data.userId
  const hashedPassword = await hash(password, 12)

  try {
    const user = await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        password: hashedPassword
      }
    })
    revalidatePath('/admin/users/manage-students/')

    return {
      message: `${user.name} password updated successfully!`,
      status: 'OK'
    }
  } catch (err) {
    return { message: `${err}`, status: 'ERROR' }
  }
}

export async function deleteUser(prevState: any, formData: FormData) {
  const schema = z.object({
    userId: z.string().uuid()
  })

  const data = schema.parse({
    userId: formData.get('userId')
  })

  try {
    const user = await prisma.user.delete({
      where: {
        id: data.userId
      }
    })
    revalidatePath('/admin/users/manage-students/')

    return {
      message: `${user.name} deleted successfully!`,
      status: 'OK'
    }
  } catch (err) {
    return { message: `${err}`, status: 'ERROR' }
  }
}

export async function addStudent(data: z.infer<typeof AddStudentFormSchema>) {
  const formData = AddStudentFormSchema.parse({
    name: data.name,
    email: data.email,
    password: data.password,
    matriculationNumber: data.matriculationNumber
  })

  const password = formData.password
  const hashedPassword = await hash(password, 12)

  try {
    const user = await prisma.user.create({
      data: {
        name: formData.name,
        email: formData.email,
        password: hashedPassword,
        role: 'STUDENT',
        student: {
          create: {
            matriculationNumber: formData.matriculationNumber
          }
        }
      }
    })
    revalidatePath('/admin/users/manage-students/')

    return {
      message: `${user.name} added successfully!`,
      status: 'OK'
    }
  } catch (err) {
    return { message: `${err}`, status: 'ERROR' }
  }
}

export async function addFaculty(data: z.infer<typeof AddFacultyFormSchema>) {
  const formData = AddFacultyFormSchema.parse({
    name: data.name,
    email: data.email,
    password: data.password
  })

  const password = formData.password
  const hashedPassword = await hash(password, 12)

  try {
    const user = await prisma.user.create({
      data: {
        name: formData.name,
        email: formData.email,
        password: hashedPassword,
        role: 'FACULTY',
        faculty: {
          create: {}
        }
      }
    })
    revalidatePath('/admin/users/manage-faculty/')

    return {
      message: `${user.name} added successfully!`,
      status: 'OK'
    }
  } catch (err) {
    return { message: `${err}`, status: 'ERROR' }
  }
}
