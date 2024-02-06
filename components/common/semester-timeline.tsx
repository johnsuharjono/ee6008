import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { prisma } from '@/lib/prisma'
import format from 'date-fns/format'
import { TypographyH4 } from '../typography'

export async function SemesterTimeline() {
	const semesterData = await prisma.semester.findFirst({
		where: {
			active: true,
		},
		include: {
			SemesterTimeline: true,
		},
	})

	const semesterTimelineData = semesterData?.SemesterTimeline

	if (!semesterTimelineData) {
		return <div>No timeline data exist for this semesteer</div>
	}

	const timelineData = [
		{
			title: 'Faculty proposal submission',
			from: new Date(semesterTimelineData.facultyProposalSubmissionStart),
			to: new Date(semesterTimelineData.facultyProposalSubmissionEnd),
		},
		{
			title: 'Proposal review',
			from: new Date(semesterTimelineData.facultyProposalReviewStart),
			to: new Date(semesterTimelineData.facultyProposalReviewEnd),
		},
		{
			title: 'Student selection',
			from: new Date(semesterTimelineData.studentRegistrationStart),
			to: new Date(semesterTimelineData.studentRegistrationEnd),
		},
		{
			title: 'Mark entry',
			from: new Date(semesterTimelineData.facultyMarkEntryStart),
			to: new Date(semesterTimelineData.facultyMarkEntryEnd),
		},
		{
			title: 'Peer review',
			from: new Date(semesterTimelineData.studentPeerReviewStart),
			to: new Date(semesterTimelineData.studentPeerReviewEnd),
		},
	]

	return (
		<>
			<TypographyH4>{semesterData.name} semester timeline</TypographyH4>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Period</TableHead>
						<TableHead>From</TableHead>
						<TableHead>To</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{timelineData.map((period, index) => (
						<TableRow key={index}>
							<TableCell>{period.title}</TableCell>
							<TableCell>{format(period.from, 'PPP HH:mm:ss')}</TableCell>
							<TableCell>{format(period.to, 'PPP HH:mm:ss')}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	)
}
