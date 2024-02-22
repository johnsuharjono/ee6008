import { prisma } from '@/lib/prisma'
import { DataTable } from './student-table/data-table'
import { columns } from './student-table/columns'

const StudentUser = async () => {
  const studentUsers = await prisma.user.findMany({
    where: {
      role: 'STUDENT'
    },
    include: {
      Student: true
    }
  })

  const dataSanitized = studentUsers.map((user) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      studentId: user.Student?.id || ''
    }
  })

  return (
    <>
      <DataTable columns={columns} data={dataSanitized} />
    </>
  )
}

export default StudentUser
