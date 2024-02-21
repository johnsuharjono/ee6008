import AddUser from '@/components/admin/users/add-user/add-user'
import StudentUser from '@/components/admin/users/student/student-user'
import FileUpload from '@/components/file-upload'
import { Header } from '@/components/header'
import { UserRole } from '@prisma/client'

const UserPage = () => {
	return (
		<div className='space-y-4'>
			<Header
				title='Manage student user'
				description='Configure student account!'
			/>
			<StudentUser />
			<AddUser role={UserRole.STUDENT} />

			<FileUpload />
		</div>
	)
}

export default UserPage
