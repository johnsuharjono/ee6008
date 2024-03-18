import AddUser from '@/src/components/admin/users/add-user/add-user'
import StudentUser from '@/src/components/admin/users/student/student-user'
import { Header } from '@/src/components/header'
import { UserRole } from '@prisma/client'

const UserPage = () => {
  return (
    <div className='space-y-4'>
      <Header
        title='Manage student user'
        description='Configure student account!'
        actions={<AddUser role={UserRole.STUDENT} />}
      />
      <StudentUser />
    </div>
  )
}

export default UserPage
