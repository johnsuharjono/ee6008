import { prisma } from '@/lib/prisma'
import { SelectActiveSemester } from './select-active-semester'
import { TypographyH2 } from '@/components/typography'

const ActiveSemesterWrapper = async () => {
	const allSemesters = await prisma.semester.findMany()
	const activeSemesters = allSemesters.filter((semester) => semester.active)

	return (
		<div className='space-y-4'>
			<TypographyH2>Active semester</TypographyH2>

			<p>
				Current active semesters:{' '}
				{activeSemesters.map((semester) => semester.name).join(', ')}
			</p>

			<SelectActiveSemester
				options={allSemesters.map((semester) => ({
					semesterId: semester.id,
					semesterName: semester.name,
				}))}
				{...(activeSemesters.length > 0
					? { defaultValue: activeSemesters[0].id }
					: {})}
			/>
		</div>
	)
}

export default ActiveSemesterWrapper
