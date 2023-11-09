'use server'

import { prisma } from '@/lib/prisma'
import {
	AddTimelineDataFormSchema,
	EditTimelineDataFormSchema,
} from '@/lib/schema'
import { z } from 'zod'

type Inputs = z.infer<typeof EditTimelineDataFormSchema>

export async function editTimeline(data: Inputs) {
	const formData = EditTimelineDataFormSchema.parse(data)

	try {
		await prisma.semesterTimeline.update({
			where: {
				semesterId: formData.semesterId,
			},
			data: {
				facultyProposalSubmissionStart: formData.facultyProposalSubmission.from,
				facultyProposalSubmissionEnd: formData.facultyProposalSubmission.to,
				studentRegistrationStart: formData.studentRegistration.from,
				studentRegistrationEnd: formData.studentRegistration.to,
				facultyMarkEntryStart: formData.markEntry.from,
				facultyMarkEntryEnd: formData.markEntry.to,
				studentPeerReviewStart: formData.peerReview.from,
				studentPeerReviewEnd: formData.peerReview.to,
			},
		})

		return { message: `Timeline updated successfully!`, status: 'OK' }
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
