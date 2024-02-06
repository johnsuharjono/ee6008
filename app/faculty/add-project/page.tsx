import { AddProjectForm } from '@/components/form/add-project-form'
import { Header } from '@/components/header'
import { prisma } from '@/lib/prisma'

const CreateProposal = async () => {
	const semester = await prisma.semester.findFirst({
		where: {
			active: true,
		},
		select: {
			id: true,
			name: true,
		},
	})

	if (!semester) return null

	return (
		<div className='space-y-8'>
			<div className='flex w-full flex-col gap-1'>
				<Header
					title='Create a proposal'
					description={`Proposal created will be for the semester: ${semester.name}`}
				/>
			</div>

			<div>
				<AddProjectForm semesterId={semester.id} />
			</div>
		</div>
	)
}

export default CreateProposal
