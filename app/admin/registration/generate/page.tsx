import { prisma } from '@/lib/prisma'
import { Header } from '@/components/header'

import _ from 'lodash'
import ProcessAllocation from '@/components/admin/registration/process-allocation'
import { getProjectDetailsMap, getStudentDetailsMap } from '@/lib/helper'

const GenerateAllocation = async () => {
  const activeSemesterData = await prisma.semester.findFirst({
    where: {
      active: true
    },
    select: {
      maximumGroupSize: true,
      minimumGroupSize: true
    }
  })

  if (!activeSemesterData) {
    throw new Error('No active semester found')
  }

  const MIN_GROUP_SIZE = activeSemesterData.minimumGroupSize
  const MAX_GROUP_SIZE = activeSemesterData.maximumGroupSize

  const registrations = await prisma.registration.findMany({
    include: {
      student: {
        select: {
          matriculationNumber: true,
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

  const projectMap = await getProjectDetailsMap()
  const studentMap = await getStudentDetailsMap()

  const groupByStudent = _.groupBy(registrations, 'studentId')
  const sanitizedStudentPreferences: { [studentId: string]: string[] } = {}
  Object.keys(groupByStudent).forEach((key) => {
    const sorted = _.sortBy(groupByStudent[key], 'priority')
    const projectIds = sorted.map((item) => item.projectId)
    sanitizedStudentPreferences[key] = projectIds
  })

  return (
    <div className='space-y-4'>
      <Header title='Registration' description='Manage student project registration' />

      <ProcessAllocation
        studentPreferences={sanitizedStudentPreferences}
        studentMap={studentMap}
        projectMap={projectMap}
        minimumGroupSize={MIN_GROUP_SIZE}
        maximumGroupSize={MAX_GROUP_SIZE}
      />
    </div>
  )
}

export default GenerateAllocation
