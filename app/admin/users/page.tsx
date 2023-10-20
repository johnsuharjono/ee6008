import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import AdminUser from '@/components/users/admin/admin-user'
import FacultyUser from '@/components/users/faculty/faculty-user'
import StudentUser from '@/components/users/student/student-user'

const UserPage = () => {
	return (
		<div className='space-y-4'>
			<h1 className='text-3xl font-semibold'>Users Management</h1>
			<h2 className='text-muted-foreground'>Configure role or add a user!</h2>
			<Tabs defaultValue='faculty'>
				<TabsList className='grid grid-cols-3 w-fit rounded-2xl'>
					<TabsTrigger className='rounded-xl' value='faculty'>
						Faculty
					</TabsTrigger>
					<TabsTrigger className='rounded-xl' value='student'>
						Student
					</TabsTrigger>
					<TabsTrigger className='rounded-xl' value='admin'>
						Admin
					</TabsTrigger>
				</TabsList>
				<TabsContent value='faculty'>
					<FacultyUser />
				</TabsContent>
				<TabsContent value='student'>
					<StudentUser />
				</TabsContent>
				<TabsContent value='admin'>
					<AdminUser />
				</TabsContent>
			</Tabs>
		</div>
	)
}

export default UserPage
