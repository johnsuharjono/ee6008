'use client'
import _ from 'lodash'
import { useCallback, useState } from 'react'
import { writeXLSX } from 'xlsx'

import { TypographyH4 } from '@/src/components/typography'
import { Button } from '@/src/components/ui/button'
import { downloadAllocationResults, getProjectAllocation } from '@/src/lib/helper'

import { columns } from './allocation-table/columns'
import { DataTable } from './allocation-table/data-table'

type StudentPreferences = { [studentId: string]: string[] }
type ProjectAllocations = { [projectId: string]: string[] }
type ProjectStatus = { [projectId: string]: 'open' | 'cancelled' }

interface ProcessAllocationProps {
  studentPreferences: StudentPreferences
  studentMap: { [studentId: string]: { name: string; matriculationNumber: string } }
  projectMap: { [projectId: string]: { title: string; projectCode: string } }
  minimumGroupSize: number
  maximumGroupSize: number
}

function ProcessAllocation({
  studentPreferences,
  studentMap,
  projectMap,
  minimumGroupSize,
  maximumGroupSize
}: ProcessAllocationProps) {
  const [projectAllocations, setProjectAllocations] = useState<ProjectAllocations>({})
  const [projectStatus, setProjectStatus] = useState<ProjectStatus>({})
  const [unallocatedStudents, setUnallocatedStudents] = useState<string[]>(Object.keys(studentPreferences))

  const processAllocations = useCallback(
    (retryCount: number) => {
      const {
        projectAllocations: localProjectAllocations,
        projectStatus: localProjectStatus,
        unallocatedStudents: localUnallocatedStudents
      } = getProjectAllocation({
        projectIds: Object.keys(projectMap),
        studentPreferences,
        minimumGroupSize,
        maximumGroupSize,
        retryCount
      })

      setProjectAllocations(localProjectAllocations)
      setProjectStatus(localProjectStatus)
      setUnallocatedStudents(Array.from(localUnallocatedStudents))
    },
    [studentPreferences, setProjectAllocations, setProjectStatus, setUnallocatedStudents, maximumGroupSize, minimumGroupSize, projectMap]
  )

  const sanitizedAllocationData = Object.entries(projectAllocations).map(([projectId, studentIds]) => {
    return {
      projectId: projectId,
      projectCode: projectMap[projectId].projectCode,
      projectTitle: projectMap[projectId].title,
      students: studentIds.map((studentId) => ({
        name: studentMap[studentId].name,
        matriculationNumber: studentMap[studentId].matriculationNumber,
        studentId
      })),
      numberOfStudents: studentIds.length,
      status: projectStatus[projectId]
    }
  })

  const downloadData: {
    projectCode: string
    matriculationNumber: string
  }[] = []
  for (const projectId in projectAllocations) {
    const projectCode = projectMap[projectId].projectCode

    for (const studentId of projectAllocations[projectId]) {
      const { name, matriculationNumber } = studentMap[studentId]
      downloadData.push({ projectCode, matriculationNumber })
    }
  }

  const sanitizedUnallocatedStudents = unallocatedStudents.map((studentId) => studentMap[studentId])
  const numberOfUnallocatedStudents = unallocatedStudents.length
  const numberOfClosedProjects = Object.values(projectStatus).filter((status) => status === 'cancelled').length

  return (
    <div className='space-y-4'>
      <div>Unallocated Students: {numberOfUnallocatedStudents}</div>
      <div>Closed Projects: {numberOfClosedProjects}</div>

      <div className='flex gap-2'>
        <Button onClick={() => processAllocations(100)}>Best Allocation</Button>
        <Button onClick={() => processAllocations(1)}>Single Allocation</Button>
        {numberOfUnallocatedStudents !== Object.keys(studentPreferences).length && (
          <Button onClick={() => downloadAllocationResults(downloadData)}>Download</Button>
        )}
      </div>

      {numberOfUnallocatedStudents !== Object.keys(studentPreferences).length && (
        <>
          <TypographyH4>Unallocated Students</TypographyH4>
          <ul className='my-6 ml-6 list-disc [&>li]:mt-2'>
            {sanitizedUnallocatedStudents.map((student) => (
              <li key={student.matriculationNumber}>{student.name}</li>
            ))}
          </ul>
        </>
      )}

      {sanitizedAllocationData.length > 0 && <DataTable data={sanitizedAllocationData} columns={columns} />}
    </div>
  )
}

export default ProcessAllocation
