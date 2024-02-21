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

export async function ProgrammeLeaderTable({
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
						<TableHead>Programme</TableHead>
						<TableHead>Leader</TableHead>
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
	})

	if (!semesterData) {
		return null
	}

	const programmeLeaders = await prisma.programme.findMany({
		where: {
			semesterId: semesterData.id,
		},
		include: {
			Leader: {
				include: { User: true },
			},
		},
	})

	if (!programmeLeaders) {
		return <div>No timeline data exist for this semesteer</div>
	}

	const sanitizedData = programmeLeaders.map((programme) => ({
		programme: programme.name,
		name: programme.Leader?.User?.name,
	}))

	return (
		<>
			<h1 className='text-lg md:text-xl font-semibold'>Programme Leader</h1>
			<Table>
				<TableCaption>{semester} programme leader</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Programme</TableHead>
						<TableHead>Leader</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{sanitizedData.map((lead, index) => (
						<TableRow key={index}>
							<TableCell>{lead.programme}</TableCell>
							<TableCell>{lead.name}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	)
}
