import { prisma } from '@/lib/prisma'
import { DataTable } from './admin-table/data-table'
import { columns } from './admin-table/columns'

const AdminUser = async () => {
	const adminUsers = await prisma.user.findMany({
		where: {
			role: 'ADMIN',
		},
		include: {
			Admin: true,
		},
	})

	const dataSanitized = adminUsers.map((user) => {
		return {
			id: user.id,
			name: user.name,
			email: user.email,
			facultyId: user.Admin?.id || '',
		}
	})

	return (
		<div>
			<DataTable columns={columns} data={dataSanitized} />
		</div>
	)
}

export default AdminUser
