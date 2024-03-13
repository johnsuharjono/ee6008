import _ from 'lodash'
import { getServerSession } from 'next-auth'

import { columns } from '@/src/components/faculty/view-all-projects-table/columns'
import { DataTable } from '@/src/components/faculty/view-all-projects-table/data-table'
import { Header } from '@/src/components/header'
import { authOptions } from '@/src/lib/auth'
import { prisma } from '@/src/lib/prisma'

const CreateProposal = async () => {
  const session = await getServerSession(authOptions)
  const user = session?.user

  if (!user) return null

  const data = await prisma.project.findMany({
    where: {
      status: {
        in: ['APPROVED']
      }
    },
    include: {
      faculty: {
        select: {
          user: {
            select: {
              name: true
            }
          }
        }
      },
      programme: {
        select: {
          semester: {
            select: {
              name: true
            }
          },
          name: true,
          leader: {
            select: {
              user: {
                select: {
                  name: true
                }
              }
            }
          }
        }
      }
    }
  })

  const semesterOptions = _.uniq(data.map((project) => project.programme?.semester?.name))

  const semesterOptionsSanitized = semesterOptions.map((semester) => ({
    label: semester,
    value: semester
  }))

  const projectSanitized = data.map((project) => {
    return {
      id: project.id,
      title: project.title,
      semester: project.programme?.semester?.name,
      programme: project.programme?.name,
      faculty: project.faculty.user.name,
      description: project.description,
      status: project.status,
      projectCode: project.projectCode
    }
  })

  return (
    <div className='space-y-4'>
      <Header title='View all projects' description='All approved projects are listed below.' />

      <DataTable columns={columns} data={projectSanitized} semesterOptions={semesterOptionsSanitized} />
    </div>
  )
}

export default CreateProposal
