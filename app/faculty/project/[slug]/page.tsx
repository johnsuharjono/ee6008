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
	})

	if (!projectDetail) {
		return null
	}

	return (
		<div className='space-y-8'>
			<div className='flex w-full flex-col gap-1'>
				<h1 className='text-3xl font-semibold'>Edit Project</h1>
			</div>
			<div>
				<EditProjectForm data={projectDetail} />
			</div>
		</div>
	)
}

export default EditProjectPage
