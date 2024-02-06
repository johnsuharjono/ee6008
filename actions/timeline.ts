'use server'

import { prisma } from '@/lib/prisma'
import { EditTimelineDataFormSchema } from '@/lib/schema'
import { z } from 'zod'

export async function editTimeline(
	data: z.infer<typeof EditTimelineDataFormSchema>
) {
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
