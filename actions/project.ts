'use server'

import { prisma } from '@/lib/prisma'
import { AddProjectFormSchema, EditProjectFormSchema } from '@/lib/schema'
import { z } from 'zod'

export async function addProject(data: z.infer<typeof AddProjectFormSchema>) {
	const { description, programme, semesterId, title, facultyId } = data

	try {
		const data = await prisma.project.create({
			data: {
				title,
				description,
				Faculty: {
					connect: {
						id: facultyId,
					},
				},
				Programme: {
					connect: {
						name_semesterId: {
							name: programme,
							semesterId,
						},
					},
				},
			},
		})

		return {
			message: `Project proposal successfully created!`,
			status: 'OK',
			data,
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
				id: projectId,
			},
			data: {
				title,
				description,
				Programme: {
					connect: {
						name_semesterId: {
							name: programme,
							semesterId,
						},
					},
				},
			},
		})

		return {
			message: `Project successfully updated!`,
			status: 'OK',
			data,
		}
	} catch (error) {
		return { message: `${error}`, status: 'ERROR' }
	}
}
