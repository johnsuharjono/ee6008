import FacultyUser from '@/components/admin/users/faculty/faculty-user'
import AddUser from '@/components/admin/users/add-user/add-user'
import { UserRole } from '@prisma/client'

const ManageFaculty = () => {
	return (
		<div className='space-y-4'>
			<h1 className='text-3xl font-semibold'>Student Management</h1>
			<h2 className='text-muted-foreground'>Configure role or add a user!</h2>
			<FacultyUser />
			<AddUser role={UserRole.FACULTY} />
		</div>
	)
}

export default ManageFaculty
