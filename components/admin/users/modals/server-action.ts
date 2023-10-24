'use server'

import { prisma } from '@/lib/prisma'
import { hash } from 'bcrypt'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export async function editName(prevState: any, data: FormData) {
	const schema = z.object({
		name: z.string(),
		userId: z.string(),
	})

	const formData = schema.parse({
		name: data.get('name'),
		userId: data.get('userId'),
	})

	try {
		const user = await prisma.user.update({
			where: {
				id: formData.userId,
			},
			data: {
				name: formData.name,
			},
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
		userId: z.string(),
	})

	const data = schema.parse({
		email: formData.get('email'),
		userId: formData.get('userId'),
	})

	try {
		const user = await prisma.user.update({
			where: {
				id: data.userId,
			},
			data: {
				email: data.email,
			},
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
		password: z.string(),
	})

	const data = schema.parse({
		userId: formData.get('userId'),
		password: formData.get('userId'),
	})

	const password = data.password
	const userId = data.userId
	const hashedPassword = await hash(password, 12)

	try {
		const user = await prisma.user.update({
			where: {
				id: userId,
			},
			data: {
				password: hashedPassword,
			},
		})
		revalidatePath('/admin/users/manage-students/')

		return {
			message: `${user.name} password updated successfully!`,
			status: 'OK',
		}
	} catch (err) {
		return { message: `${err}`, status: 'ERROR' }
	}
}
