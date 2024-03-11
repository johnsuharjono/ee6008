import _ from 'lodash'

import { getProjectDetailsMap, getStudentDetailsMap } from '@/src/lib/helper'
import { prisma } from '@/src/lib/prisma'

export const handleAllocation = async (studentProjectData: { projectCode: string; matriculationNumber: string }[]) => {
  'use server'
  // TODO: Handle excel file with project code and student matriculation number
  const projectMap = await getProjectDetailsMap()
  const studentMap = await getStudentDetailsMap()

  try {
    const operations = studentProjectData.map((studentProject) => {
      const studentId = _.findKey(studentMap, {
        matriculationNumber: studentProject.matriculationNumber
      })
      const projectId = _.findKey(projectMap, { projectCode: studentProject.projectCode })

      return prisma.student.update({
        where: {
          id: studentId
        },
        data: {
          projectId: projectId
        }
      })
    })

    await prisma.$transaction(operations)
    return { message: 'Allocation successful', status: 'SUCCESS' }
  } catch (error) {
    console.error(error)
    return { message: `An error occurred: ${error}`, status: 'ERROR' }
  }
}
