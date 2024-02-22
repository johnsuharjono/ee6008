import { DataTable } from '@/components/faculty/view-all-projects-table/data-table'
import { columns } from '@/components/faculty/view-all-projects-table/columns'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { Header } from '@/components/header'
import _ from 'lodash'

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
      Faculty: {
        select: {
          User: {
            select: {
              name: true
            }
          }
        }
      },
      Programme: {
        select: {
          Semester: {
            select: {
              name: true
            }
          },
          name: true,
          Leader: {
            select: {
              User: {
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

  const semesterOptions = _.uniq(
    data.map((project) => project.Programme?.Semester?.name)
  )

  const semesterOptionsSanitized = semesterOptions.map((semester) => ({
    label: semester,
    value: semester
  }))

  const projectSanitized = data.map((project) => {
    return {
      id: project.id,
      title: project.title,
      semester: project.Programme?.Semester?.name,
      programme: project.Programme?.name,
      faculty: project.Faculty.User.name,
      description: project.description,
      status: project.status
    }
  })

  return (
    <div className='space-y-8'>
      <div className='flex w-full flex-col gap-1'>
        <Header
          title='View all projects'
          description='All approved projects are listed below.'
        />

        <DataTable
          columns={columns}
          data={projectSanitized}
          semesterOptions={semesterOptionsSanitized}
        />
      </div>
    </div>
  )
}

export default CreateProposal
