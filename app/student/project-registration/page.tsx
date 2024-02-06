import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { convertProgrammeName } from '@/lib/helper'
import { TypographyH2 } from '@/components/typography'

// Table component
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'

const ProjectRegistration = async () => {
	const session = await getServerSession(authOptions)
	const user = session?.user
	if (!user) return null

	const data = await prisma.registration.findMany({
		where: {
			studentId: user.studentId,
		},
		include: {
			project: {
				include: {
					Programme: {
						select: {
							name: true,
						},
					},
					Faculty: {
						include: {
							User: {
								select: {
									name: true,
								},
							},
						},
					},
				},
			},
		},
	})

	const sanitizedData = data.map((project) => {
		return {
			id: project.projectId,
			title: project.project.title,
			priority: project.priority,
			supervisor: project.project.Faculty.User.name,
			programme: convertProgrammeName(project.project.Programme.name),
		}
	})

	return (
		<section className='space-y-6 pb-8 pt-6 md:pb-12 md:pt-10'>
			<div className='container flex max-w-[80rem] flex-col gap-4'>
				<TypographyH2>Project Registration</TypographyH2>
				{sanitizedData.length === 0 ? (
					<p className='text-muted-foreground text-md md:text-lg'>
						You have not registered any project
					</p>
				) : (
					<Table>
						<TableCaption>A list of your project applications.</TableCaption>
						<TableHeader>
							<TableRow>
								<TableHead>Title</TableHead>
								<TableHead>Supervisor</TableHead>
								<TableHead>Programme</TableHead>
								<TableHead>Priority</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{sanitizedData.map((project) => (
								<TableRow key={project.id}>
									<TableCell className='font-medium'>{project.title}</TableCell>
									<TableCell>{project.supervisor}</TableCell>
									<TableCell>{project.programme}</TableCell>
									<TableCell>{project.priority}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				)}
			</div>
		</section>
	)
}

export default ProjectRegistration