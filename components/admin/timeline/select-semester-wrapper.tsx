import { prisma } from '@/lib/prisma'
import { SelectSemester } from './select-semester'

export const SelectSemesterWrapper = async ({
	searchParams,
}: {
	searchParams?: {
		semester: string
	}
}) => {
	const allSemester = await prisma.semester.findMany()

	const selectedSemesterRow = allSemester.find(
		(row) => row.name === searchParams?.semester
	)

	if (selectedSemesterRow) {
		return (
			<SelectSemester
				key={searchParams?.semester}
				options={allSemester.map((row) => row.name)}
				defaultValue={selectedSemesterRow.name}
			/>
		)
	}

	return <SelectSemester options={allSemester.map((row) => row.name)} />
}
