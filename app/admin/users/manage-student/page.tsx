import AddUser from '@/components/admin/users/add-user/add-user'
import StudentUser from '@/components/admin/users/student/student-user'
import { UserRole } from '@prisma/client'

const UserPage = () => {
	return (
		<div className='space-y-4'>
			<h1 className='text-3xl font-semibold'>Users Management</h1>
			<h2 className='text-muted-foreground'>Configure role or add a user!</h2>
			<StudentUser />
			<AddUser role={UserRole.STUDENT} />
		</div>
	)
}

export default UserPage
