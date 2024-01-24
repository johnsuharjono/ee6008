import { EditTimelineForm } from '@/components/admin/timeline/edit-timeline-form'
import { Header } from '@/components/header'
import { Badge } from '@/components/ui/badge'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

const EditTimeline = async ({ params }: { params: { semester: string } }) => {
	if (!validateSemesterFormat(params.semester)) {
		return notFound()
	}

	const data = await prisma.semester.findUnique({
		where: {
			name: params.semester,
		},
		include: {
			SemesterTimeline: true,
		},
	})

	const semesterId = data?.id

	const semesterTimelineData = data?.SemesterTimeline

	let sanitizedDefaultValues

	if (!semesterId || !semesterTimelineData) {
		return (
			<div className='space-y-4'>
				<h1 className='text-3xl font-semibold'>
					Error: No timeline data found for {params.semester}.
				</h1>
				<h2 className='text-muted-foreground'>
					Start by creating timeline data for this semester
				</h2>
			</div>
		)
	} else {
		sanitizedDefaultValues = {
			semesterId: semesterId,
			facultyProposalSubmission: {
				from: semesterTimelineData.facultyProposalSubmissionStart,
				to: semesterTimelineData.facultyProposalSubmissionEnd,
			},
			studentRegistration: {
				from: semesterTimelineData.studentRegistrationStart,
				to: semesterTimelineData.studentRegistrationEnd,
			},
			markEntry: {
				from: semesterTimelineData.facultyMarkEntryStart,
				to: semesterTimelineData.facultyMarkEntryEnd,
			},
			peerReview: {
				from: semesterTimelineData.studentPeerReviewStart,
				to: semesterTimelineData.studentPeerReviewEnd,
			},
		}
	}

	return (
		<div className='space-y-8'>
			<Header
				title='Edit timeline'
				description='Change the dates and times below!'
			/>

			<Badge className='text-md px-4 py-2 rounded-xl'>{params.semester}</Badge>
			<EditTimelineForm
				defaultValues={sanitizedDefaultValues}
				semesterName={params.semester}
			/>
		</div>
	)
}

export default EditTimeline

function validateSemesterFormat(semester: string) {
	if (semester.length !== 4) {
		return false
	}

	const startYear = semester.slice(0, 2)
	const semesterPart = semester.slice(3)

	if (
		/^\d{2}$/.test(startYear) &&
		(semesterPart === '1' || semesterPart === '2')
	) {
		return true
	} else {
		return false
	}
}
