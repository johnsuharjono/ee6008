import { CreateSemesterForm } from '@/components/admin/semester/create-semester-form'
import { Header } from '@/components/header'
import { prisma } from '@/lib/prisma'

const AddSemester = async () => {
	const faculties = await prisma.faculty.findMany({
		include: {
			User: {
				select: {
					id: true,
					name: true,
				},
			},
		},
	})

	return (
		<div className='space-y-4'>
			<Header
				title='Add new semester'
				description='Configure the timeline, programme and programme leader!'
			/>

			<CreateSemesterForm faculties={faculties} />
		</div>
	)
}

export default AddSemester
