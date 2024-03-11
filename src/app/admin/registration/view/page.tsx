import _ from 'lodash'

import { columns } from '@/src/components/admin/registration/registration-table/columns'
import { DataTable } from '@/src/components/admin/registration/registration-table/data-table'
import { Header } from '@/src/components/header'
import { prisma } from '@/src/lib/prisma'

const ViewRegistrationPage = async () => {
  const registrations = await prisma.registration.findMany({
    include: {
      Student: {
        select: {
          matriculationNumber: true,
          User: {
            select: {
              name: true
            }
          }
        }
      },
      Project: {
        select: {
          projectCode: true,
          title: true
        }
      }
    }
  })

  const groupByProjects = _.groupBy(registrations, 'projectId')
  const projectSignUpMap = Object.entries(groupByProjects).map(([key, value]) => {
    return {
      projectId: key,
      projectCode: value[0].Project.projectCode,
      projectTitle: value[0].Project.title,
      totalSignUps: value.length,
      registrantDetails: value.map((item) => ({
        matriculationNumber: item.Student.matriculationNumber,
        name: item.Student.User.name,
        priority: item.priority
      }))
    }
  })

  const groupByStudent = _.groupBy(registrations, 'student.matriculationNumber')

  const sanitizedRegistrationData: { [studentId: string]: string[] } = {}
  Object.keys(groupByStudent).forEach((key) => {
    const sorted = _.sortBy(groupByStudent[key], 'priority')
    const projectIds = sorted.map((item) => item.projectId)
    sanitizedRegistrationData[key] = projectIds
  })

  return (
    <div className='space-y-4'>
      <Header title='Registration' description='Manage student project registration' />

      <DataTable columns={columns} data={projectSignUpMap} />
    </div>
  )
}

export default ViewRegistrationPage
