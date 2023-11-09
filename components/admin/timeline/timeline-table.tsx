import { Skeleton } from '@/components/ui/skeleton'
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

export async function TimelineTable({
	searchParams,
}: {
	searchParams?: {
		semester: string
	}
}) {
	const semester = searchParams?.semester

	if (!semester) {
		return (
			<Table>
				<TableCaption>Select a semester</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Period</TableHead>
						<TableHead>From</TableHead>
						<TableHead>To</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody></TableBody>
			</Table>
		)
	}
	const semesterData = await prisma.semester.findUnique({
		where: {
			name: semester,
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
		<Table>
			<TableCaption>{semester} semester timeline</TableCaption>
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
	)
}
