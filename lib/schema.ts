import { z } from 'zod'

export const EditTimelineDataFormSchema = z.object({
	semesterId: z.string(),
	facultyProposalSubmission: z.object({
		from: z.date(),
		to: z.date(),
	}),
	studentRegistration: z.object({
		from: z.date(),
		to: z.date(),
	}),
	markEntry: z.object({
		from: z.date(),
		to: z.date(),
	}),
	peerReview: z.object({
		from: z.date(),
		to: z.date(),
	}),
})
const semesterNameRegex = /^[0-9]{2}[S][0-9]{1}$/

export const AddTimelineDataFormSchema = z.object({
	semesterName: z
		.string()
		.refine(
			(value) => semesterNameRegex.test(value),
			'Semester name must be in the format {YY}{S}{#}'
		),
	facultyProposalSubmission: z.object({
		from: z.date(),
		to: z.date(),
	}),
	studentRegistration: z.object({
		from: z.date(),
		to: z.date(),
	}),
	markEntry: z.object({
		from: z.date(),
		to: z.date(),
	}),
	peerReview: z.object({
		from: z.date(),
		to: z.date(),
	}),
})
