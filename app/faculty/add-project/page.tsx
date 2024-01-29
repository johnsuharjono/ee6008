import { AddProjectForm } from '@/components/form/add-project-form'
import { Header } from '@/components/header'
import { prisma } from '@/lib/prisma'

const CreateProposal = async () => {
	const AY = '23S2'
	const semester = await prisma.semester.findUnique({
		where: {
			name: AY,
		},
		select: {
			id: true,
		},
	})

	if (!semester) return null

	return (
		<div className='space-y-8'>
			<div className='flex w-full flex-col gap-1'>
				<Header
					title='Create a proposal'
					description='Start by choosing semester to add project to'
				/>
			</div>

			<div>
				<AddProjectForm semesterId={semester.id} />
			</div>
		</div>
	)
}

export default CreateProposal
