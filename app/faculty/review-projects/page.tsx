import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { Header } from '@/components/header'
import _ from 'lodash'
import { DataTable } from '@/components/faculty/review-projects-table/data-table'
import { columns } from '@/components/faculty/review-projects-table/columns'

const ReviewProjects = async () => {
	const session = await getServerSession(authOptions)
	const user = session?.user

	if (!user) return null

	const data = await prisma.project.findMany({
		where: {
			Programme: {
				leaderId: user.facultyId,
			},
		},
		include: {
			faculty: {
				select: {
					User: {
						select: {
							name: true,
						},
					},
				},
			},
			Programme: {
				select: {
					Semester: {
						select: {
							name: true,
						},
					},
					name: true,
					Leader: {
						select: {
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

	const semesterOptions = _.uniq(
		data.map((project) => project.Programme?.Semester?.name)
	)

	const semesterOptionsSanitized = semesterOptions.map((semester) => ({
		label: semester,
		value: semester,
	}))

	const projectSanitized = data.map((project) => {
		return {
			id: project.id,
			title: project.title,
			description: project.description,
			programme: project.Programme?.name,
			numberOfStudents: project.numberOfStudents,
			proposer: project.faculty.User.name,
			semester: project.Programme?.Semester?.name,
			status: project.status,
		}
	})

	return (
		<div className='space-y-8'>
			<div className='flex w-full flex-col gap-1'>
				<Header
					title='Review projects!'
					description='Approve or reject project under your programme'
				/>
				<DataTable
					columns={columns}
					data={projectSanitized}
					semesterOptions={semesterOptionsSanitized}
				/>
			</div>
		</div>
	)
}

export default ReviewProjects
