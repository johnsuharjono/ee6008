import { EditProjectForm } from '@/components/form/edit-project-form'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'

const EditProjectPage = async ({ params }: { params: { slug: string } }) => {
	const session = await getServerSession(authOptions)

	if (!session) return null

	const projectDetail = await prisma.project.findUnique({
		where: {
			id: params.slug,
			facultyId: session.user.facultyId,
		},
		include: {
			Programme: {
				select: {
					name: true,
					semesterId: true,
				},
			},
		},
	})

	if (!projectDetail) {
		return null
	}

	const sanitizedProjectDetail = {
		...projectDetail,
		semesterId: projectDetail.Programme.semesterId,
		programme: projectDetail.Programme.name,
	}

	// check available programme for the semester
	const programmeData = await prisma.programme.findMany({
		where: {
			semesterId: projectDetail.Programme.semesterId,
		},
		select: {
			name: true,
		},
	})

	const programmeOptions = programmeData.map((programme) => programme.name)

	return (
		<div className='space-y-8'>
			<div className='flex w-full flex-col gap-1'>
				<h1 className='text-3xl font-semibold'>Edit Project</h1>
			</div>
			<div>
				<EditProjectForm
					data={sanitizedProjectDetail}
					programmeOptions={programmeOptions}
				/>
			</div>
		</div>
	)
}

export default EditProjectPage
