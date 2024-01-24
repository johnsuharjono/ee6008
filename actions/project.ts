'use server'

import { prisma } from '@/lib/prisma'
import {
	AddProjectFormSchema,
	AddTimelineDataFormSchema,
	EditProjectFormSchema,
} from '@/lib/schema'
import { z } from 'zod'

export async function addProject(data: z.infer<typeof AddProjectFormSchema>) {
	const {
		description,
		numberOfStudents,
		programme,
		semesterId,
		title,
		facultyId,
	} = data

	try {
		const data = await prisma.project.create({
			data: {
				title,
				description,
				numberOfStudents,
				faculty: {
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

export async function createSemesterTimeline(
	data: z.infer<typeof AddTimelineDataFormSchema>
) {
	const formData = AddTimelineDataFormSchema.parse(data)

	try {
		const semester = await prisma.semester.create({
			data: {
				name: formData.semesterName,
				SemesterTimeline: {
					create: {
						facultyProposalSubmissionStart:
							formData.facultyProposalSubmission.from,
						facultyProposalSubmissionEnd: formData.facultyProposalSubmission.to,
						studentRegistrationStart: formData.studentRegistration.from,
						studentRegistrationEnd: formData.studentRegistration.to,
						facultyMarkEntryStart: formData.markEntry.from,
						facultyMarkEntryEnd: formData.markEntry.to,
						studentPeerReviewStart: formData.peerReview.from,
						studentPeerReviewEnd: formData.peerReview.to,
					},
				},
			},
		})

		return {
			message: `Semester timeline created successfully!`,
			status: 'OK',
			data: semester,
		}
	} catch (error) {
		return { message: `${error}`, status: 'ERROR' }
	}
}

export async function editProject(data: z.infer<typeof EditProjectFormSchema>) {
	const {
		description,
		numberOfStudents,
		programme,
		semesterId,
		title,
		projectId,
	} = data

	try {
		const data = await prisma.project.update({
			where: {
				id: projectId,
			},
			data: {
				title,
				description,
				numberOfStudents,
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
