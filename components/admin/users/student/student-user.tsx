import { prisma } from '@/lib/prisma'

import { columns } from './student-table/columns'
import { DataTable } from './student-table/data-table'

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
      studentId: user.Student?.id || '',
      matriculationNumber: user.Student?.matriculationNumber || ''
    }
  })

  return (
    <>
      <DataTable columns={columns} data={dataSanitized} />
    </>
  )
}

export default StudentUser
