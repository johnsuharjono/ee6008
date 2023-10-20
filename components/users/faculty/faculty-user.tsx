import { prisma } from '@/lib/prisma'
import { DataTable } from './faculty-table/data-table'
import { columns } from './faculty-table/columns'

const FacultyUser = async () => {
	const facultyUsers = await prisma.user.findMany({
		where: {
			role: 'FACULTY',
		},
		include: {
			Faculty: true,
		},
	})

	const dataSanitized = facultyUsers.map((user) => {
		return {
			id: user.id,
			name: user.name,
			email: user.email,
			facultyId: user.Faculty?.id || '',
		}
	})

	return (
		<div>
			<DataTable columns={columns} data={dataSanitized} />
		</div>
	)
}

export default FacultyUser
