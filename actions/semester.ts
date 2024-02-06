'use server'

import { prisma } from '@/lib/prisma'
import {
	AddSemesterDataFormSchema,
	EditTimelineDataFormSchema,
} from '@/lib/schema'
import { ProgrammeName } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export async function setActiveSemester(semesterId: string) {
	await prisma.semester.updateMany({
		data: {
			active: false,
		},
		where: {
			active: true,
		},
	})

	const response = await prisma.semester.update({
		data: {
			active: true,
		},
		where: {
			id: semesterId,
		},
	})

	revalidatePath('/admin/semesters')

	return {
		message: `${response.name} successfully set as active semester`,
		status: 'OK',
	}
}

export async function editSemester(
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

export async function createSemester(
	data: z.infer<typeof AddSemesterDataFormSchema>
) {
	const formData = AddSemesterDataFormSchema.parse(data)

	try {
		const semester = await prisma.semester.create({
			data: {
				name: formData.semesterName,
				SemesterTimeline: {
					create: {
						facultyProposalSubmissionStart:
							formData.facultyProposalSubmission.from,
						facultyProposalSubmissionEnd: formData.facultyProposalSubmission.to,
						facultyProposalReviewStart: formData.facultyProposalReview.from,
						facultyProposalReviewEnd: formData.facultyProposalReview.to,
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

		const semesterId = semester.id
		await prisma.programme.createMany({
			data: [
				{
					leaderId: formData.communicationsEngineeringLead,
					name: ProgrammeName.CommunicationsEngineering,
					semesterId,
				},
				{
					leaderId: formData.computerControlAndAutomationLead,
					name: ProgrammeName.ComputerControlAndAutomation,
					semesterId,
				},
				{
					leaderId: formData.electronicsLead,
					name: ProgrammeName.Electronics,
					semesterId,
				},
				{
					leaderId: formData.powerEngineeringLead,
					name: ProgrammeName.PowerEngineering,
					semesterId,
				},
				{
					leaderId: formData.signalProcessingLead,
					name: ProgrammeName.SignalProcessing,
					semesterId,
				},
			],
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
