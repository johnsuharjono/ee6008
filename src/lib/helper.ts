import _, { set } from 'lodash'
import * as XLSX from 'xlsx'

import { prisma } from './prisma'

type StudentPreferences = { [studentId: string]: string[] }
type ProjectAllocations = { [projectId: string]: string[] }
type ProjectStatus = { [projectId: string]: 'open' | 'cancelled' }

export function getProjectAllocation({
  projectIds,
  studentPreferences,
  minimumGroupSize,
  maximumGroupSize,
  retryCount
}: {
  projectIds: string[]
  studentPreferences: StudentPreferences
  minimumGroupSize: number
  maximumGroupSize: number
  retryCount: number
}) {
  let bestResult = {
    projectAllocations: {},
    projectStatus: {},
    unallocatedStudents: [] as string[]
  }
  let minimumUnallocated = Number.MAX_SAFE_INTEGER

  for (let i = 0; i < retryCount; i++) {
    const result = getSingleAllocation({
      projectIds,
      studentPreferences,
      minimumGroupSize,
      maximumGroupSize
    })

    const unallocatedCount = result.unallocatedStudents.length
    if (unallocatedCount < minimumUnallocated) {
      bestResult = result
      minimumUnallocated = unallocatedCount
    }
  }

  return bestResult
}

function getSingleAllocation({
  projectIds,
  studentPreferences,
  minimumGroupSize,
  maximumGroupSize
}: {
  projectIds: string[]
  studentPreferences: StudentPreferences
  minimumGroupSize: number
  maximumGroupSize: number
}) {
  let localProjectAllocations: ProjectAllocations = {}
  let localProjectStatus: ProjectStatus = {}
  projectIds.forEach((projectId) => {
    localProjectAllocations[projectId] = []
    localProjectStatus[projectId] = 'open'
  })

  let localUnallocatedStudents = new Set<string>(Object.keys(studentPreferences))

  // Shuffle the order of student IDs before processing allocations to ensure randomness
  const shuffledStudentIds = _.shuffle(Array.from(localUnallocatedStudents))

  shuffledStudentIds.forEach((studentId) => {
    allocateStudentToProject(
      studentId,
      studentPreferences,
      localProjectAllocations,
      localProjectStatus,
      maximumGroupSize,
      localUnallocatedStudents
    )
  })

  // Update project status based on allocations and identify projects that did not meet the minimum size
  Object.entries(localProjectAllocations).forEach(([projectId, students]) => {
    if (students.length < minimumGroupSize) {
      localProjectStatus[projectId] = 'cancelled'
      students.forEach((studentId) => {
        localUnallocatedStudents.add(studentId)
        localProjectAllocations[projectId] = []
      })
    }
  })

  // Attempt to reallocate students from cancelled projects
  localUnallocatedStudents.forEach((studentId) => {
    allocateStudentToProject(
      studentId,
      studentPreferences,
      localProjectAllocations,
      localProjectStatus,
      maximumGroupSize,
      localUnallocatedStudents,
      true
    )
  })

  return {
    projectAllocations: localProjectAllocations,
    projectStatus: localProjectStatus,
    unallocatedStudents: Array.from(localUnallocatedStudents)
  }
}

function allocateStudentToProject(
  studentId: string,
  studentPreferences: StudentPreferences,
  projectAllocations: ProjectAllocations,
  projectStatus: ProjectStatus,
  maximumGroupSize: number,
  unallocatedStudents: Set<string>,
  reallocation = false
) {
  for (const projectId of studentPreferences[studentId]) {
    if (reallocation && projectStatus[projectId] === 'cancelled') continue

    if (projectAllocations[projectId].length < maximumGroupSize && projectStatus[projectId] !== 'cancelled') {
      projectAllocations[projectId].push(studentId)
      unallocatedStudents.delete(studentId)
      break
    }
  }
}

export const getStudentDetailsMap = async () => {
  const students = await prisma.student.findMany({
    include: {
      User: {
        select: {
          name: true
        }
      }
    }
  })
  const initialStudentMap: { [studentId: string]: { name: string; matriculationNumber: string } } = {}
  const studentMap = students.reduce((acc, student) => {
    acc[student.id] = { name: student.User.name, matriculationNumber: student.matriculationNumber }
    return acc
  }, initialStudentMap)
  return studentMap
}

export const getProjectDetailsMap = async () => {
  // create map from project id to project title
  const projects = await prisma.project.findMany({
    where: {
      Programme: {
        Semester: {
          active: true
        }
      }
    },
    select: {
      title: true,
      id: true,
      projectCode: true
    }
  })

  const initialProjectMap: { [key: string]: { title: string; projectCode: string } } = {}
  const projectMap = projects.reduce((acc, project) => {
    acc[project.id] = { title: project.title, projectCode: project.projectCode }
    return acc
  }, initialProjectMap)
  return projectMap
}

export function downloadAllocationResults(allocationData: any[]) {
  // Create a new workbook and a worksheet
  const workbook = XLSX.utils.book_new()
  const worksheet = XLSX.utils.json_to_sheet(allocationData)

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Allocations')

  const buf = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' })

  // Create a Blob from the binary string and set the correct mime type
  const blob = new Blob([buf], {
    type: 'application/vnd.ms-excel'
  })

  // Create a URL for the blob object and trigger the download
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', 'ee6008-registration.xlsx') // Name the download file
  link.click()
}
