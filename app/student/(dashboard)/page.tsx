import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

import { columns } from '@/components/student/projects/columns'
import { DataTable } from '@/components/student/projects/data-table'
import { prisma } from '@/lib/prisma'

export default async function Home() {
	const data = await prisma.project.findMany({
		where: {
			status: 'APPROVED',
		},
		include: {
			Faculty: {
				include: {
					User: {
						select: {
							name: true,
						},
					},
				},
			},
			Programme: {
				include: {
					Semester: {
						select: {
							name: true,
						},
					},
				},
			},
		},
	})

	const projects = data.map((project) => ({
		id: project.id,
		title: project.title,
		description: project.description,
		programme: project.Programme.name,
		semester: project.Programme.Semester.name,
		supervisor: project.Faculty.User.name,
		numberOfStudents: project.numberOfStudents,
	}))

	const session = await getServerSession(authOptions)

	return (
		<section className='space-y-6 pb-8 pt-6 md:pb-12 md:pt-10'>
			<div className='container flex max-w-[80rem] flex-col gap-4'>
				<h1 className='text-3xl font-semibold'>
					Welcome back, {session?.user.name}!
				</h1>
				<h3 className='text-muted-foreground text-lg tracking-tight'>
					Here are the list of projects available:
				</h3>
				<DataTable columns={columns} data={projects} />
			</div>
		</section>
	)
}
