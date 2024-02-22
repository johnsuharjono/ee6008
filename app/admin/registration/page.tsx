import { prisma } from '@/lib/prisma'
import { Header } from '@/components/header'

import _ from 'lodash'
import { DataTable } from '@/components/admin/registration/registration-table/data-table'
import { columns } from '@/components/admin/registration/registration-table/columns'

const Registration = async () => {
  const registrations = await prisma.registration.findMany({
    include: {
      student: {
        include: {
          User: {
            select: {
              name: true
            }
          }
        }
      },
      project: {
        select: {
          title: true
        }
      }
    }
  })

  const groupByProjects = _.groupBy(registrations, 'projectId')

  const projectSignUpMap = Object.entries(groupByProjects).map(
    ([key, value]) => {
      return {
        projectId: key,
        projectTitle: value[0].project.title,
        numberOfRegistrations: value.length
      }
    }
  )
  console.log(projectSignUpMap)

  const groupByStudent = _.groupBy(registrations, 'studentId')

  // reduce the inner object to only have the project id and project title, but sorted based on priority
  const sanitizedRegistrationData = Object.entries(groupByStudent).map(
    ([key, value]) => {
      const sorted = _.sortBy(value, 'priority')
      const sanitized = sorted.map((item) => item.projectId)
      return {
        [key]: sanitized
      }
    }
  )

  console.log(sanitizedRegistrationData)
  return (
    <div className='space-y-4'>
      <Header
        title='Registration'
        description='Manage student project registration'
      />

      <DataTable columns={columns} data={projectSignUpMap} />
    </div>
  )
}

export default Registration
